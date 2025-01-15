onst express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const net = require('net');
const { spawn } = require('child_process');
const path = require('path'); // Pour gérer les chemins

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 4000;

// Chemin absolu vers le programme C
const pwmProgramPath = path.join(__dirname, '../emblabs/PWM'); // PWM se trouve dans le dossier pare>

// Chemin du socket UNIX
const socketPath = '/tmp/pwm_socket';

// Middleware pour servir les fichiers statiques
app.use(express.static(__dirname));

// Lancer automatiquement le programme C
console.log('Démarrage automatique du programme C...');
const pwmProcess = spawn(pwmProgramPath);

pwmProcess.stdout.on('data', (data) => {
    console.log(`Programme C : ${data.toString()}`);
});

pwmProcess.stderr.on('data', (data) => {
    console.error(`Erreur du programme C : ${data.toString()}`);
});

pwmProcess.on('close', (code) => {
    console.log(`Programme C terminé avec le code : ${code}`);
});

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    console.log('Client connecté.');

    socket.on('set-pwm', (dutyCycle) => {
        console.log(`Nouvelle valeur PWM reçue : ${dutyCycle}`);
        if (dutyCycle >= 0 && dutyCycle <= 100) {
            // Envoyer la valeur au programme C via le socket UNIX
            const client = net.createConnection(socketPath, () => {
                client.write(`${dutyCycle}`);
                client.end();
                console.log(`Valeur PWM envoyée au programme C : ${dutyCycle}`);
            });

            client.on('error', (err) => {
                console.error(`Erreur lors de la connexion au socket UNIX : ${err}`);
            });
        } else {
            socket.emit('pwm-error', 'Valeur invalide. Doit être entre 0 et 100.');
        }
    });

    socket.on('disconnect', () => {
        console.log('Client déconnecté.');
    });
});

// Arrêter proprement le processus C lorsque le serveur Node.js est arrêté
process.on('SIGINT', () => {
    console.log('Arrêt du serveur Node.js...');
    pwmProcess.kill('SIGINT'); // Envoie un signal pour arrêter le programme C
    process.exit();
});

// Démarrer le serveur
server.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});

