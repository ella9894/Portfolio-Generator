const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');
//const pageHTML = generatePage(portfolioData);

const promptUser = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter your name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your Github Username (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your Github Username!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
                return true;
            } else {
                return false;
            }
        }
    }
    ]);
};
const promptProject = portfolioData => {
    
    console.log(`
    ==================
    Add a New Project
    ==================
    `);
    //If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDes => {
                if (projectDes) {
                    return true;
                } else {
                    console.log('Please enter a description of your project!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)',
            validate: githubLink => {
                if (githubLink) {
                    return true;
                } else {
                    console.log('Please enter your Github link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};
const mockData = {
    name: 'Ella',
    github: 'ella9894',
    confirmAbout: true,
    about: 'I am a Software Developer!',
    projects: [
        {
            name: 'Run-Buddy',
            description: 'Fitness Trainer website!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum perferendis quidem vel iure officia qui ullam explicabo dolorem reprehenderit voluptate expedita nisi unde ab quod, aliquam, veritatis deleniti veniam. Quaerat?',
            languages: ['HTML','CSS'],
            link: 'https://ella9894.github.io/Run-Buddy/',
            feature: true,
            confirmAddProject: true
        },
        {
            name: 'Taskinator',
            description: 'Create Tasks and categorize them by  completion status!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum perferendis quidem vel iure officia qui ullam explicabo dolorem reprehenderit voluptate expedita nisi unde ab quod, aliquam, veritatis deleniti veniam. Quaerat?',
            languages: ['HTML','CSS','Javascript'],
            link: 'https://ella9894.github.io/Taskinator/',
            feature: true,
            confirmAddProject: true
        },
        {
            name: 'Taskmaster Pro',
            description: 'Create, drag and drop tasks based on stats! And be able to delete them!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum perferendis quidem vel iure officia qui ullam explicabo dolorem reprehenderit voluptate expedita nisi unde ab quod, aliquam, veritatis deleniti veniam. Quaerat?',
            languages: ['HTML','CSS','Javascript','Bootsrap','jQuery'],
            link: 'https://ella9894.github.io/Taskmaster-Pro/',
            feature: false,
            confirmAddProject: false
        },
        {
            name: 'Accessibility Challenge',
            description: 'Make website accessible!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum perferendis quidem vel iure officia qui ullam explicabo dolorem reprehenderit voluptate expedita nisi unde ab quod, aliquam, veritatis deleniti veniam. Quaerat?',
            languages: ['HTML','CSS'],
            link: 'https://ella9894.github.io/Accessibility-Challenge/',
            feature: false,
            confirmAddProject: false
        }
    ]
};
// promptUser()
//     .then(promptProject)
//     .then(portfolioData => {
//         const pageHTML = generatePage(portfolioData);
//         fs.writeFile('./index.html',pageHTML, err => {
//             if (err) throw new Error(err);
//         });
//     });
   
const pageHTML = generatePage(mockData);
fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw new Error(err);
});




// fs.writeFile('./index.html',pageHTML, err => {
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });