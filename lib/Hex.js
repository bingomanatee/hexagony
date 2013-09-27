var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');

function Hex(map, row, column) {
    this.map = map;
    this.row = row;
    this.column = column;
}

_.extend(Hex.prototype, {


});

module.exports = Hex;