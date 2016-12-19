'use strict';

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
    resetGame();
    addCounter();
    simonMove();
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
    console.log('New Level!');
    $('#gameText').text('Simon\'s Turn');
    addCounter();
    // flashAll(0);
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

// ----- flash all tiles (aesthetic purposes only)
// function flashAll(index) {
//     if(game.tiles.length > index) {
//         var tile = game.tiles[index];
//         setTimeout(function() {
//             flashTile(tile);
//             flashAll(++index);
//         }, 50);
//     }
// }

function simonMove(){
    console.log('Simon\'s Move');
    game.simon.push(game.tiles[(Math.floor(Math.random()*4))]);
    showSimon();
    console.log(game.simon);
    playerMove();

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

    resetPlayer();
}

function playerPush(id){
    var tile = "#"+id;
    console.log(tile);
    game.player.push(tile);
    flashTile(tile);
    setTimeout(function() {
        playSound(tile);
    }, 100);
    playerMove(tile);
}

function playerMove(tile){
    ($('#gameText').html('Your Move'));
    console.log('Player\'s Move');
    if (game.player[game.player.length - 1] !== game.simon[game.player.length -1]){
        gameOver();
        resetGame();
    } else {
        console.log('Success');
        var compare = game.player.length === game.simon.length;
        if (compare){
            $('#gameText').text('Correct! Next Level!');
            newLevel();
        }
    }
}

function gameOver(){
    game.sound.end.play();
    $('#startBtn').text('RESTART');
    alert('GAME OVER! Please try again');
}

$(document).ready(function(){
    $('#startBtn').click(function(){
        $('#startBtn').text('START');
        game.sound.start.play();
        console.log('NEW GAME BEGAN!');
        newGame();
    });
});