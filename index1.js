// const Calc = require("calc-js").Calc;
const path = require("path");
// console.log(path.resolve("dateUtils"));

const fs = require("fs").promises;

(async () => {
  try {
    const data = await fs.readFile(path.resolve("./data.txt"), "utf-8");

    // newContent = `${data} + new Word`;
    // await fs.writeFile(path.resolve("./data1.txt"), newContent, "utf-8");

    // await fs.rename("./dateUtils.js", "./tmp/dateUtils.js");
    console.log(await fs.readdir("./tmp"));
    await fs.appendFile("./data1.txt", " + find Forrester", "utf-8");
    await fs.unlink("./data1.js");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
})();

// fs.readFile(path.resolve("./data.txt"), "utf-8")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.error);

// console.log(process.argv);
// const [, , a, b] = process.argv;
// console.log(new Calc(parseInt(a)).sum(parseInt(b)).finish());
