# Project Installation Guide

## Installation developement setup

1. VSCode
   - VSCode is the IDE that will be used for this project
   - Download at: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
2. Git and GitHub and GitBash
    - Git is a command used on the command line
    1. Download at: [https://git-scm.com/downloads](https://git-scm.com/downloads)
    2. Set up Git credientials on GitHub
    3. Set up Git credientials on GitBash
3.  Integrate GitHub and VSCode
    - Add GitBash as terminal instead of powershell, reference: https://code.visualstudio.com/docs/editor/github
    1. Go to File --> Preferences --> Settings --> Open Settings (Top Right 3rd button)
    2. Paste `"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"` as the last line
    3. Refresh VSCode and use Ctrl+~ to view git terminal.
    - Add the GitHubs extension
    1. 5th Button on the left of VS Code, search and install Github and install <b>Github</b> and <b>Github Pull Requests and Issues</b>
4. Install project extensions for VSCode
    - Prettier
    - Eslint
    - TypeScript
    1. Download <b>Node.js</b> at: https://nodejs.org/en/
    2. <b>NPM</b> gets installed along with <b>Node.js</b>
    3. Install Typescript using `npm install -g typescript` through terminal
    
## Installing the project (Front end)
1. AdobeXD
    - Tool that is used to design the pages of nushlink website
    1. Download at: https://www.adobe.com/products/xd.html (Start for free is not a trial version, can be used for as long as needed) 
2. React
    - React is a JavaScript framework, a front end library, comes with prebuilt structures and components to build the app quicker
    1. Input `npm install -g create-react-app` into terminal
    2. Create a React App using `npx create-react-app name-of-app --template typescript`
    3. May need to install Material-UI `npm install @material-ui/core` for pre-made textfields and other components
3. SCSS (or Sass, Syntactically Awesome StyleSheets)
    - Scss allows usage of features that do not exist in normal CSS, improves the styling of the project
    - 7 to 1 file structure for SCSS
    1. Download SCSS compiler, <b>Live Sass Compiler</b> extension via VSCode
    


## Installing the project (Back end)

1. Install XAMPP
   
   - For hosting a local mysql server
   - You can instead mysql instead of mariaDB in this link: [https://stackoverflow.com/questions/39654428/how-can-i-change-mariadb-to-mysql-in-xampp](https://stackoverflow.com/questions/39654428/how-can-i-change-mariadb-to-mysql-in-xampp)
