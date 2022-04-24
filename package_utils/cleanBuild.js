/**
 * Erases the build dir... Because rimraf or other gave us problems in Windows.
 */
const fs = require('fs');
const path = require('path');

const FOLDER_TO_EMPTY = './build';

/**
 * Deletes the folder specified and all its content.
 */
const emptyFolderBuild = function emptyFolderBuild(dirPath) {
  const dirName = dirPath.split(path.sep).pop();
  if (dirName === 'public') {
    return;
  }

  if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);

      if (fs.lstatSync(curPath).isDirectory()) {
        emptyFolderBuild(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    if (dirName === 'build') {
      return;
    }

    fs.rmdirSync(dirPath);
  }
};

console.log(`Emptying folder ${FOLDER_TO_EMPTY}...`);
emptyFolderBuild(FOLDER_TO_EMPTY);
console.log('Folder emptied.');
