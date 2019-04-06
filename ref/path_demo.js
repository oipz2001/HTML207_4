const path = require('path');

//base file name 
console.log(__filename);
console.log(path.basename(__filename));

// directorry name

console.log(__dirname);
console.log(path.dirname(__filename));
// file extension
console.log(path.extname(__filename));
// path object
console.log(path.parse(__filename));
console.log(path.parse(__filename).base);

//create path './test/hello.html'

console.log(path.join(__dirname,'test','hello.html'));