//ID Number: 620091084
//Author: Davina Scott
//Extra Functionality imlemented is the notification when the player has won the game

//Declaration of Global Variables
//piecePos keeps track of the correct positioning of each puzzle piece. Also used in the implementation of the initial and final position of puzzle pieces. 
var piecePos = {"1":[0,0],"2":[0,100],"3":[0,200],"4":[0,300],"5":[100,0],"6":[100,100],"7":[100,200],"8":[100,300],"9":[200,0],"10":[200,100],"11":[200,200],"12":[200,300],"13":[300,0],"14":[300,100],"15":[300,200]}
//emptyPiece keeps track of the position of the empty piece on the canvas with the initial positions in place. This array is updated every time the positionof the empty piece changes.
var emptyPiece = [300,300]

//Main or driver function. Occurs on loading the page and contains function calls to other functions that are part of the whole programme. 
window.onload = function() {
	//pieces contain all the div elements in the parent div puzzle area.
	var pieces = puzzlearea.children;
	/*window.alert(pieces.length);*/
	for (var x = 0; x < pieces.length; x++) {
		//adds the class puzzlepiece to the various divs containing the puzzle pieces.
        pieces[x].classList.add("puzzlepiece");
        //allows the user to move a particular piece.
        pieces[x].onclick = function(){
        	move(this);
        	//This if statement checks if the empty space is in its original space after the first moves have been made then checks if a player has won the game.
        	if (emptyPiece[0] === 300 && emptyPiece[1] === 300){
        		winner();
        	}
        };
        //checks if a piece is moveable when the mouse is passed over it.
        pieces[x].onmouseover = function(){isMoveable(this)};
   }
   	// Puts the pieces in their initially correct places.
    piecePosition();
    document.getElementById("shufflebutton").onclick = function(){
    	shuffle();
    	var j = document.getElementsByClassName("explanation");
    	//resets the game.
    	j[0].innerHTML = "The goal of the fifteen puzzle is to un-jumble its fifteen squares by repeatedly making moves that slide squares into the empty space.  How quickly can you solve it?";
    }
}

//This function places the puzzle pieces in their initial and correct position as well set the background of each piece.
function piecePosition(){
	var values = Object.keys(piecePos).map(function(key){
    return piecePos[key];})
	var pieces = puzzlearea.children;
	for (var x = 0; x < pieces.length; x++) {
		var top = values[x][0];
		var left = values[x][1];
		var nTop = top.toString() + "px";
		var nLeft = left.toString() + "px";
		pieces[x].style.top = nTop;
        pieces[x].style.left = nLeft;
     }
    var i = 0;
    var puzzleArea = 400;
    for (var yPos = puzzleArea; yPos >= 100; yPos-= 100){
		for (var xPos = 0; xPos >= -1*(puzzleArea-100); xPos -= 100){
			if(i < pieces.length){
				pieces[i].style.backgroundPosition = (xPos + "px ") + (yPos + "px");
				pieces[i].style.backgroundImage = "url('background.png')";
				i++; 
			}
			else{break;}
		}
	}               
}

//This function is used to switch the empty piece and another puzzle piece. It takes a puzzle piece as an argument and calls the isMoveable function to check if that piece can actually be moved.
function move(piece){
	if (isMoveable(piece)){
		var switchTop = emptyPiece[0] + "px";
		var switchLeft = emptyPiece[1] + "px";
		var styleTop = piece.style.top;
		var styleLeft = piece.style.left;
		piece.style.top = switchTop;
		piece.style.left = switchLeft;
		emptyPiece[0] = parseInt(styleTop);
		emptyPiece[1] = parseInt(styleLeft);
	}
}

//This function accepts a puzzle piece and checks the proximity to the empty space. If the piece is adjacent to the empty space the colour of the piece changes signalling that that piece is moveable.
function isMoveable(pPiece){ 	
	if (parseInt(pPiece.style.top) === emptyPiece[0] ){
		
		if (parseInt(pPiece.style.left) + 100 === emptyPiece[1] || parseInt(pPiece.style.left) - 100 === emptyPiece[1])
			{pPiece.classList.add("movablepiece");
			return true;}
		else
			{pPiece.classList.remove("movablepiece");
			return false;}
	}
	else if (parseInt(pPiece.style.left) === emptyPiece[1]){   
		if (parseInt(pPiece.style.top) + 100 === emptyPiece[0] || parseInt(pPiece.style.top) - 100 === emptyPiece[0])
			{pPiece.classList.add("movablepiece");
			return true;}
		else
			{pPiece.classList.remove("movablepiece");
			return false;}
	}
	else{pPiece.classList.remove("movablepiece");
		return false;}
}

//This function takes all the puzzle pieces on the canvas and shuffles them until they are randomly placed and out of order. 
function shuffle(){
	var pieces = puzzlearea.children;
	var i = 0;
	do{
		for (var x = 0; x < pieces.length; x++){
			if(isMoveable(pieces[x])){
				move((pieces[x]));
			}
		}
		i++;
	} while (i < 40)
}

//This function checks if the user has won..
function winner(){
	var values = Object.keys(piecePos).map(function(key){
    return piecePos[key];})
    var pieces = puzzlearea.children;
    var match = 0;
    for(var x = 0; x < pieces.length; x++){
    	if (parseInt(pieces[x].style.top) === values[x][0] || parseInt(pieces[x].style.left) === values[x][1]){
    		match++;
    }
    if (match === 15){
    	var j = document.getElementsByClassName("explanation");
    	j[0].innerHTML = ":] :] YOU WON!! :] :]";
    } 
}

}

//This function creates a storage variable and keeps track of the amount of time the shuffle button is clicked.
/*function shuffleCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
    }
    if (localStorage.clickcount >= 1){
    	winner();
    }
}*/





