#!/usr/bin/env node


//-- Versioning & License Info----------------------------------------------

//Current Version: 0.1.0

/*
*Check out the site here: https://github.com/bstaley/jsformat
*
*   Copyright 2014 Brandon R Staley
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*
*Developed by: Brandon R Staley(bstaley0@gmail.com)
*Date header added: 2013-08-03 10:07am
*Purpose: As a CLI for formatting javascript files, currently focused on sorting.
*Dependencies: javascript
*Tested on: npm 1.3.14 and node 0.10.22
*Usage: Point the CLI to any path of a file or directory and then tell it how you want to sort the javascript file.
*Contributers:
*/


//-- TODO-------------------------------------------------------------------


//--* For dir transformations look for file type.
//--* Accept an output directory for transformed files.
//--* Have the option to overwrite files.


//-- Requires---------------------------------------------------------------


var dialog = require('../lib/dialog.js'),
    processor = require('../lib/processor.js');


//-- Variables--------------------------------------------------------------


//Holds the switch statements and paths that are user entered.
var userArguments = /*['-path', 'C:\\Users\\bstaley\\Documents\\nodeProjects\\ScriptFormatter\\testFiles\\IndexJS.js', '-sortdef', '["var","$(document)","$(\'.","$(\\".","$(\'#","$(\\"#","$(","function"]'] //*/process.argv.slice(2);
//Will be active if the transformation is done on one file.
var path = '';
//Used if you point to a directory, this will use recurrsion to find all files.
var dir = '';


//-- Local Logic-----------------------------------------------------------


//parse user arguments
for (var i = 0; i < userArguments.length; i++) {
    switch (userArguments[i]) {
        case '-path':
            //get the next piece of info if formatted correctly
            path = argsExpectDetail(userArguments[i + 1]);
            i++;
            break;
        case '-dir':
            //get the next piece of info if formatted correctly
            dir = argsExpectDetail(userArguments[i + 1]);
            i++;
            break;
        case '-sortdef':
            //get the next piece of info if formatted correctly
            sortDef = JSON.parse(argsExpectDetail(userArguments[i + 1]));
            processor.setSortCriteria(sortDef);
            i++;
            break;
        default:
            console.log('are you lost?');
    }
}

dialog.logSomething('User Args:', userArguments);

//You must supply a path or a directory
if (!path && !dir) { console.log('Failure parsing args'); return; }

if(path){
    processor.processFile(path);
}
else if(dir){
    processor.processDirectory(dir);
}

if (!processor.getSortCriteriaLength()) {
    console.log('please enter, in order, your sort criteria.');
    dialog.ask('1', /.*/, processor.pushSortCriteria, processor.processTransformation);
}
else {
    processor.processTransformation();
}

/**
 * Used if the data coming from the CLI is expect to have data associated with it.
 * @param   string    argDetail     Required. The supposed detail.
 **/
function argsExpectDetail(argDetail) {
    if (argDetail) {
        if (argDetail.charAt(0) !== '-') {
            return argDetail;
        }
        else { console.log("failed at firstChar:" + argDetail.charAt(0) + ";"); return undefined; }
    }
    else { console.log('failed at arg:' + argDetail + ";"); return undefined; }
}
