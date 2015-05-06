function ClientRacket() {

    var attributes = {
        'width': 0,
        'height': 0,
        'el': '',
        'prevX': 0,
        'prevY': 0,
        'x': 0,
        'y': 0
    };

    return {
        setEl: function (el) {
            attributes.el = el;
            attributes.width = el.width();
            attributes.height = el.height();
        },
        getDimension: function() {
            return {
                'width': attributes.width,
                'height': attributes.height
            }
        },
        setAxis: function (x, y) {
            attributes.prevX = attributes.x;
            attributes.prevY = attributes.y;
            attributes.x = x;
            attributes.y = y;
        },
        getAxis: function () {
            return {
                'x': attributes.x,
                'y': attributes.y
            }
        },
        getVector: function () {
            return {
                vx: attributes.x - attributes.prevX,
                vy: attributes.y - attributes.prevY
            }
        }
    }
}
