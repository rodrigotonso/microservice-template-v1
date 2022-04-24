/**
 * This scripts tidies the docs (because typedoc has some things uncofortable...)
 */
const fs = require('fs');
const path = require('path');

const DOCS_FOLDER = './docs/code';

/**
 * Gets all dirs in the path.
 */
const getAllDirs = function getAllDirs(dirPath) {
  if (!fs.existsSync(dirPath) || !fs.lstatSync(dirPath).isDirectory()) {
    return [];
  }
  let resultList = [];
  fs.readdirSync(dirPath).forEach((subthing) => {
    const subthingPath = path.join(dirPath, subthing);
    if (fs.lstatSync(subthingPath).isDirectory()) {
      const subdirs = getAllDirs(subthingPath);
      resultList.push(subthingPath);
      resultList = resultList.concat(subdirs);
    }
  });
  resultList.push(dirPath);
  return resultList;
};

/**
 * Gets all files in the dirs.
 */
const getAllFiles = function getAllFiles(dirs = []) {
  const fileList = [];
  dirs.forEach((dir) => {
    fs.readdirSync(dir).forEach((subthing) => {
      const subthingPath = path.join(dir, subthing);
      if (fs.lstatSync(subthingPath).isDirectory()) {
        return true;
      }
      fileList.push(subthingPath);
    });
  });
  return fileList;
};

/**
 * Filter all the files that are not HTMLs in the array.
 */
const filterNotHTMLs = function filterNotHTMLs(fileList) {
  return fileList.filter((e) => e.endsWith('.html'));
};

/**
 * Erase from the text the tags with wrong links.
 */
const eraseAwfulLinks = function eraseAwfulLinks(file) {
  const fileContent = fs.readFileSync(file, { encoding: 'utf8' });
  const newContent = fileContent
    .replace(/<li.*?src.*?<\/li>/gim, '')
    .replace(/<a.*?modules\/src.*?<\/a>/gim, '')
    .replace(/<a.*?src\\.*?<\/a>/gim, '');
  fs.unlinkSync(file);
  fs.writeFileSync(file, newContent, { encoding: 'utf8' });
  return true;
};

const allDirs = getAllDirs(DOCS_FOLDER);
const allFiles = getAllFiles(allDirs);
const htmls = filterNotHTMLs(allFiles);
htmls.forEach((html) => {
  console.log(`Cleaning ${html}`);
  eraseAwfulLinks(html);
});
console.log('Finished!');
