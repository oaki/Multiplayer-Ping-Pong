$(function () {

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            return window.setTimeout(callback, 1000 / 60);
        };
    })();

    // Initialize varibles
    var $window = $(window);

    var $loginPage = $('.login-page');
    var $gamePage = $('.game-page');

    var log = new Log($('.messages'));

    var score = new ClientScore( $('.score') );
    var ball = new ClientBall( $('#ball') );
    var racket = new ClientRacket();
    var user = new ClientPlayer($('.pages'));

    ball.setAxis(100,100);

    var clientPlayground = new ClientPlayground( $("#playground"));
    clientPlayground.init();

    var collision = new ClientCollision( clientPlayground, ball, racket, user);
    ball.create();

    user.setLoginCallback(function () {
        $loginPage.fadeOut();
        $gamePage.fadeIn({
            duration: 2000
        });
        $loginPage.off('click');
        socket.emit('add user', user.getName());
    });

    user.init();

    var connected = false;

    var socket = io();

    var $playground = $("#playground");
    $playground.mousemove(function (event) {

        var d = {
            id: user.getId(),
            x: event.pageX - $playground.offset().left,
            y: event.pageY - $playground.offset().top
        };
        racket.setAxis(event.pageX - $playground.offset().left,event.pageY - $playground.offset().top);
        drawRacket(d)
        socket.emit('move racket', d);
    });

    // Whenever the server emits 'login', log the login message
    socket.on('login', function (data) {
        connected = true;
        log.add("Joined: " + data.numUsers);
        log.add("Your name: " + data.username);
        user.setId(data.id);
        if(data.id == 1){
            user.setIsTurn(true);
        }
        racket.setEl($('div.racket' + data.id));

        function animloop() {
            init = requestAnimFrame(animloop);

            if(user.getIsTurn()){
                ball.redraw();
                ball.calculateNewAxis();
                var newAxis = ball.getAxis();

                socket.emit('ball position', newAxis);

                if(collision.collision()){
                    socket.emit('how played', {userId:  data.id});
                }
            }

        }

        animloop();
    });



    socket.on('who is turn', function (data) {
        //console.log(data);
        if(data.userId == user.getId()){
            user.setIsTurn( true );
        }
    })

    socket.on('ball position', function (data) {
        ball.setAxis(data.x, data.y);
        ball.redraw();
    })

    socket.on('show racket', function (data) {
        drawRacket(data);
    });
    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', function (data) {
        log.add(data.username + ' joined');
        log.add(data.username + ' is team ' + data.team);
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', function (data) {
        log.add(data.username + ' left');
    });

    function drawRacket(data) {
        $('div.racket' + data.id).css({left: data.x, top: data.y});
    }

    $('.logout').click(function () {
        socket.emit('disconnectUser', user);
        $gamePage.fadeOut();
        $loginPage.fadeIn();
    });

});
