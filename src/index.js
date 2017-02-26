const fs = require("fs");
const path = require("path");
const pug = require('pug');
// Compile the source code
const compiledFunction = pug.compileFile('src/template.pug');

// Lists all files in directorys
const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory() ?
            walkSync(path.join(dir, file), filelist) :
            filelist.concat(path.join(dir, file));

    });
    return filelist;
}

// Lists only directorys
const directoryList = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

const writeFile = (folders) => {
    const html = compiledFunction({
        folders
    });
    fs.writeFile('index.html', html, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}

const copyFile = (dir, file = 'index.html') => {
    fs.createReadStream(file).pipe(fs.createWriteStream(path.join(dir, file)));
}

const dir = process.argv[2] || __dirname;
const folders = directoryList(dir);
writeFile(folders);
copyFile(dir);