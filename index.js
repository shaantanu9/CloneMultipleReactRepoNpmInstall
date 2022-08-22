// require shelljs and clone multiplle repo at particular location
const shell = require("shelljs"); // shell
const path = require("path"); // clone multiple repos
const fs = require("fs"); // fs module to read the file
const { secureHeapUsed } = require("crypto");

const repoLink = []; // URL of the repo to be cloned

// delete all folder in the current directory except for the .git folder using process

const deleteFolder = (folderName) => {
  shell.rm("-rf", folderName);
};

const goBackDirectory = repoLink[0]
  .split("https://github.com/masai-course/")[1]
  .split("/tree/master/")[0];

const getOutOfFolder = (folderName) => {
  while (true) {
    const currentFolder = fs.readdirSync(process.cwd()); // get current folder
    if (currentFolder.includes(folderName)) {
      // if the current folder is the folderName
      break;
    }
    process.chdir(".."); // go to parent folder
  }
  console.log(`${folderName} folder found`); // print the folder name
  return;
};

const filterFolderAndDelete = (folder_Name) => {
  folderName = folder_Name.split("/")[1]; // split the folder name
  const currentFolder = fs.readdirSync(process.cwd()); // get current folder
  const filteredFolder = currentFolder.filter((folder) => {
    return folder !== folderName; // filter the folder name
  });

  filteredFolder.forEach((folder) => {
    // for each folder in the filtered folder
    deleteFolder(folder); // delete the folder
  });
  return;
};

const editPackageJson = (studentName, cdFolder) => {
  let pwd = shell.exec("pwd").stdout; // get the current working directory
  pwd = pwd.trimEnd(); // trim the end of the string
  let studentCode = studentName.split("_")[2]; // get the student code
  try {
    packageJson = require(pwd + "/package.json"); // get the package.json file
    packageJson["dependencies"]["react-scripts"] = "5.0.0"; // edit the version of react-scripts
    packageJson["scripts"][
      "start"
    ] = `PORT=5${studentCode} react-scripts start`; // edit the start script
    fs.writeFileSync(
      "./package.json", // write the package.json file
      JSON.stringify(packageJson, null, 2), // write the edited package.json file
      "utf8",
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!"); // print the message if the file is saved
      }
    );
    shell.exec("npm install"); // install the dependencies
  } catch (e) {
    console.log(e); // print the error if the file is not found
  }
  getOutOfFolder(goBackDirectory); // get out of the folder till particular folder
};
const cloneSingleRepo = (repo) => {
  let [repoLink, cdFolder] = repo.split("/tree/master");
  studentName = repoLink.split("https://github.com/masai-course/")[1];
  // clone repo to the respective folder
  shell.exec(`git clone ${repoLink}`);

  shell.cd(studentName); // go to the folder

  // filter the folder list
  filterFolderAndDelete(cdFolder); // filter the folder and delete the folder
  // cd to the folder
  // remove the starting slash from the folder name
  cdFolder = cdFolder.replace(/^\//, "");
  console.log(cdFolder);
  shell.cd(cdFolder);

  // Edit the package.json file for react-scripts version
  editPackageJson(studentName, cdFolder); // edit the package.json file
};
// cloneSingleRepo(repoLink[0]);

repoLink.forEach((repo) => {
  // clone all the repos
  cloneSingleRepo(repo); // clone the single repo
});
