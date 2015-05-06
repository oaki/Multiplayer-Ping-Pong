/**
 * PlayersCollection
 * @returns {{getCount: Function, addPlayer: Function}}
 */
module.exports = function() {
    var _players = {};
    var _countPlayers = 0;
    var _internalIndex = 0;

    return {
        getCount: function(){
            return _countPlayers;
        },
        increaseCount: function(){
            _countPlayers++;
        },
        decreaseCount: function(){
            _countPlayers--;
        },
        addPlayer: function(player){
            this.increaseCount();
            _internalIndex++;
            player.setId( _internalIndex );
            player.setTeam(_internalIndex % 2);
            _players[player.getId()] = player;
        },
        getPlayerById: function(id){
            return _players[id];
        },
        removeById: function(id){
            if(this.getPlayerById(id)){
                delete _players[id];
                this.decreaseCount();
            }
        },
        getWhoIsTurn: function(userId){
            var nextId = 1;
            if(this.getPlayerById(userId + 1)){
                nextId++;
            }
            return nextId;
        },
        stringify: function(){
            var strUser = {};
            for (var key in _players) {
                var obj = _players[key];
                for (var prop in obj) {
                    // important check that this is objects own property
                    // not from prototype prop inherited
                    if(obj.hasOwnProperty(prop)){
                        strUser[prop] = obj.stringify()
                    }
                }
            }

            return JSON.stringify({
                '_players': strUser,
                '_countPlayers': _countPlayers
            })
        }
    };
}