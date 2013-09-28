var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');
var Canvas = require('canvas');

/* ------------ CLOSURE --------------- */

var DRAW_PARAMS_DEFAULTS = {
    margin: 0,

    circle: false,

    draw_hex: {
        stroke: {
            width: 1,
            color: 'black'
        },
        fill: 'white'
    }
};

/** ********************
 * Purpose: to draw hexagons
 *
 * @param hexes [[Hexes]]
 * @param draw_params {object}
 * @return canvas
 */
function draw(hexes, draw_params) {

    draw_params = draw_params || DRAW_PARAMS_DEFAULTS;

    var margin = draw_params.margin;

    hexes = _.flatten(hexes);

    var p = hexes[0].points[0];

    var min_x = p.x(), max_x = p.x(), min_y = p.y(), max_y = p.y();

    hexes.forEach(function (hex) {
        hex.points.forEach(function (point) {
            min_x = Math.min(point.x(), min_x);
            max_x = Math.max(point.x(), max_x);
            min_y = Math.min(point.y(), min_y);
            max_y = Math.max(point.y(), max_y);
        });
    });

    var x_offset = margin - min_x;
    var y_offset = margin - min_y;

    var width = Math.ceil((2 * margin) + (max_x - min_x));
    var height = Math.ceil((2 * margin) + (max_y - min_y));

    console.log('width: %s, height: %s', width, height);

    var canvas = new Canvas(width, height);
    var ctx = canvas.getContext('2d');

    ctx.lineWidth = 1;
    hexes.forEach(function (hex) {

        if (draw_params.hex) {

            if (draw_params.hex.fill) {
                ctx.fillStyle = draw_params.hex.fill;
                ctx.beginPath();
                var x = hex.points[5].x() + x_offset;
                var y = hex.points[5].y() + y_offset;

                ctx.moveTo(x, y);
                hex.points.forEach(function (point) {
                    var x = point.x() + x_offset;
                    var y = point.y() + y_offset;
                    ctx.lineTo(x, y);
                });
                ctx.closePath();
                ctx.fill();
            }

        }

        if (draw_params.circle) {
            if (draw_params.circle.fill) {
                ctx.fillStyle = draw_params.circle.fill;
                ctx.beginPath();
                ctx.arc(hex.x() + x_offset, hex.y() + y_offset, hex.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            if (draw_params.circle.stroke) {
                ctx.strokeStyle = draw_params.circle.stroke.color;
                ctx.lineWidth = draw_params.circle.stroke.width;
                ctx.beginPath();
                ctx.arc(hex.x() + x_offset, hex.y() + y_offset, hex.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();
            }
        }

        if (draw_params.hex && draw_params.hex.stroke) {


            ctx.strokeStyle = draw_params.hex.stroke.color;
            ctx.lineWidth = draw_params.hex.stroke.width;
            ctx.beginPath();
            var x = hex.points[5].x() + x_offset;
            var y = hex.points[5].y() + y_offset;

            ctx.moveTo(x, y);
            hex.points.forEach(function (point) {
                var x = point.x() + x_offset;
                var y = point.y() + y_offset;
                ctx.lineTo(x, y);
            });
            ctx.closePath();
            ctx.stroke();

        }

    });

    return canvas;
}

/* -------------- EXPORT --------------- */

module.exports = draw;