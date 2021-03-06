﻿

//-- Exports----------------------------------------------------------------


/**
 * A compare method that first sorts by order and then by the key used to find the instance.
 * @param   object    a   Required. Item 1.
 * @param   object    b   Required. Item 2.
 **/
exports.compare = function (a, b) {
    if (a.order < b.order || b.order === undefined) {
        return -1;
    }
    else if (a.order > b.order || a.order === undefined) {
        return 1;
    }
    
    if (a.sortKey.toLocaleLowerCase() < b.sortKey.toLocaleLowerCase()) {
        return -1;
    }
    else if (a.sortKey.toLocaleLowerCase() > b.sortKey.toLocaleLowerCase()) {
        return 1;
    }
    
    return 0;
};

/**
 * Gets the count of the occurrences of a string within a string.
 * @param   string    string            Required. The full string to search.
 * @param   string    subString         Required. The char sequence you are looking for in the full string.
 * @param   string    allowOverlapping  Optional. Will make the search run char by char for matches.
 **/
exports.occurrences = function (string, subString, allowOverlapping) {
    string += ""; subString += "";
    if (subString.length <= 0) return string.length + 1;
    
    var n = 0, pos = 0;
    var step = (allowOverlapping)?(1):(subString.length);
    
    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) { n++; pos += step; } else break;
    }
    return (n);
};