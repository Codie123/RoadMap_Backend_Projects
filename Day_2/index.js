// # https://api.github.com/users/<username>/events

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = () => {
  console.log(
    "______________________Welcome to Project Github User Activity Tracker ______________________"
  );
  rl.question("Please enter the username :", async (username) => {
    if (username) {
      getUser(username);
      rl.close();
    } else {
      console.log("Please enter a valid username");
      rl.close();
    }
  });
};

const getUser = async (username) => {
  try {
    const data = await fetch(`https://api.github.com/users/${username}/events`);
    const res = await data.json();

    if (res.status === "404") {
      console.log("---------------User not found-----------------");
    } else {
      output(res, username);
    }
  } catch (error) {
    console.log(error);
  }
};

const output = (data, username) => {
  console.log("Output: ");
  console.log(
    ` - Pushed ${data.length} commits to ${username}/${data[0].repo.name}`
  );
  console.log(
    `---------------------------------------------------------------------------------------`
  );
};

main();
