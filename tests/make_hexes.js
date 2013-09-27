var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');
var tap = require('tap');

var hexagony = require('./../index');

tap.test('hexagony', {timeout: 1000 * 10, skip: false }, function (suite) {

    suite.test('make_hexes', {timeout: 1000 * 10, skip: false }, function (mh_test) {

        var map = {hex_size: 10, map_size: 30};

        var hexes = hexagony.make_hexes(map);

        console.log('hexes: %s', util.inspect(hexes));

        mh_test.end();
    });


    suite.test('none', {timeout: 1000 * 10, skip: false }, function (test) {

        test.end();
    });

    suite.end();

});