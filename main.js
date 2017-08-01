let prompt = require('prompt');

prompt.start();

const available = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let win = false;
let currentPlayer = 'No one';
let guesses = 0;
let playerOne = [];
let playerTwo = [];
let board = generateBoard();
function generateBoard () {
    return ('|' + available[0] +
          '|' + available[1] +
          '|' + available[2] + 
          '|\n' +
          '|' + available[3] +
          '|' + available[4] +
          '|' + available[5] +
          '|\n' +
          '|' + available[6] +
          '|' + available[7] +
          '|' + available[8] + '|');
}

let winConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]];

const spot = {
    properties: {
        guess: {
            type: 'integer',
            pattern: /^[-+]?[1-9]\d*$/,
            conform: function(guess) {
              if (available[guess - 1] === 'X' || available[guess - 1] === 'O') {
                  return false;
              } else {
                  return true;
              }
            },
            message: 'Guess must be a valid remaining spot; try again.',
            required: true
        }
    }
}

let question = function () {
   prompt.get(spot, function (err, result) {
    guesses += 1;

    if (guesses % 2 === 0) {
      currentPlayer = 'Player 2';
      available[result.guess - 1] = 'O';
      playerTwo.push(result.guess);
      
      if (playerTwo.length > 2) {
        checkForWin(playerTwo);
      }
    } else {
      currentPlayer = 'Player 1';
      playerOne.push(result.guess);
      
      if (playerOne.length > 2) {
        checkForWin(playerOne);
      }
      available[result.guess - 1] = 'X';
    }
    
    board = generateBoard();
    console.log(board);
    
    if (win === true) {
        console.log(currentPlayer + ' wins!');
        return;
    } else {
      if (guesses === 9) {
        console.log('No one wins.');
        return;
      } else {
        question();
      }
    }
  });
}

function checkForWin (player) {
    for (let i = 0; i < winConditions.length; i++) {
       let condition = winConditions[i];

       if (player.includes(condition[0]) && player.includes(condition[1]) && player.includes(condition[2])) {
          win = true;
          break;
       }
    }   
};

console.log('Welcome to Tic-Tac-Toe! Submit the corresponding number to claim your spot!');
console.log(board);
question();