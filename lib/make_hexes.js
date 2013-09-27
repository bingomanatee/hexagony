var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');
var Hex = require('./Hex');

/* ------------ CLOSURE --------------- */

/** ********************
 * Purpose: to generate a starting hex grid for a map.
 * The hexes are flat on the top/bottom.
 * The maps are (relatively) square;
 *
 * @param map
 *          - hex_size: distance from side to side of the hexagon. also, distance between two adgacent hexagons.
 *          - map_size: (minimum) width and height of the map.
 *
 * @returns {Array}
 *  a 2D array of hexes, column/row.
 */
function generate_hexes(map) {

    var hex_radius = map.hex_size / 2; // distance from center to flat side
    var hex_side = 2 * hex_radius / Math.sqrt(3); // size of side of hex;
    var hex_side_radius = hex_radius / Math.sqrt(3); // half the side of a hex;
    var hex_long_radius = Math.sqrt(hex_side * hex_side + hex_side_radius * hex_side_radius);

    var hex_long_diameter = 2 * hex_long_radius;
    var hex_diameter = 2 * hex_radius;

    function _eastern_column() {
        var east_distance = 0;
        var columns = 2;

        while (east_distance < map.map_size / 2) {
            columns += 2;
            east_distance += hex_long_diameter + hex_side;
        }

        return columns;
    }

    function _north_row() {
        var rows = 1;
        var north_distance = 0;

        while (north_distance < map.map_size / 2) {
            north_distance += hex_diameter;
            ++rows;
        }
        return rows;
    }

    var eastern_column = _eastern_column();
    var western_column = -1 * eastern_column;

    var north_row = _north_row();
    var south_row = -1 * north_row;

    var hexes = [];

    console.log('columns: e %s, w %s', eastern_column, western_column);
    console.log('rows: n %s, s %s', north_row, south_row);

    _.range(western_column, eastern_column + 1).forEach(function (column) {
        var column_hexes = [];
        _.range(south_row, north_row + 1).forEach(function (row) {
            console.log('column: %s, row: %s', column, row);
            column_hexes.push(new Hex(map, row - south_row, column - western_column));
        });
        hexes.push(column_hexes);
    });

    return hexes;
}

/* -------------- EXPORT --------------- */

module.exports = generate_hexes;