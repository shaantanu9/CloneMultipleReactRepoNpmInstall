// require shelljs and clone multiplle repo at particular location
const shell = require("shelljs");
const path = require("path");
const fs = require("fs");

const repoLink = []; // URL of the repo to be cloned

const goBackDirectory = repoLink[0]
  .split("https://github.com/masai-course/")[1]
  .split("/tree/master/")[0];
// console.log(goBackDirectory);

const getOutOfFolder = (folderName) => {
  while (true) {
    const currentFolder = fs.readdirSync(process.cwd()); // get current folder
    if (currentFolder.includes(folderName)) {
      break;
    }
    process.chdir(".."); // go to parent folder
  }
  console.log(`${folderName} folder found`); // print the folder name
  return;
};

const editPackageJson = (studentName, cdFolder) => {
  let pwd = shell.exec("pwd").stdout;
  pwd = pwd.trimEnd();
  let studentCode = studentName.split("_")[2]; // get the student code
  try {
    packageJson = require(pwd + "/package.json"); // get the package.json file
    packageJson["dependencies"]["react-scripts"] = "5.0.0"; // edit the version of react-scripts
    packageJson["scripts"][
      "start"
    ] = `PORT=5${studentCode} react-scripts start`;
    fs.writeFileSync(
      "./package.json",
      JSON.stringify(packageJson, null, 2), // write the edited package.json file
      "utf8",
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!"); // print the message if the file is saved
      }
    );
    shell.exec("npm install");
  } catch (e) {
    console.log(e);
  }
  getOutOfFolder(goBackDirectory); // get out of the folder till particular folder
};
const cloneSingleRepo = (repo) => {
  const [repoLink, cdFolder] = repo.split("/tree/master");
  studentName = repoLink.split("https://github.com/masai-course/")[1];
  // console.log(studentName);
  // let studentCode = studentName.split("_")[2];
  // console.log(studentCode);
  // clone repo to the respective folder
  shell.exec(`git clone ${repoLink}`);
  // cd to the folder
  shell.cd(studentName + "/" + cdFolder);
  // Edit the package.json file for react-scripts version
  editPackageJson(studentName, cdFolder); // edit the package.json file
};
// cloneSingleRepo(repoLink[0]);

repoLink.forEach((repo) => {
  cloneSingleRepo(repo); // clone the single repo
});
