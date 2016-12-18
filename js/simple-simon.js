'use strict';

var counter = 0;
var compArray = [];
// var interval;
var level = 0;
var tiles = $('.tile');
var active = true;
// var mode = normal;


// ----- RANDOM NUMBER BETWEEN 0 - 3
function randomNumber() {
    return Math.floor((Math.random() * 4));
}

// ----- RANDOM TILE SELECTION
function randomTile() {
    return tiles[randomNumber()];
}

// ----- FLASH SELECTED TILE
function flashTile(tile) {
    $("#" + tile).addClass("active");
    setTimeout(function() {
        $("#" + tile).removeClass("active");
    }, 250);
}

// ----- FLASH ALL TILES (aesthetic purposes only)
function flashAll(index) {
    if(tiles.length > index) {
        var tile = tiles[index];
        setTimeout(function() {
            flashTile($(tile).attr('id'));
            flashAll(++index);
        }, 50);
    }
}

// ----- SIMON GAME TEXT
function simonText(){
        $('#gameText').text('Watch for Simon\'s Selection!');
}

// ----- USER GAME TEXT
function userText() {
        $('#gameText').text('Your Turn! Repeat Simon\'s Sequence!');
}

//

// ----- START GAME
function startGame() {
    compArray = [];
    level = 0;
    flashAll(0);
    $('#levelCnt').text(" " + ++level);
}

// ----- COMP ARRAY PLAY-BACK
function playBack(array) {
    var i = 0;
    var interval = setInterval(function(){
        var tile = array[i];
        flashTile(tile);
        i++;
        if (i >= array.length){
            clearInterval(interval);
        }
    }, 1000)
}

// ----- COMPUTER SELECTION / BUILD ONTO ARRAY
function compBuild() {
    // deactivateBoard();
    simonText();
    var tile = randomTile();
    compArray.push($(tile).attr('id'));
    playBack(compArray);
    userTurn();
}

// ----- USER TURN
function userTurn() {
    activateBoard();
    userText();
}

$('.tile').click(function () {
    var userInput = $(this).attr('id');
    flashTile('' + userInput+ '');
    if (userInput == compArray[counter]) {
        console.log(counter);
        console.log('match');
        counter += 1;
        console.log(compArray.length);
        if (counter == compArray.length) {
            console.log('Full Sequence Match!');
            counter = 0;
                newLevel();
        }
    } else {
        endGame();
        console.log('Something Went Wrong');
    }
});

// ----- NEW LEVEL
function newLevel() {
    ($('#gameText').text('Correct! New Level!'));
    ($('#levelCnt').text(" " + ++level));
    flashAll(0);
    compBuild();
}


// ----- ACTIVATE BOARD FOR USER TURN
//     function activateBoard() {
//         active = true;
//         $('.tile').on('click');
//         console.log('Board is now Activated')
//     }


// ----- DEACTIVATE BOARD FOR COMPUTER TURN
//     function deactivateBoard() {
//         active = false;
//         $('.tile').off('click');
//         console.log('Board not-active');
//     }
//

// ----- GAME OVER, GO HOME
function endGame() {
    alert('WRONG!');
} // end of endGame();





$(document).ready(function () {

    $('#startBtn').click(function () {
        startGame();

        // deactivateBoard();

        compBuild();

    });


}); // --- end of DOCUMENT.READY