const less = require('less');
const lessTest = require('less/test/less-test');
const lessTester = lessTest();
const plugin = require('../');
const stylize = less.lesscHelper.stylize;

console.log("\n" + stylize("LESS - resolve blocks", 'underline') + "\n");

const testOptions = {
    relativeUrls: true,
    plugins: [new plugin()]
};

lessTester.runTestSet(testOptions, 'resolve-blocks/b-text/');
