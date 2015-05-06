/**
 * Racket
 * @returns {{setX: Function, setY: Function, getX: Function, getY: Function}}
 */
module.exports = function() {
    var _x = 0,
        _y = 0,
        _el;
    return {
        setX: function(x){
            _x = x;
        },
        setY: function(y){
            _y = y;
        },
        getX: function(){
            return _x;
        },
        getY: function(){
            return _y;
        },
        setEl: function(el){
          _el = el;
        },
        show:function(){
          _el.show();
        },
        stringify: function(){
            var that = this;
            return JSON.stringify({
                x:that.getX(),
                y:that.getY()
            });
        }
    };
}