const Employee = require("./lib/Employee");
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
// local state of team members
const team = [];

const ENGINEER = "Add an engineer";
const INTERN = "Add an intern";
const FINISH = "Finish building the team";

const questions = {
  starting: [
    {
      type: "input",
      name: "name",
      message: "Enter Team Manager's Name:",
      validate: validateText,
    },
    {
      type: "input",
      message: "Enter Team Manager's Employee ID:",
      name: "id",
      validate: validateNumbers,
    },

    {
      type: "input",
      message: "Enter Team Manager's email:",
      name: "email",
      validate: validateEmail,
    },
    {
      type: "input",
      message: "Enter Team Manager's Office number:",
      name: "officeNumber",
      validate: validateNumbers,
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
      validate: validateText,
    },
    {
      type: "input",
      name: "engineerId",
      message: "Enter Engineer's id:",
      validate: validateNumbers,
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "Enter Engineer's email:",
      validate: validateEmail,
    },
    {
      type: "input",
      name: "engineerGithub",
      message: "Enter Engineer's Github username:",
      validate: validateText,
    },
  ],
  intern: [
    {
      type: "input",
      name: "internName",
      message: "Enter Intern's name:",
      validate: validateText,
    },
    {
      type: "input",
      name: "internId",
      message: "Enter Intern's id:",
      validate: validateNumbers,
    },
    {
      type: "input",
      name: "internEmail",
      message: "Enter Intern's email:",
      validate: validateEmail,
    },
    {
      type: "input",
      name: "internSchool",
      message: "Enter Intern's school:",
      validate: validateText,
    },
  ],
};
// asks starting questions
function askQuestions() {
  return inquirer.prompt(questions.starting);
}
// function that asks options questions (list) and then calls the check option function giving the response
function askOptionsQuestions() {
  return inquirer.prompt(questions.options).then((response) => {
    checkOption(response);
  });
}
// function that returns the promise after asking the Engineer questions to user
const askEngineerQuestions = () => {
  return inquirer.prompt(questions.engineer);
};
// function that returns the promise after asking the Intern questions to user
const askInternQuestions = () => {
  return inquirer.prompt(questions.intern);
};

// function that takes response from options question function and based on option it calls engineer or intern questions functions AND calls askOptionsQuestions function again to ask for option again.
function checkOption(optionsData) {
  switch (optionsData.options) {
    case ENGINEER:
      return askEngineerQuestions().then((engineerData) => {
        const { engineerName, engineerId, engineerEmail, engineerGithub } =
          engineerData;
        const engineer = new Engineer(
          engineerName,
          engineerId,
          engineerEmail,
          engineerGithub
        );
        team.push(engineer);
        return askOptionsQuestions();
      });
      break;
    case INTERN:
      return askInternQuestions().then((internData) => {
        const { internName, internId, internEmail, internSchool } = internData;
        const intern = new Intern(
          internName,
          internId,
          internEmail,
          internSchool
        );
        team.push(intern);
        return askOptionsQuestions();
      });
      break;

    default:
      return finish();
      break;
  }
}

// function that exits the loop and renders - later to call render function
const finish = () => {
  const pageContent = render(team);
  writeToFile(outputPath, pageContent);
};

// function that writes data to a file and displays error if not
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    err ? console.log(err) : console.log("Success!");
  });
}

const init = () => {
  // call starting questions function and after response call options questions function
  return askQuestions().then((data) => {
    const { name, id, email, officeNumber } = data;
    const manager = new Manager(name, id, email, officeNumber);
    team.push(manager);
    return askOptionsQuestions();
  });
};

//validation functions
function validateEmail(input) {
  let emailReGex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (!emailReGex.test(input)) {
    return "Invalid email";
  }
  return true;
}

const numRegEx = /[0-9]/;
const stringsRegEx = /[A-Za-z]/;
function validateText(input) {
  if (!stringsRegEx.test(input)) {
    return "Enter some valid input";
  }
  return true;
}

function validateNumbers(input) {
  if (!numRegEx.test(input) || stringsRegEx.test(input)) {
    return "Enter some valid numeric input";
  }
  return true;
}

init();
