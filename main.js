const { toBePartiallyChecked } = require('@testing-library/jest-dom/dist/matchers');

const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    //the field is hardcoded in
    constructor(field) {
        this._field = field;
    }

    //remember, this is a method of the constructor. 
    //Don't get it twisted with the hardcoded field!
    print() {
        console.log(this._field.join('\n'));
    }  
}

//initialise win/lose variables as false 
let win = false;
let lose = false;

//myField is an array object
const myField = [
    ['░', '░', '░', hole, '░'],
    [fieldCharacter, '░', hat, '░', hole],
    ['░', hole, '░', hole, hole],
    ['░', '░', hole, hole, '░'],
    [hole, '░', '░', '░', hole]
]

function generateField(height, width) {

    newField = [];
    //set the height by adding the number of arrays specified to build up the height
    for(let i = 0; i < height; i++) {
        newField.push([]);
    }
    //then, assign each element as randomly as possible, but keeping the ratio appropriate.
    newField.forEach(heightSubArray => {
        for(let j = 0; j < width; j++) {
            let randomNum = Math.floor((Math.random() * 5) +1);
            if (randomNum === 1) {
                heightSubArray.push(hole);
            } else if (randomNum === 2 || randomNum === 3 || randomNum === 4 || randomNum === 5) {
                heightSubArray.push(fieldCharacter);
            }
        }
    })
    // set the hat
    randomCoordinate = Math.floor((Math.random() * height));
    newField[randomCoordinate][randomCoordinate] = hat;

    //this makes the grid look more better, and aligns it to 10 elements wide.
    newField = newField.join('\n');

}  

//helper method to decide whether user is on a win or lose
function winOrLose() {
    if(win) {
        console.log('Congrats you won!');
    } else if (lose) {
        console.log('game over');
    }
}

//helper method to check what the current location is, whther its a hole or hat, or out of bounds
function check() {
    if (x <= 0 || x > myField.length || y < 0 || y === (myField[y].length - 1)) {
        lose = true;
        console.log('you are out of bounds! You lose.')
    }
    else if(myField[x][y] === hole) {
        lose = true;
        console.log('You fell into a hole! You lose.');
    } else if (myField[x][y] === hat) {
        win = true;
        console.log('you win! Well done.');
    } 
}

//core game method. Handles user input, and updates the current location.
function runGame() {

    /* start in top left corner. Assigning global variables to x and y so they can 
    be used in the helper methods.*/
    x = 0;
    y = 0;
    myField[x][y] = pathCharacter;
    console.log('Start!');
    console.log(myField.join('\n'));

    while(!win) {

        //ask where to go
        let input = prompt('Which way you wanna go? ');
        
        //accepting the input
        switch(input[0].toUpperCase()) {
            case "U":
                x--;
                check()
                myField[x][y] = pathCharacter;
                console.log(myField.join('\n'));
                break;
            case "D":
                x++;
                check();
                myField[x][y] = pathCharacter;
                console.log(myField.join('\n'));
                break;
            case "L":
                y--;
                check();
                myField[x][y] = pathCharacter;
                console.log(myField.join('\n'));
                break;
            case "R":
                y++;
                check();
                myField[x][y] = pathCharacter;
                console.log(myField.join('\n'));
                break;
            default:
                console.log('please enter either u, d, l or r');
        }
    }
}

//runGame();
generateField(10, 10);
console.log(newField);