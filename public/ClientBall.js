/**
 * ClientBall
 * @param $el
 * @returns {{init: Function, setAxis: Function, redraw: Function}}
 * @constructor
 */

function ClientBall($el) {

    var attributes = {
        el: $el,
        x: 100,
        y: 100,
        z: 0,// :)
        vx: -1.5 + Math.random()*3,
        vy: 5 * Math.random()*1.5,
        speed: 10,
        width: 20,
        height: 20
    };

    return {
        init: function () {

        },
        getAxis: function(){
            return {
                x:attributes.x,
                y:attributes.y
            };
        },
        getVectors: function(){
            return {
                vx:attributes.vx,
                vy:attributes.vy
            };
        },
        setAxis: function (x, y) {
            attributes.x = x;
            attributes.y = y;
        },
        setVectors: function (vx, vy) {
            attributes.vx = vx;
            attributes.vy = vy;
        },
        calculateNewAxis: function(){
            attributes.x += attributes.vx;
            attributes.y += attributes.vy;
        },
        redraw: function () {
            attributes.el.css('top', attributes.y);
            attributes.el.css('left', attributes.x);
        },
        create: function () {
            attributes.el.css({
                'width': attributes.width,
                'height': attributes.height
            });
            this.redraw();

        }
    }
}
