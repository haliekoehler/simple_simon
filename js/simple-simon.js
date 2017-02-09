'use strict';

$(document).ready(function(){

    $('#startBtn').click(function(){

        $('#startBtn').text('START');

        game.sound.start.play();

        console.log('NEW GAME BEGAN!');
        newGame();

    });

    var game = {
        counter: 0,
        tiles: ['#red', '#blue', '#green', '#yellow'],
        simon: [],
        player: [],
        sound:{
            red: new Audio('audio/SFX_1.mp3'),
            blue: new Audio('audio/SFX_2.mp3'),
            green: new Audio('audio/SFX_3.mp3'),
            yellow: new Audio('audio/SFX_4.mp3'),
            start: new Audio('audio/PowerUp1.mp3'),
            end: new Audio('audio/PowerDown2.mp3'),
        }
    };




    function newGame(){
        resetGame(); // mainly for "restarts"
        addCounter(); // increment level counter
        simonMove();  // begin simon's first move
    }

    function resetGame(){
        game.counter = 0;
        game.simon = [];
        game.player = [];
    }

    function resetPlayer(){
        game.player = [];
    }

    function addCounter(){
        ($('#levelCnt').text(" " + ++game.counter));
    }

    function newLevel(){
        addCounter();
        simonMove();
    }

    function playSound(tile){
        switch(tile) {
            case'#red':
                game.sound.red.play();
                break;
            case '#blue':
                game.sound.blue.play();
                break;
            case '#green':
                game.sound.green.play();
                break;
            case '#yellow':
                game.sound.yellow.play();
                break;
        }
    }

    function flashTile(tile){
        $('' + tile + '').addClass('active');
        setTimeout(function(){
            $('' + tile + '').removeClass('active');
        }, 250);
    }

    function simonMove(){
        game.simon.push(game.tiles[(Math.floor(Math.random()*4))]); // get random # between 0 - 3 and push to simon []
        showSimon(); // show current sequence in simon []
        playerMove(); // begin player's turn
    }

    function showSimon(){
        var i = 0;
        var moves = setInterval(function(){
            flashTile(game.simon[i]);
            playSound(game.simon[i]);
            i++;

            if (i >= game.simon.length) {
                clearInterval(moves);
            }
        }, 700);

        resetPlayer(); // reset player [] for next round
    }

    function playerPush(id){
        var tile = "#"+id;
        game.player.push(tile); // push clicked tile to play []
        flashTile(tile);
        setTimeout(function() {
            playSound(tile);
        }, 100);
        playerMove(tile); // compare clicked tiles to simon []
    }

    function playerMove(tile){
        if (game.player[game.player.length - 1] !== game.simon[game.player.length -1]){
            tile.removeAttribute("onclick");
            gameOver();
        } else {
            var compare = game.player.length === game.simon.length;
            if (compare){
                newLevel();
            }
        }
    }

    function gameOver(){
        resetGame();
        game.sound.end.play();
        alert('GAME OVER! Please try again');
        $('#startBtn').text('RESTART');
    }
});