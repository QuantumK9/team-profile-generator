const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const ENGINEER = "Add an engineer";
const INTERN = "Add an intern";
const FINISH = "Finish building the team";

const questions = {
  starting: [
    {
      type: "input",
      name: "name",
      message: "Enter your name:",
    },
    {
      type: "input",
      message: "Enter your Employee ID:",
      name: "id",
    },

    {
      type: "input",
      message: "Enter your email:",
      name: "email",
    },
    {
      type: "input",
      message: "Enter your Office number:",
      name: "officeNumber",
    },
  ],
  options: [
    {
      type: "list",
      name: "options",
      message: "Choose an option:",
      choices: [ENGINEER, INTERN, FINISH],
    },
  ],
  engineer: [
    {
      type: "input",
      name: "engineerName",
      message: "Enter Engineer's name:",
    },
    {
      type: "input",
      name: "engineerId",
      message: "Enter Engineer's id:",
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "Enter Engineer's email:",
    },
    {
      type: "input",
      name: "engineerGithub",
      message: "Enter Engineer's Github username:",
    },
  ],
  intern: [
    {
      type: "input",
      name: "internName",
      message: "Enter Intern's name:",
    },
    {
      type: "input",
      name: "internId",
      message: "Enter Intern's id:",
    },
    {
      type: "input",
      name: "internEmail",
      message: "Enter Intern's email:",
    },
    {
      type: "input",
      name: "internSchool",
      message: "Enter Intern's school:",
    },
  ],
};

const init = () => {
  inquirer.prompt(questions.starting).then((data) => {
    console.log(data);
    inquirer.prompt(questions.options).then((optionsData) => {
      console.log(optionsData);
      switch (optionsData.options) {
        case ENGINEER:
          // console.log("add engineer");
          inquirer.prompt(questions.engineer).then((engineerData) => {
            console.log(engineerData);
          });
          break;
        case INTERN:
          // console.log("add intern");
          inquirer.prompt(questions.intern).then((internData) => {
            console.log(internData);
          });
          break;

        default:
          console.log("finish");
          break;
      }
    });
  });
};

init();
