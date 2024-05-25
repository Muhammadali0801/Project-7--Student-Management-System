#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const randomNumner = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "Students",
        type: "input",
        message: chalk.yellow("Enter student name"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.red("Please enter your name");
        },
    },
    {
        name: "Courses",
        type: "list",
        message: chalk.magenta("Select the course to enrolled"),
        choices: ["Ms.Office", "Html", "Javascript", "Css", "English language"],
    },
]);
const tutionFee = {
    "Ms.Office": 3000,
    "Html": 4000,
    "Javascript": 6000,
    "Css": 3000,
    "English language": 3500,
};
console.log(chalk.green(`\n tution fee: ${tutionFee[answer.Courses]}/-\n`));
console.log(chalk.redBright(`Balance: ${myBalance}\n`));
const paymentType = await inquirer.prompt([
    {
        name: "Payment",
        type: "list",
        message: chalk.green("Select your payment method"),
        choices: [
            chalk.yellow("Bank transfer"),
            chalk.yellow("Easy paisa "),
            chalk.yellow("Jazz cash"),
        ],
    },
    {
        name: "Amount",
        type: "input",
        message: chalk.greenBright("Transfer money"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.redBright("Please enter a valid value");
        },
    },
]);
console.log(chalk.cyanBright(`\n You select payment method ${paymentType.Payment}\n`));
const tutionFees = tutionFee[answer.Courses];
const paymentAmount = parseFloat(paymentType.Amount);
if (tutionFees === paymentAmount) {
    console.log(chalk.bgCyan.black(`Congratulations you have successfully enrolled in ${answer.Courses}.\n`));
    let ans = await inquirer.prompt([
        {
            name: "Select",
            type: "list",
            message: chalk.bgBlackBright.white("What would you like to do next?"),
            choices: [
                chalk.magentaBright("View status"),
                chalk.magentaBright("Exit"),
            ],
        },
    ]);
    if (ans.Select === chalk.magentaBright("View status")) {
        console.log(chalk.blueBright("\n************ Status*******\n"));
        console.log(`Student name: ${answer.Students}`);
        console.log(`Student ID: ${randomNumner}`);
        console.log(`Course: ${answer.Courses}`);
        console.log(`Tution fees paid: ${paymentAmount}`);
        console.log(`Balance: ${(myBalance += paymentAmount)}`);
    }
    else {
        console.log(chalk.redBright("\n Exiting Student Management System"));
        process.exit();
    }
}
else {
    console.log(chalk.redBright("\n Invalid amount due to course\n"));
}
