const pup = require("puppeteer");
const fs = require("fs");
const path = require("path");
const url = "https://bscscan.com/contractsVerified/1?ps=100";
let count = 1;

(async () => {
  const browser = await pup.launch({ headless: true });
  const page = await browser.newPage();
  console.log("i'm running...");
  await page.goto(url);
  const links = await page.$$eval('a[href*="/tx/"]', (el) =>
    el.map((link) => link.href)
  );
  // createDirectory();
  await browser.close();
})();

const createDirectory = async () => {
  const dir = "./files";
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      console.log("Directory is created.");
    } else {
      console.log("Directory already exists.");
    }
  } catch (err) {
    console.log(err);
  }
};
