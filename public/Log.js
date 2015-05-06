
function Log(){
    return {
        add: function(msg){
            Messenger().post(msg);
            //attributes.el.append($('<li>').text(msg));
        }
    }
}
