'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2020-11-18 16:37
* Desc: 
*/

var readline = require('readline-sync');

function question(qus, conditionCB) {
  let answer = readline.question(qus);
  if (!answer || answer.length == 0) {
    return question(qus, conditionCB);
  }
  else if (conditionCB && !conditionCB(answer)) {
    return question(qus, conditionCB);
  }
  else {
    return answer;
  }
}
exports.question = question;