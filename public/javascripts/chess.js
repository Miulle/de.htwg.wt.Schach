var counter = 0;
var col1 = 0;
var row1 = 0;

class Board {
    constructor(){
        this.round = 0;
        this.rochadeDoneW = false;
        this.rochadeDoneB = false;
        this.canMove = false;
        this.moveDone = false;
        this.player1Turn = true;
        this.player2Turn = false;
        this.squares = [];
    }

    fill(json) {
        this.round = json["gameboard"]["round"];
        this.rochadeDoneW = json["gameboard"]["rochadeDoneW"];
        this.rochadeDoneB = json["gameboard"]["rochadeDoneB"];
        this.canMove = json["gameboard"]["canMove"];
        this.moveDone = json["gameboard"]["moveDone"];
        this.player1Turn = json["gameboard"]["playerTurnW"];
        this.player2Turn = json["gameboard"]["playerTurnB"];

        for (var square = 0; square < 64; col++) {
            var boardPiecesLength = json["gameboard"]["board"][0][square].toString().length;
            var boardPiece = json["gameboard"]["board"][0][square].slice(12, boardPiecesLength - 6).toString();
            var bPSide = json["gameboard"]["board"][0][square].slice(boardPiecesLength - 5, boardPiecesLength - 4).toString();
            var bPX = json["gameboard"]["board"][0][square].slice(2, 3).toString.parseInt;
            var bPY = json["gameboard"]["board"][0][square].slice(3, 4).toString.parseInt;
        }

        switch(boardPiece) {
            case "Pawn":
                this.squares[bPX][bPY] = "Pawn(" + bPSide + ")"
                break;
            case "EmptyField":
                this.squares[bPX][bPY] = "EmptyField(" + bPSide + ")"
                break;
            case "Rook":
                this.squares[bPX][bPY] = "Rook(" + bPSide + ")"
                break;
            case "Knight":
                this.squares[bPX][bPY] = "Knight(" + bPSide + ")"
                break;
            case "King":
                this.squares[bPX][bPY] = "King(" + bPSide + ")"
                break;
            case "Queen":
                this.squares[bPX][bPY] = "Queen(" + bPSide + ")"
                break;
            case "Bishop":
                this.squares[bPX][bPY] = "Bishop(" + bPSide + ")"
        }
    }
}

let board = new Board()

function loadJson() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            board = new Board();
            board.fill(result);
            updateBoard(board);
            registerClickListener();
        }
    });
}

function updateBoard(board) {
    for (let col = 0; col < 8; col++) {
        for (let row = 0; row < 8; row++) {
            if(board.squares[col][row] != 0){
                $("#" + col + row).html(board.squares[col][row]);
            }
        }
    }

}


function highlightTest(elmnt) {
    alert("" + elmnt.id);
}

function clickFct(elmnt) {
    elmnt.style.color = "red";
    $("#" + elmnt).off("click");
}

function movePiece(elmnt) {
    //call route
    //alert(counter);
    if (counter === 0) {
        col1 = elmnt.id.charAt(0);
        row1 = elmnt.id.charAt(1);
        counter++;
    } else if (counter === 1) {
        window.location = ("/schach/move/" + col1 + "/" + row1 + "/" + elmnt.id.charAt(0) + "/" + elmnt.id.charAt(1));
    }
}

function registerClickListener() {
    for (var col = 0; col < 8; col++) {
        for (var row = 0; row < 8; row++) {
            $("#" + col + row).click(function() { movePiece(this) });
        }
    }
}

$( document ).ready(function() {
    console.log( "Document is ready" );
    loadJson();
});