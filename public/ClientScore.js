
function ClientScore(el){

    var attributes = {
        '$el':el,
        'team0': 0,
        'team1': 0
    };

    return {
        increaseScoreTeam0: function(){
            attributes.team0++;
            this.updateScore()
        },
        increaseScoreTeam1: function(){
            attributes.team1++;
            this.updateScore();
        },
        updateScore: function(){
            attributes.$el.find('team0').text( attributes.team0 );
            attributes.$el.find('team1').text( attributes.team1 );
        }
    }
}
