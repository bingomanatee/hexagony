var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');
var tap = require('tap');

var hexagony = require('./../index');

function _json(hexes) {
    return hexes.map(function (rows) {
        return rows.map(function (hex) {
            return hex.toJSON();
        })
    })
}

tap.test('hexagony', {timeout: 1000 * 10, skip: false }, function (suite) {

    var map = {hex_size: 100, map_size: 300};

    var hexes = hexagony.make_hexes(map);

    suite.test('make_hexes', {timeout: 1000 * 10, skip: false }, function (mh_test) {

        console.log('hexes: %s', util.inspect(_json(hexes), true, 5));

        mh_test.end();
    });


    suite.test('draw_hexes', {timeout: 1000 * 10, skip: false }, function (test) {

        var canvas = hexagony.draw_hexes(hexes, {margin: 20,
            hex: {
                fill: 'yellow',
                stroke: {
                    color: 'blue',
                    width: 4
                }
            },

            circle: {
                fill: 'red'
            }});

        var out = fs.createWriteStream(__dirname + '/hex.png')
            , stream = canvas.pngStream();

        stream.on('data', function (chunk) {
            out.write(chunk);
        });

        stream.on('end', function () {
            setTimeout(function () {

                test.end();
            }, 500);
        });

        stream.on('error', function (err) {
            console.log(err);
            test.end();
        });
    });


    suite.test('draw_hexes 2', {timeout: 1000 * 10, skip: false }, function (test) {

        var canvas = hexagony.draw_hexes(hexes, {margin: 20,
            hex: {
                fill: 'rgb(225,225,225)',
                stroke: {
                    color: 'black',
                    width: 2
                }
            },

            circle: {
                fill: 'white'
            }});

        var out = fs.createWriteStream(__dirname + '/hex2.png')
            , stream = canvas.pngStream();

        stream.on('data', function (chunk) {
            out.write(chunk);
        });

        stream.on('end', function () {
            setTimeout(function () {
                test.end();
            }, 500);
        });

        stream.on('error', function (err) {
            console.log(err);
            test.end();
        });
    });

    suite.end();

});