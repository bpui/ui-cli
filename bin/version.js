'use strict';

var path = require('path');
var febs = require('febs');
var pkg = require('../package.json');


function done(args, workDir) {
  console.log("");
  console.log(pkg.version);
  console.log("");
}

module.exports = {
  done: done,
};