'use strict';

var counter = 0;
var compArray = [];
// var interval;
var level = 0;
var tiles = $('.tile');
var active = true;
// var mode = normal;


// ----- START GAME
function startGame() {
    compArray = [];
    // userArray = [];
    level = 0;
    flashAll(0);
    $('#levelCnt').text(" " + ++level);
    // change game text
    $('#gameText').text('Watch for Simon\'s Selection!');
} // end of startGame()


// ----- RANDOM NUMBER BETWEEN 0 - 3
function randomNumber() {
    return Math.floor((Math.random() * 4));
} // end of randomNumber()


// ----- FLASH TILE
function flashTile(tile) {
    $("#" + tile).addClass("active");
    setTimeout(function() {
        $("#" + tile).removeClass("active");
    }, 250);
} // end of flashTile


// ----- FLASH ALL TILES
function flashAll(index) {
    if(tiles.length > index) {
        var tile = tiles[index];
        setTimeout(function() {
            flashTile($(tile).attr('id'));
            flashAll(++index);
        }, 50);
    }
} // end of flashAll()


// ----- RANDOM TILE SELECTION
function randomTile() {
    return tiles[randomNumber()];
} // end of randomTile()


// ----- COMP. PLAY-BACK
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
} // end of playBack()


// ----- COMPUTER SELECTION / BUILD
function compBuild() {
    var tile = randomTile();
    compArray.push($(tile).attr('id'));
    // flashTile(tile);
    // console.log(compArray);
    playBack(compArray);
    userTurn();
} // end of compBuild()

// ----- USER TURN
function userTurn() {
    $('#gameText').text('Your Turn! Repeat the sequence for Simon!');
    // activateBoard();

} // end of userTurn()

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
            setTimeout(function () {
                newLevel();
            }, 500);
        }
    } else {
        endGame();
        console.log('Something Went Wrong');
    }
});

// ----- COMPARE TO COMPUTER ARRAY
//     function compare(object){
//
//     } // end of compare()


// ----- NEW LEVEL
function newLevel() {
    $("#gameText").text('Correct! Next Level!');
    ($('#levelCnt').text(" " + ++level));
    flashAll(0);
    compBuild();
} // end of newLevel()


// ----- ACTIVATE BOARD FOR USER TURN
//     function activateBoard() {
//         active = true;
//         $('.tile').on('click');
//         console.log('Board is now Activated')
//     } // end of activateBoard()


// ----- DEACTIVATE BOARD FOR COMPUTER TURN
//     function deactivateBoard() {
//         active = false;
//         $('.tile').off('click');
//         console.log('Board not-active');
//     } // end of deactivateBoard


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