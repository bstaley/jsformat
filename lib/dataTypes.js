﻿

//-- Exports----------------------------------------------------------------

/**
 * Creates a new file key instance.
 * @param   string    sortKey   Optional. The matching key found when parsing a document.
 * @param   string    filePart  Optional. Ends up being the whole function for the sorted item.
 * @param   string    order     Optional. The order the item should fall in when reconstructed as a document.
 **/
exports.createFileKey = function (sortKey, filePart, order) {
    return new fileKey(sortKey, filePart, order);
};

/**
 * Creates a new file key collection instance.
 **/
exports.createFileKeyCollection = function () {
    return new fileKeyCollection();
};


//-- Variables--------------------------------------------------------------


/**
 * Creates a new file key instance.
 * @param   string    sortKey   Optional. The matching key found when parsing a document.
 * @param   string    filePart  Optional. Ends up being the whole function for the sorted item.
 * @param   string    order     Optional. The order the item should fall in when reconstructed as a document.
 **/
var fileKey = function (sortKey, filePart, order) {
    this.sortKey = sortKey;
    this.filePart = filePart;
    this.order = order;
};

/**
 * Creates a new file key collection instance.
 **/
var fileKeyCollection = function () {
    this.fileKeys = [];
    this.flatFileKeys = [];
    this.checkDuplicateKey = function (key) {
        var dupCount = 0;
        while (this.flatFileKeys.indexOf(key) !== -1) {
            if (dupCount === 0) {
                key += '//duplicate' + dupCount;
            }
            else {
                key = key.slice(0, -1) + dupCount;
            }
            dupCount++;
        }
        this.flatFileKeys.push(key);
        return key;
    };
    this.appendParts = function (key, part) {
        if (this.fileKeys.length) {
            var found = false;
            for (var i = 0; i < this.fileKeys.length; i++) {
                if (key === this.fileKeys[i].sortKey) {
                    this.fileKeys[i].filePart += part;
                    found = true;
                }
            }
            if (!found) {
                this.fileKeys.push(new fileKey(key, part, undefined));
            }
        }
        else {
            this.fileKeys = [];
            this.fileKeys.push(new fileKey(key, part, undefined));
        }
    };
};
