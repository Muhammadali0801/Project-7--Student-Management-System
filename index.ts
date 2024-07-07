#! /usr/bin/env node


import inquirer from "inquirer";
import chalk from "chalk";


async function askStudentDetails() {
    const randomNumner: number = Math.floor(10000 + Math.random() * 90000);
    let myBalance: number = 0;

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

    const tutionFee: { [Key: string]: number } = {
        "Ms.Office": 3000,
        "Html": 4000,
        "Javascript": 6000,
        "Css": 3000,
        "English language": 3500,
    };
    console.log(chalk.green(`\nTuition fee: ${tutionFee[answer.Courses]}/-\n`));
    console.log(chalk.redBright(`Balance: ${myBalance}\n`));

    const paymentType = await inquirer.prompt([
        {
            name: "Payment",
            type: "list",
            message: chalk.green("Select your payment method"),
            choices: [
                chalk.yellow("Bank transfer"),
                chalk.yellow("Easy paisa"),
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
    console.log(chalk.cyanBright(`\nYou selected payment method ${paymentType.Payment}\n`));

    const tutionFees = tutionFee[answer.Courses];
    const paymentAmount = parseFloat(paymentType.Amount);

    if (tutionFees === paymentAmount) {
        console.log(
            chalk.bgCyan.black(
                `Congratulations! You have successfully enrolled in ${answer.Courses}.\n`
            )
        );

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
            console.log(chalk.blueBright("\n************ Status ************\n"));
            console.log(`Student name: ${answer.Students}`);
            console.log(`Student ID: ${randomNumner}`);
            console.log(`Course: ${answer.Courses}`);
            console.log(`Tuition fees paid: ${paymentAmount}`);
            console.log(`Balance: ${(myBalance += paymentAmount)}`);
        } else {
            console.log(chalk.redBright("\nExiting Student Management System"));
            process.exit();
        }
    } else {
        console.log(chalk.redBright("\nInvalid amount due to course\n"));
    }
}

async function main() {
    // Welcoming message
    console.log(chalk.greenBright("Welcome to the mshk-student-management-system!"));

    let again = true;
    while (again) {
        await askStudentDetails();
        const answer = await inquirer.prompt([
            {
                name: "retry",
                type: "confirm",
                message: "Do you want to enroll another student?",
                default: false,
            },
        ]);
        again = answer.retry;
    }

    // Ending message
    console.log(chalk.redBright("Thank you for using the mshk-student-management-system!"));
}

// Call the main function to start the program
main();
