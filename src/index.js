const pug = require('pug');
// Compile the source code
const compiledFunction = pug.compileFile('src/template.pug');

const getAllFilesFromFolder = (dir) => {
    const filesystem = require("fs");
    let results = [];

    filesystem.readdirSync(dir).forEach((file) => {

        file = dir + '/' + file;
        const stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFilesFromFolder(file))
        } else results.push(file);

    });
    return results;
};

const writeFile = (folders) => {
    const fs = require('fs');
    console.log(folders);
    const html = compiledFunction({
        folders
    });
    fs.writeFile("index.html", html, (err) => {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

const dir = process.argv[2] || __dirname;
const folders = getAllFilesFromFolder(dir);
writeFile(folders);
