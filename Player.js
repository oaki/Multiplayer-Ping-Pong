/**
 * Player
 * @returns {{setName: Function, getName: Function}}
 */

module.exports = function() {
    var _name = '',
        _racket = '',
        _id = '';
        _team = 0;
    return {
        setName: function(name){
            _name = name;
        },
        getName: function(){
            return _name;
        },
        setId: function(id){
            _id = id;
        },
        getId: function(){
            return _id;
        },
        setRacket: function (Racket) {
            _racket = Racket;
        },
        getRacket: function () {
            return _racket;
        },
        setTeam: function(team){
            _team = team;
        },
        getTeam: function(){
            return _team;
        },

        stringify: function(){
            var that = this;
            return JSON.stringify({
                name:that.getName(),
                id: that.getId(),
                racket: that.getRacket().stringify()
            });
        }
    };
}