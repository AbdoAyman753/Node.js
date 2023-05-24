const { program } = require("commander");
const fs = require("fs");

const readData = () => {
  const dataString =
    fs.readFileSync("./data.json", { encoding: "utf-8" }) || [];
  const data = JSON.parse(dataString);
  return data;
};

const writeData = (data) => {
  let dbData = [];
  dbData = readData();
  dbData.push(data);
  fs.writeFileSync("./data.json", JSON.stringify(dbData), {
    encoding: "utf-8",
  });
};

const overrideData = (data) => {
  fs.writeFileSync("./data.json", JSON.stringify(data), {
    encoding: "utf-8",
  });
};

const statusValues = ["to-do", "in-progress", "done"];

// Add Command
program
  .command("add")
  .description("User can add Entry to To-Do List.")
  .argument("<string>", "string to add")
  .requiredOption("-t, --title <string>", "Title of The Entry")
  .option("-s, --status <string>", "Status of The Entry", "to-do")
  .action((arg, options) => {
    if (!statusValues.includes(options.status)) {
      console.log("Status must be :'to-do','in-progress' or 'done'.");
      return;
    }
    let data = readData();
    // console.log(data[data.length - 1]);
    writeData({
      id: Number(data[data.length - 1].id) + 1,
      title: options.title,
      description: arg,
      status: options.status,
    });
  });

// List Command
program
  .command("list")
  .description("List All Entries in To-Do List.")
  .option("-s, --status <string>", "Status of The Entry")
  .action((arg, options) => {
    if (!statusValues.includes(options.status)) {
      console.log("Status must be :'to-do','in-progress' or 'done'.");
      return;
    }
    if (arg.hasOwnProperty("status")) {
      let data = readData();
      let results = data.filter((x) => x.status == arg.status);
      console.log(results);
    } else {
      console.log(readData());
    }
    // console.log(arg.hasOwnProperty('status'));
  });

//Edit Command
program
  .command("edit")
  .description("Edit entry by id")
  .argument("[string]", "string to edit")
  .option("-t, --title <string>", "Title of The Entry")
  .requiredOption("-i, --id <number>", "Id of entry to edit")
  .option("-s, --status <string>", "Status of The Entry")
  .action((arg, options) => {
    // console.log(arg, options);
    const filter = {};
    if (arg) {
      filter.description = arg;
    }
    if (options.title) {
      filter.title = options.title;
    }
    if (options.status) {
      if (!statusValues.includes(options.status)) {
        console.log("Status must be :'to-do','in-progress' or 'done'.");
        return;
      }
      filter.status = options.status;
    }
    // console.log(arg,options.title, options.id);
    let editedData = readData();
    // console.log(editedData);
    let index = editedData.findIndex(
      (entry) => entry.id === Number(options.id)
    );
    editedData[index] = { ...editedData[index], ...filter };
    overrideData(editedData);
  });

//Delete Command
program
  .command("delete")
  .description("delete entry by id")
  .requiredOption("-i, --id <number>", "Id of entry to edit")
  .action((arg) => {
    // console.log(arg.id);
    let editedData = readData();
    // // console.log(editedData);
    let index = editedData.findIndex((entry) => entry.id === Number(arg.id));
    editedData.splice(index, 1);
    overrideData(editedData);
  });

program.parse();
