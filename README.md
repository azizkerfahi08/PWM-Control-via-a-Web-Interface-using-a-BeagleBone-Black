# PWM Control via a Web Interface Using a BeagleBone Black
This project, developed by Aziz Kerfahi and Mohamed Fedi Lafi, enables real-time control of a DC motor through Pulse Width Modulation (PWM) on a BeagleBone Black board. The project utilizes a web interface realized with nodejs to manage the PWM signals, allowing users to adjust the motor's speed and performance remotely and in real-time.

## Demo
[![Watch the video]]([https://drive.google.com/file/d/FILE_ID/view)](https://drive.google.com/file/d/1PqAiEXiMGePAwho-xB1QobgTkYjSg9D8/view?usp=sharing)

## Required Tools and Software
- **Real-Time Kernel** for more precise PWM control.
- **Node.js** and **npm** to run the web server.

## Setting up the Project
Run these commands from a terminal to ensure that this project work on your BeagleBone Black
1. **Establish a Connection to the BeagleBone Black**: Use SSH to remotely access the BeagleBone Black and execute commands.
Open a terminal on your local machine and enter the following command:
     ```bash
     ssh debian@192.168.6.2
     ```
Replace <192.168.6.2> with the BeagleBone Black's actual IP address.

2.**Install the Real-Time Kernel**: Install the real-time kernel to enable real-time PWM control.
- Go to the [BeagleBone Cookbook Kernel Installation Guide](https://docs.beagleboard.org/books/beaglebone-cookbook/07kernel/kernel.html)
- Follow the steps to install the **Real-Time Kernel** on your BeagleBone Black.

3.**Clone the Repository**: Clone the project repository onto your BeagleBone Black to access all required files.
In the terminal, execute the following command:
     ```bash
     https://github.com/azizkerfahi08/PWM-Control-via-a-Web-Interface-using-a-BeagleBone-Black.git
     ```

4- **Install Node.js**: Set up Node.js to run the server powering the web interface.
- Update the package list and install Node.js along with npm by running:
     ```bash
     sudo apt update
     sudo apt install nodejs
     sudo apt install npm
     ```
- Confirm the installation by checking the Node.js version:
     ```bash
       node -v
     ```
5- **Start the Server**: Launch the Node.js server to enable PWM control via the web interface.
- Navigate to the project directory and execute: 
     ```bash
     node server.js
     ```
6- **Open the Web Interface**: Access the PWM control system through a browser.
In your browser, navigate to the following URL:
     ```
     http://168.6.2:4000
     ```
