const data = require("./data.json");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = () => {
  console.log(
    `---------------------Hello Friend, Welcome to Expense Tracker  ---------------------`
  );
  console.log(`| -- 1. Add Expense  -- |`);
  console.log(`| -- 2. View all expenses -- |`);
  console.log(`| -- 3. Update an Expense -- |`);
  console.log(`| -- 4. Delete an Expense -- |`);
  console.log(`| -- 5. View Summary of All Expenses -- |`);
  console.log(`| -- 6. View Summary of Expenses by Month -- |`);
  console.log(`| -- 7. Exit -- |`);
  rl.question("Enter the choice :", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter the description :", (desc) => {
          rl.question("Enter the amount :", (amount) => {
            add(desc, amount);
            console.log(
              `| --------------------------NEW EXPENSES ADDED SUCCESSFULLY-------------------------- |`
            );
            console.log(data);
            main();
          });
        });
        break;
      case "2":
        console.log(
          `| --------------------------NEW EXPENSES ADDED SUCCESSFULLY-------------------------- |`
        );
        console.log(data);
        main();
        break;
      case "3":
        rl.question(
          "Enter the id of the expense you want to update: ",
          (id) => {
            rl.question("Enter the New amount", (newAmount) => {
              const UpdatedExpense = update(id, newAmount);
              if (UpdatedExpense.status === true) {
                console.log(
                  `--------------------- Expense Updated Successfully  ---------------------`
                );
                console.log(
                  `--------------------- New Amount: ${UpdatedExpense.data.amount} ---------------------`
                );
                console.log(
                  `--------------------- Description: ${UpdatedExpense.data.desc} ---------------------`
                );
                console.log(
                  `-------------------------------------End Of Update-------------------------------------`
                );
                main();
              } else if (UpdatedExpense.status === false) {
                console.log(UpdatedExpense.message);
              }
            });
          }
        );
        break;
      case "4":
        rl.question(
          "Enter the id of the expense you want to delete: ",
          (id) => {
            const deletedExpense = deleteExpense(id);

            if (deletedExpense.status === true) {
              console.log(
                `--------------------- Expense Deleted Successfully  ---------------------`
              );
              console.log(
                `-------------------------------------End Of Delete-------------------------------------`
              );
              main();
            } else if (deletedExpense.status === false) {
              console.log(deletedExpense.message);
            }
          }
        );

        break;
      case "5":
        const sum = data.reduce((acc, obj) => {
          return acc + Number.parseInt(obj.amount);
        }, 0);
        console.log(
          `--------------------Total Expense: ${sum}---------------------`
        );
        console.log(
          `|---------------------End Of Summary---------------------|`
        );
        main();
        break;
      case "6":
        rl.question("Enter the month (01-12): ", (month) => {
          const filteredMonth = data.filter(
            (x) => x.createdAt.slice(5, 7) === month
          );

          const sum = sumbyMonth(filteredMonth);
          if (sum) {
            console.log(
              `------------------------ Sum of expenses in ${month} : ${sum} ------------------------`
            );
            console.log(
              `|---------------------End Of Summary---------------------|`
            );
            main();
          }
          //   const sum = sumByMonth(filteredMonth);
        });

        break;
      case "7":
        console.log(`-----------------------Thank You-----------------------`);
        process.exit();
        break;
      default:
        console.log("Invalid choice");
        main();
    }
  });
};

// Functions

const add = (desc, amount) => {
  const id = data.length + 1;
  const createdAt = new Date().toISOString();

  const updatedAt = new Date().toISOString();
  const dataObj = { id, desc, amount, createdAt, updatedAt };
  data.push(dataObj);
};

const update = (id, amount) => {
  const dataById = data.find((obj) => obj.id == id);
  if (!dataById) {
    return {
      status: false,
      message: "Data Not found with this id" + id,
    };
  } else {
    dataById.amount = amount;
    dataById.updatedAt = new Date().toISOString();
    return {
      status: true,
      message: "Data Updated Successfully",
      data: dataById,
    };
  }
};

const deleteExpense = (id) => {
  const dataById = data.find((obj) => obj.id == id);
  if (!dataById) {
    return {
      status: false,
      message: "Data Not found with this id" + id,
    };
  } else {
    const index = data.indexOf(dataById);
    data.splice(index, 1);
    return {
      status: true,
      message: "Data Deleted Successfully",
    };
  }
};

const sumbyMonth = (filteredData) => {
  return filteredData.reduce(
    (acc, val) => acc + Number.parseInt(val.amount),
    0
  );
};
// Ends here

main();
