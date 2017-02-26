const getAllFilesFromFolder = (dir) => {
    console.log(dir);
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

const writeFile = () => {
    const fs = require('fs');
    fs.writeFile("index.html", "still Testing!", (err) => {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

const dir = process.argv[2] || __dirname;
// writeFile();
// getAllFilesFromFolder(dir);