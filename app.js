const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
console.clear()
console.log(`
                 _                                               
 _ __ ___  _   _| |_ ___  __ _ _ __ ___        __ _ _ __  _ __  
| '_ \` _ \\| | | | __/ _ \\/ _\` | '_ \` _ \\ ____ / _\` | '_ \\| '_ \\ 
| | | | | | |_| | ||  __/ (_| | | | | | |____| (_| | |_) | |_) |
|_| |_| |_|\\__, |\\__\\___|\\__,_|_| |_| |_|     \\__,_| .__/| .__/ 
           |___/                                   |_|   |_|    

`
)

// global variables
let addTeam = true
let id = 1
let team = []
// manager questions
const managerQuestions = [
    {
        name: 'name',
        type: 'input',
        message: 'What is the manager\'s name?\n'
    },
    {
        name: 'email',
        type: 'input',
        message: 'What is the manager\'s e-mail?\n'
    },
    {
        name: 'officeNum',
        type: 'input',
        message: 'What is the manager\'s office number?\n'
    }
]
// add member questions
const memberQuestions = [
    {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?\n',
        choices: ['Add Engineer', 'Add Intern', 'Done'],
    },
    {
        name: 'name',
        type: 'input',
        message: 'What is the team member\'s name?\n',
        when: answers => answers.action !== 'Done'
    },
    {
        name: 'email',
        type: 'input',
        message: 'What is the team member\'s e-mail?\n',
        when: answers => answers.action !== 'Done'
    },
    {
        name: 'github',
        type: 'input',
        message: 'What is the engineer\'s GitHub user name?\n',
        when: answers => answers.action === 'Add Engineer'
    },
    {
        name: 'school',
        type: 'input',
        message: 'What is the intern\'s school?\n',
        when: answers => answers.action === 'Add Intern'
    }
]
// main function of the app
async function mainApp() {
    // add manager first
    const managerData = await inquirer.prompt(managerQuestions)
    team.push(new Manager(managerData.name, id, managerData.email, managerData.officeNum))
    id++

    // loop to continue to add members
    do {
        await addMember()
        id++
    } while (addTeam === true)

    // test console log
    console.log(team)

    //render team html
    const html = render(team)
    fs.writeFileSync(outputPath, html)
}

// function to add members
async function addMember() {
    const response = await inquirer.prompt(memberQuestions)

    if (response.action === 'Done') {
        return addTeam = false
    } else {
        switch (response.action) {
        case 'Add Engineer':
            team.push(new Engineer(response.name, id, response.email, response.github))
            console.log(`Successfully added engineer ${response.name} to the team!`)
            break
        case 'Add Intern':
            team.push(new Intern(response.name, id, response.email, response.school))
            console.log(`Successfully added intern ${response.name} to the team!`)
            break
        }
    }
}

// to run the the main function app
mainApp()