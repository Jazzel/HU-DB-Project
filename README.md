# HU-DB-Project

## Database Management Systems

### Sports Pulse &nbsp;&nbsp;[![PyPI license](https://img.shields.io/pypi/l/ansicolortags.svg) &nbsp;![GitHub release](https://img.shields.io/github/release/Jazz-hash/HU-PFun-Project)](https://github.com/Jazz-hash/HU-PFun-Project)

Sports management systems that contains tournaments, matches, players and teams.

#### Environment: &nbsp; [![NodeJS](https://img.shields.io/badge/NodeJS-14%20and%20above-blue.svg)](https://nodejs.org/)

## Download and Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js:** [Download and install Node.js](https://nodejs.org/)
- **npm (Node Package Manager):** This is typically included with Node.js installation.

## Components:

- Frontend: Directory: `client`
- Backend: Directory: `root`

## Frameworks/Libraries used:

- NodeJS
- ReactJS
- PyODBC

## Prerequisites

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

- Node.js and npm (version = "\*")

  Visit [https://nodejs.org/](https://nodejs.org/) and download any version of Node.js for your operating system.
  Open a terminal or command prompt.

  ```bash
  # For verification, run the following commands
  node --version
  Output: v14.x.x

  npm --version
  Output: 6.x.x

  npm install -g yarn
  # For verification
  yarn --version
  Output: 1.x.x
  ```

## Setting up Database

- Use database.sql file in the root directory to create database in Microsoft SQL Server with name "sports_pulse".

- Next we establish connection, for this we need to configure connection string.
- Go to `config/default.json` and enter/change the values of following keys:

  - sqlServer.server
  - sqlServer.database
  - sqlServer.user
  - sqlServer.password

- And we are good to go to configuring environment part.

## Cloning Repository

- Download Project files

  - Clone using git
    ```
    git clone https://github.com/Jazzel/HU-DB-Project
    cd HU-DB-Project/
    ```
    #### Or
  - Download the repository from [https://github.com/Jazzel/HU-DB-Project](https://github.com/Jazzel/HU-DB-Project) then move to the directory where you downloaded or cloned the repository and cd into project directory.

    `cd HU-DB-Project-main/`

- Install dependencies via your powershell/terminal/cmd.
  - First we install dependencies for the backend:
    ```
    yarn
    ```
  - Now, for the frontend:
    ```
    cd client
    yarn
    ```

## Launching the Project

### Running Backend:

- In the terminal (root directory) run:
  `  yarn server`
  This will start the server on localhost with port 5000.

Verify by opening browser and go to [http:\\localhost:5000](http:\localhost:5000). You will see Hello World as a response on plain HTML page.

### Running Frontend:

- In the terminal (root directory) we now have to change directory, For this:
  ```
  cd client
  ```
- Then run:
  ```
  yarn start
  ```
  This will start the frontend development server on [http:\\localhost:3000](http:\localhost:3000), and you will see the login page once the build is complete.

### Running both together

Concurrently helps to run multiple JS projects together.

Make sure you have installed dependencies for both frontend and backend.

- For doing this, again in the terminal (root directory), we run:
  ```
  yarn dev
  ```

This will make both client and server to be hosted on different ports, i.e. frontend on 3000 and backend on 5000 at localhost.

Enjoyyy !!

[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)&nbsp;![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
]()
