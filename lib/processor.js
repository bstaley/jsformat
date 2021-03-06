﻿

//-- Requires---------------------------------------------------------------


var file = require('../lib/fileMisc.js'),
    goodies = require('../lib/goodies.js'),
    types = require('../lib/dataTypes.js');


//-- Variables--------------------------------------------------------------


//This is a collection of fileKeyCollections, this is used when transforming the raw data.
var newFileData = [];
//This is a fileKeyCollection representing the new sorted files.
var rebuiltFiles = types.createFileKeyCollection();
//This is the user entered data to sort on.
var sortCriteria = [];


//-- Exports----------------------------------------------------------------


/**
 * Uses the file script to get the data from a file for a given path.
 * @param   string    path   Required. A location of a file.
 **/
exports.processFile = function (path) {
    var fileStuff = file.readFile(path);
    if (fileStuff) { file.pushRawFileData(fileStuff); }
    console.log('File Names:', file.getFileNames());
};

/**
 * Returns nothing. Will process directories of files.
 * @param   string    dir   Required. A location of a directory.
 **/
exports.processDirectory = function (dir) {
    file.getFilesFromDir(dir);
    console.log('File Names:', file.getFileNames());
};

/**
 * Returns the count of the number of sorts applied. The function will push a new sort text into the collection.
 * @param   string    text   Required. Will be a user entered text.
 **/
exports.pushSortCriteria = function (text) {
    sortCriteria.push(text);
    return +(sortCriteria.length + 1);
};

/**
 * Set the array for sorting, this would come directly from the CLI
 * @param   array    sortArray   Required. Will replace the sortCriteria.
 **/
exports.setSortCriteria = function (sortArray) {
    sortCriteria = sortArray;
};

/**
 * Returns the length of the sort array so we know whether it has been set yet or not.
 **/
exports.getSortCriteriaLength = function () {
    return sortCriteria.length;
};

/**
 * This function parses the raw files and will create a new key for sort matching items. All other items are put into a global and not sorted.
 **/
exports.processTransformation = function () {
    var rawData = file.getRawFileData();
    for (var i = 0; i < rawData.length; i++) {
        var onCore = false;
        var key = '';
        var parCount = 0;
        var bracCount = 0;
        var splitData = rawData[i].split('\r\n');
        newFileData.push(types.createFileKeyCollection());
        
        for (var line = 0; line < splitData.length; line++) {
            var currentLine = splitData[line].trim() + '\r\n';
            
            if (!onCore) {
                for (var x = 0; x < sortCriteria.length; x++) {
                    if (currentLine.indexOf(sortCriteria[x]) === 0) {
                        key = newFileData[i].checkDuplicateKey(currentLine);
                        newFileData[i].fileKeys.push(types.createFileKey(key, currentLine, x));
                        onCore = true;
                        break;
                    }
                }
            }
            else {
                newFileData[i].appendParts(key, currentLine, i);
            }
            
            if (onCore) {
                bracCount += goodies.occurrences(currentLine, '{');
                bracCount -= goodies.occurrences(currentLine, '}');
                parCount += goodies.occurrences(currentLine, '(');
                parCount -= goodies.occurrences(currentLine, ')');
                if (!bracCount && !parCount) {
                    onCore = false;
                }
            }
            else {
                newFileData[i].appendParts('global', currentLine, i);
                bracCount += goodies.occurrences(currentLine, '{');
                bracCount -= goodies.occurrences(currentLine, '}');
                parCount += goodies.occurrences(currentLine, '(');
                parCount -= goodies.occurrences(currentLine, ')');
                if (bracCount || parCount) {
                    onCore = true;
                    key = 'global';
                }
            }
        }
    }
    rebuildFiles();
};


//-- Local Logic------------------------------------------------------------


/**
 * Takes all of the processed files reorders them, builds them and writes them out to the cwd as a .tmp file.
 **/
function rebuildFiles() {
    
    var currentId = -1;
    for (var i = 0; i < newFileData.length; i++) {
        var groups = newFileData[i].fileKeys.sort(goodies.compare);
        var wholeText = '';
        for (var x = 0; x < groups.length; x++) {
            wholeText += groups[x].filePart;
        }
        rebuiltFiles.fileKeys.push(types.createFileKey(file.getFileName(i), wholeText, undefined));
    }
    
    for (var i = 0; i < rebuiltFiles.fileKeys.length; i++) {
        //logSomething(rebuiltFiles.fileKeys[i].sortKey + ':', rebuiltFiles.fileKeys[i].filePart);
        file.writeFile(process.cwd() + '\\' + file.getFileName(i), rebuiltFiles.fileKeys[i].filePart);
    }

}