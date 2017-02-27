const fs = require("fs");
const os = require("os");
const path = require("path");
const pug = require('pug');
// Compile the source code
const compiledTemplate = pug.compileFile('src/template.pug');

// Lists all files in directorys (not used at the moment)
const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory() ?
            walkSync(path.join(dir, file), filelist) :
            filelist.concat(path.join(dir, file));

    });
    return filelist;
}

// Lists only directorys
const directoryList = (dir, relative, filelist = []) => {
    fs.readdirSync(dir).forEach((file) => {
        if (relative) {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist.push(path.join(dir, file));
            }
        } else {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist.push(path.join(file));
            }
        }
    });
    return filelist;
};

// write index.html
const writeFile = (folders, hostname) => {
    const html = compiledTemplate({
        username: os.userInfo().username,
        folders,
        hostname
    });
    fs.writeFile('index.html', html, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}

// copy index.html to dir
const copyFile = (dir, file = 'index.html') => {
    fs.createReadStream(file).pipe(fs.createWriteStream(path.join(dir, file)));
}

const args = process.argv.slice(2);
const dir = args[0] || __dirname;
const hostname = args[1] || 'localhost:8080';
const relative = args[2] || false;
const folders = directoryList(dir, relative);
writeFile(folders, hostname);
copyFile(dir);