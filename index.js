//import Player from './Player.js';
import * as io from './input_output.js';


function main(){
    console.log("Welcome to the imaginatively titled Project 9 Game" );

    function mes () => {console.log("Does this work?")};

    io.startGame(mes, mes);
}

main();