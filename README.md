#jsformat CLI

###Summary

A node CLI to do bulk formatting of JavaScript files. Original purpose is to give a location, dir or path, for script files and then give a list of things to sort by.

###How to install it

`npm install git://github.com/bstaley/jsformat.git `
######or
`npm install jsformat`

###How to run
1. change directory to a location you would like the generated file to be stored
2. type `jsformat` with either a `-dir <directory>` or a `-path <file>` switch.
3. the interface will ask you what to sort by.
4. use one sort criteria per line, ex. to sort all variables to the top use 'var'.
5. submitting a blank line will start the processing.

#####note: when using directory it will recursively search through all folders.

###Acceptable commands
* `-dir <directory>`
* `-path <path>`
* `-sortdef <json formatted array of sort criteria>`


###Known Issues
1. Nothing has been implimented to support anything other than JavaScript.
2. Your JavaScript file has must be formatted in a traditional way before hand.

###ToDos
1. For dir transformations look for file type, if specified.
2. Accept an output directory for transformed files.
3. Have the option to overwrite files in place.

###Real life example output
######This is an example used with jQuery to maintain a specific format across all files.
```node
>jsformat -path ./test.js

User Args:
[ '-path', './test.js' ]
File Names: [ './test.js' ]
please enter, in order, your sort criteria.
1: var
2: $(document)
3: $('.
4: $(".
5: $('#
6: $("#
7: $(
8: function
9:

The file was saved to .\testFiles
```
