"use strict";

var path = require("path");
var fs = require('fs');
var febs = require("febs");
var chalk = require('chalk');

function pkgComponents(workDir) {
  var destFile = path.join(workDir, "node_modules", "bpui.js.bundle", "package.json");
  if (!febs.file.fileIsExist(destFile)) {
    console.error('file is not existed: ' + destFile);
    process.exit(1);
  }

  var pk = require(destFile);
  var dependencies = pk.dependencies;

  var components = [];
  
  for (var keyDepend in dependencies) {
    if (keyDepend.indexOf('@bpui/') >= 0) {
      components.push(keyDepend);
    }
  }

  return components;
}

function done(args, workDir) {

  var updateComponentName = null;
  if (args.length > 1) {
    updateComponentName = args[1];
  }

  workDir = workDir || process.cwd();

  var destDir = path.join(workDir, "src", "bpui", "style");
  if (!febs.file.dirIsExist(destDir)) {
    throw new Error('directory is not existed: ' + destDir);
    process.exit(1);
  }

  console.log('Will copy style to :\'' + destDir + '\'');
  var components;
  if (updateComponentName) {
    components = [updateComponentName];
  }
  else {
    let components2 = pkgComponents(workDir);
    components = [];
    for (var i = 0; i < components2.length; i++) {
      components.push(febs.string.replace(components2[i], '@bpui/', ''));
    }
  }

  console.log('copy component: ' + chalk.blue(components.toString()));
  
  var pros = [];
  var vers = [];
  for (var component of components) {
    var p = path.join(
      workDir,
      "node_modules",
      "bpui.js",
      "node_modules",
      "@bpui",
      component,
      "style"
    );
    if (!febs.file.dirIsExist(p)) {
      p = path.join(workDir, "node_modules", "@bpui", component, "style");
    }

    var comm_pkg = require(path.join(workDir, "node_modules", "@bpui", component, "package.json"));
    vers.push(comm_pkg.version);

    console.log(`  copy ${chalk.blue(component + '@' + comm_pkg.version)} style`);

    let dd = febs.file.dirExplorer(destDir, new RegExp('^' + component + '\\@.*'));
    dd = dd.dirs.length > 0 ? dd.dirs[0] : null;

    if (febs.file.dirIsExist(p)) {

      if (!dd) {
        febs.file.dirAssure(path.join(destDir, component + '@' + comm_pkg.version));
        dd = path.join(destDir, component + '@' + comm_pkg.version);
      }
      else {
        dd = path.join(destDir, dd);
        febs.file.dirRemoveRecursive(dd);
        febs.file.dirAssure(dd);
      }
      
      pros.push(febs.file.dirCopyAsync(p, dd)
        .then(() => {
          if (febs.file.fileIsExist(path.join(dd, "unpkg.scss"))) {
            febs.file.fileRemove(path.join(dd, "unpkg.scss"));
          }
          if (febs.file.fileIsExist(path.join(dd, "unpkg_class.scss"))) {
            febs.file.fileRemove(path.join(dd, "unpkg_class.scss"));
          }
        }));
    } // if.
  }

  Promise.all(pros)
    .then(() => {
      var fcontent = fs.readFileSync(path.join(destDir, "_index.scss"), { 'encoding': 'utf-8' });
      for (var i = 0; i < components.length; i++) {
        fcontent = fcontent.replace(
          new RegExp(`@import\\s+(\\'||\\")\\./${components[i]}@(\\d|\\.)+(\\'||\\")`),
          '@import \'./' + components[i] + '@' + vers[i] + '\'');
      }
      fs.writeFileSync(path.join(destDir, "_index.scss"), fcontent, { flag: 'w', encoding: 'utf8' });

      console.log("");
      console.log("");
      console.log("**************************************************************");
      console.log("> Success: Copy all components styles to `src/bpui/style`     ");
      console.log(">    import 'src/bpui/style'");
      console.log("**************************************************************");
      console.log("");
      console.log(`> Use ${chalk.blue('git to diff code')}, and ${chalk.blue('change component directory name with right version')}.`);
      console.log("");
      console.log("");
    });
}

module.exports = {
  done: done
};
