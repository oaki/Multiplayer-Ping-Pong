/**
 * ClientPlayer
 * @param $usernameInput
 * @returns {{init: Function, setName: Function, getName: Function, setLoginCallback: Function}}
 * @constructor
 */

function ClientPlayer(dom){

    var attributes = {
        'name':'',
        'id': null,
        'inputEl': dom.find('.usernameInput'),
        'signedInEl': dom.find('#signedInAs'),
        'isTurn': false,
        'loginCallback': function(){}
    };

    return {
        setIsTurn: function(isTurn) {
            attributes.isTurn = isTurn;
        },
        getIsTurn: function() {
            return attributes.isTurn;
        },
        init: function(){
            var that = this;
            attributes.inputEl.keydown(function (event) {
                // When the client hits ENTER on their keyboard
                if (event.which === 13) {
                    that.setName($(this).val().trim());
                    attributes.loginCallback();
                }
            });
        },
        setName: function(name){
            attributes.name = name;
            attributes.signedInEl.text(name);
        },
        setId: function(id){
            attributes.id = id;
        },
        getId: function(){
            return attributes.id;
        },
        getName: function(){
            return attributes.name;
        },
        setLoginCallback:function(callback){
            attributes.loginCallback = callback;
        }
    }
}
