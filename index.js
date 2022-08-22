// require shelljs and clone multiplle repo at particular location
const shell = require("shelljs"); // shell
const path = require("path"); // clone multiple repos
const fs = require("fs"); // fs module to read the file
const { secureHeapUsed } = require("crypto");

const repoLink = [
  "https://github.com/masai-course/Aayan_Fw19_0824/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Abhishek_fp03_166/tree/master/unit-4/sprint-3/evaluation",
  "https://github.com/masai-course/aditya_fw17_0158/tree/master/rct101/sprint-3/evaluation",
  "https://github.com/masai-course/akash_fw17_0732/tree/master/unit-4/sprint-3/evaluation/eval-3/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Amit_fw18_0332/tree/master/unit-1/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a/masai-ops",
  "https://github.com/masai-course/ankesh_fw16_654/tree/master/unit-4/sprint-4/optional",
  "https://github.com/masai-course/Ankit_fw19_1313/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Ashish_fw19_0772/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Ashutosh_fw15_355/tree/master/unit-4/sprint-3/rct101-c3",
  "https://github.com/masai-course/Avadhut_fw19_0511/tree/master/unit-4/sprint-4/day-1/assignments",
  "https://github.com/masai-course/avinash_fw17_0431/tree/master/unit-4-async/sprint-3/evaluation",
  "https://github.com/masai-course/Ayush_fw14_388/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Ayush_fw19_0064/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/balaji_fw17_0250/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Dhananjay_fp03_013/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Gaurav_fw18_0424/tree/master/unit-4/sprint-3/evaluation",
  "https://github.com/masai-course/Guru_fp03_323/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/imran_fp01_215/tree/master/RCT101-B18/sprint-3/evaluation/Restaurant",
  "https://github.com/masai-course/janaki_fw19_0639/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Karishma_fw18_1136/tree/master/unit-4/sprint-3/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/lakhan_fw17_0609/tree/master/unit-4/sprint-3/evaluation/masai-ops-sprint3",
  "https://github.com/masai-course/Lokesh_fw18_0979/tree/master/unit-4/sprint-3/evaluation/U4_S3",
  "https://github.com/masai-course/Mahesh_fw17_0978/tree/master/unit-4/sprint-3/evaluation/rct-101-c3-problem-template-forked%20(2)",
  "https://github.com/masai-course/md_fw17_0610/tree/master/unit--4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Naveed_fp03_063/tree/master/unit-4/sprint-3/optional/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/panday801_fw18-0801/tree/master/unit-4/sprint-3/evaluation/rct-101-c3-problem-template-forked%20(1)",
  "https://github.com/masai-course/Prashant_fw18_0678/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Pravhat_fw18_0616/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Pravin_fw18_0265/tree/master/unit-4/sprint-3/evaluation/evalRes",
  "https://github.com/masai-course/Rahul_fw18_0737/tree/master/unit-4/evaluation/c3",
  "https://github.com/masai-course/rohit_fw17_0533/tree/master/unit-4/sprint-3/day-4/you/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Sachin_fw18_0017/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Sahil_fp04_384/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/satyaprakash_fw17_0238/tree/master/unit-4/sprint-3/day-4/Evaluation",
  "https://github.com/masai-course/shani_fw16_297/tree/master/unit-4/sprint-4/evaluation-3",
  "https://github.com/masai-course/Shubham_fp03_260/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Shubham_fw19_0442/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/sirtaj_fw17_0344/tree/master/unit-4/sprint-3/evaluation/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a/src",
  "https://github.com/masai-course/Sombir_fw19_0187/tree/master/unit-4/sprint-3/evaluation/masai",
  "https://github.com/masai-course/Sunil_fw18_0198/tree/master/unit-4/sprint-3/evaluation",
  "https://github.com/masai-course/supriya_fw17_1094/tree/master/unit-4/sprint-3/evalution/masai-ops-eb8c3fd4-2f7c-4649-896a-e0fff9e2bf19-7808a0a",
  "https://github.com/masai-course/Surendra_fw18_1040/tree/master/unit-4/sprint-3/evaluation/rct-101-c3-problem-template-forked",
  "https://github.com/masai-course/Tarun_fw19_1172/tree/master/unit-4/sprint-2/day-4/assignments/react-sprint1-problem7-main",
  "https://github.com/masai-course/vivek_fw17_0086/tree/master/unit-4/sprint-3/evaluation/sprint3evaluation",
  "https://github.com/masai-course/Yadav_fw18_0129/tree/master/unit-4/sprint-3/evaluation/c3/src",
]; // URL of the repo to be cloned

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
