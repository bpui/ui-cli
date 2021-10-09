'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-11-10 18:55
* Desc: 
*/

var fs = require('fs');
var febs = require('febs');
var chalk = require('chalk');
var path = require('path');

exports.generator = function (workDir, projectName, regName) {
  console.log(chalk.green('Begin generator ui project'));
  
  let files = febs.file.dirExplorerFilesRecursive(path.join(__dirname, 'bpui'));
  console.log(files);

  febs.file.dirAssure(path.join(workDir, projectName));

  let destDir = path.join(workDir, projectName);
  let srcDir = path.join(__dirname, 'bpui');

  for (const i in files) {
    let file = files[i];
    if (path.basename(file) == '.DS_Store') {
      continue;
    }
    
    let data = fs.readFileSync(path.join(srcDir, file), { encoding: 'utf8' });
    data = data.toString();

    // replace.
    data = febs.string.replace(data, '${projectName}', regName);

    file = path.join(destDir, file);
    febs.file.dirAssure(path.dirname(file));
    fs.writeFileSync(file, data, {encoding:'utf8', flag:'w+'});
  } // for.

  console.log('Success generator project in: ' + chalk.green(path.join(workDir, projectName)));
  console.log(chalk.green('Finish generator ui project, see ') + chalk.bgMagenta('\'readme.md\''));
}