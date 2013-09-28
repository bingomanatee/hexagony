var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');
var num = require('number-extended');

var SIN_30 = Math.sin(Math.PI / 6);
var COS_30 = Math.cos(Math.PI / 6);

// the orthoganal offsets of a hex with a radius to the flat side of 1.

var UNIT_X = 1 / COS_30;
var UNIT_Y = 2 * COS_30;

function Hex_Point(hex, angle, index) {
    this.hex = hex;
    this.angle = angle;
    this.index = index;
}

Hex_Point.prototype = {

    unit_x: function () {
        return this.hex.unit_x() + Math.cos(this.angle);
    },

    unit_y: function () {
        return this.hex.unit_y() + Math.sin(this.angle);
    },

    x: function () {
        return this.hex.x() + (this.hex.long_radius() * Math.cos(this.angle));
    },

    y: function () {
        return this.hex.y() + (this.hex.long_radius() * Math.sin(this.angle));
    },

    toJSON: function () {
        return {
            index: this.index,
            angle: Math.round(this.angle * 180 / Math.PI),
            unit_x: num.round(this.hex.unit_x() + this.unit_x(), 2),
            unit_y: num.round(this.hex.unit_y() + this.unit_y(), 2)
        };
    }
};

/**
 *
 * @param map
 * @param row
 * @param column
 * @constructor
 */
function Hex(map, row, column) {
    this.map = map;
    this.row = row;
    this.column = column;
    this.radius = map.hex_size / 2;
    this.diameter = map.hex_size;

    this.make_points();
}

_.extend(Hex.prototype, {

    short_radius: function () {
        return this.radius;
    },

    long_radius: function () {
        return this.short_radius() / COS_30;
    },

    unit_x: function () {
        return this.column * UNIT_X;
    },

    unit_y: function () {
        return this.row * UNIT_Y - this.column % 2;
    },

    x: function () {
        return 1.5 * this.long_radius() * this.column;
    },

    row_place : function(){
        return this.row + (this.column % 2) / 2;
    },

    y: function () {
        return this.short_radius() * this.row_place() * 2;
    },

    toJSON: function () {
        return {
            row: this.row,
            column: this.column,
            unit_center: {
                x: num.round(this.unit_x(), 2),
                y: num.round(this.unit_y(), 2)
            },
            points: this.points.map(function (p) {
                return p.toJSON();
            })
        };
    },

    make_points: function () {
        this.points = _.range(0, Math.PI * 2, Math.PI / 3).map(function (angle, i) {
            return new Hex_Point(this, angle, i);
        }, this);
    }

});

module.exports = Hex;