const { stat } = require("fs");
const data = require("./data.json");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = () => {
  console.log("Welcome to Task Manager!");
  console.log("Please select an option:");
  console.log("1. Add task");
  console.log("2. Update task");
  console.log("3. Delete task");
  console.log("4. View all tasks");
  console.log("5. View tasks by status");
  console.log("6. Exit");
  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter task description: ", (description) => {
          rl.question("Enter the Status:", (status) => {
            const newTask = add(description, status);
            console.log("Task added successfully!");
            console.log("-----------------------------------------");
            console.log(`| -- Task Title - ${newTask.description} -- |  `);
            console.log(`| -- Status -  ${newTask.status} -- |`);
            console.log("-----------------------------------------");

            main();
          });
        });
        break;
      case "2":
        rl.question("Enter task ID: ", (id) => {
          rl.question("Enter new status: ", (status) => {
            const updatedTask = update(id, status);
            console.log("Task updated successfully!");

            console.log("-----------------------------------------");
            console.log(`| -- Task Title - ${updatedTask.description} -- |  `);
            console.log(`| -- Status -  ${updatedTask.status} -- |`);
            console.log("-----------------------------------------");

            main();
          });
        });

        break;
      case "3":
        rl.question("Enter task ID:", (id) => {
          const deletedTask = deleteTask(id);
          console.log(`Task ${deletedTask.id} has been Successfully Deleted!`);
          console.log("-----------------------------------------");
          console.log(`| -- Task Title - ${updatedTask.description} -- |  `);
          console.log(`| -- Status -  ${updatedTask.status} -- |`);
          console.log("-----------------------------------------");

          console.log(`${deletedTask} has been Successfully Deleted!`);
          main();
        });
        break;
      case "4":
        const allTask = queryAll();
        console.log("All Tasks are:");
        if (allTask.length == 0) {
          console.log("No tasks found");
        } else {
          console.log(
            allTask.forEach((x) =>
              console.log(
                `Task ID: ${x.id} Description: ${x.description} Status: ${x.status} Created At: ${x.createdAt} Updated At: ${x.updatedAt}`
              )
            )
          );
        }

        main();
        break;
      case "5":
        rl.question("Enter status: ", (status) => {
          const taskByStatus = queryByStatus(status);
          console.log(`Tasks with status ${status} are:`);
          console.log(
            taskByStatus.forEach((x) =>
              console.log(
                `Task ID: ${x.id} Description: ${x.description} Status: ${x.status} Created At: ${x.createdAt} Updated At: ${x.updatedAt}`
              )
            )
          );
          main();
        });
        break;
      case "6":
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        main();
    }
  });
};

const add = (description, newStatus) => {
  const id = data.length + 1;
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();
  const status = newStatus;
  const newTask = {
    id,
    description,
    status,
    createdAt,
    updatedAt,
  };
  data.push(newTask);
  return newTask;
};

const update = (id, status) => {
  // First Method
  // const index = data.findIndex((x) => x.id == id);
  // const task = data[index];
  // Second Method
  const dataById = data.find((x) => x.id == id);

  if (!dataById) {
    return null;
  }

  dataById.status = status;
  dataById.updatedAt = new Date().toISOString();
  return dataById;
};

const deleteTask = (id) => {
  const index = data.findIndex((id) => id.id === id);
  const deletedTask = data[index];
  data.splice(index, 1);
  return deletedTask;
};

const queryAll = () => {
  return data;
};

const queryByStatus = (status) => {
  const filteredData = data.filter((id) => id.status === status);
  return filteredData;
};

main();
