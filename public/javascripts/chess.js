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
        this.squares = new Array();
    }

    fill(json) {
        this.round = json["gameboard"]["round"];
        this.rochadeDoneW = json["gameboard"]["rochadeDoneW"];
        this.rochadeDoneB = json["gameboard"]["rochadeDoneB"];
        this.canMove = json["gameboard"]["canMove"];
        this.moveDone = json["gameboard"]["moveDone"];
        this.player1Turn = json["gameboard"]["playerTurnW"];
        this.player2Turn = json["gameboard"]["playerTurnB"];

        for (let square = 0; square < 64; square++) {
            let boardPiecesLength = JSON.stringify(json["gameboard"]["board"][0][square]).length;
            let boardPiece = JSON.stringify(json["gameboard"]["board"][0][square]).slice(12, boardPiecesLength - 6);
            let bPSide = JSON.stringify(json["gameboard"]["board"][0][square]).slice(boardPiecesLength - 5, boardPiecesLength - 4);
            let bPX = parseInt(JSON.stringify(json["gameboard"]["board"][0][square]).slice(2, 3));
            let bPY = parseInt(JSON.stringify(json["gameboard"]["board"][0][square]).slice(3, 4));
            this.squares[square] = new Array();

            switch(boardPiece) {
                case "Pawn":
                    if (bPSide === "w") {
                        this.squares[bPX][bPY] = "<span>&#9817;</span>";
                    }
                    else {
                        this.squares[bPX][bPY] = "<span>&#9823;</span>";
                    }
                    break;
                case "EmptyField":
                    this.squares[bPX][bPY] = "<span>" + "" + "</span>";
                    break;
                case "Rook":
                    if (bPSide === "w") {
                        this.squares[bPX][bPY] = "<span>&#9814;</span>";
                    }
                    else {
                        this.squares[bPX][bPY] = "<span>&#9820;</span>";
                    }
                    break;
                case "Knight":
                    if (bPSide === "w") {
                        this.squares[bPX][bPY] = "<span>&#9816;</span>";
                    }
                    else {
                        this.squares[bPX][bPY] = "<span>&#9822;</span>";
                    }
                    break;
                case "King":
                    if (bPSide === "w") {
                        this.squares[bPX][bPY] = "<span>&#9812;</span>";
                    }
                    else {
                        this.squares[bPX][bPY] = "<span>&#9818;</span>";
                    }
                    break;
                case "Queen":
                    if (bPSide === "w") {
                        this.squares[bPX][bPY] = "<span>&#9813;</span>";
                    }
                    else {
                        this.squares[bPX][bPY] = "<span>&#9819;</span>";
                    }
                    break;
                case "Bishop":
                    if (bPSide === "w") {
                        this.squares[bPX][bPY] = "<span>&#9815;</span>";
                    }
                    else {
                        this.squares[bPX][bPY] = "<span>&#9821;</span>";
                    }
            }
        }
    }
}

let board;

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
                $("#" + col + row).html(board.squares[col][row].toString());
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
    if (counter === 0) {
        col1 = elmnt.id.charAt(0);
        row1 = elmnt.id.charAt(1);
        counter++;
    } else if (counter === 1) {
        $.get("/schach/move/" + col1 + "/" + row1 + "/" + elmnt.id.charAt(0) + "/" + elmnt.id.charAt(1));
        counter = 0;
    }

}

function registerClickListener() {
    for (var col = 0; col < 8; col++) {
        for (var row = 0; row < 8; row++) {
            $("#" + col + row).click(function() { movePiece(this) });
        }
    }
}

function connectWebSocket() {
    var websocket = new WebSocket("ws://localhost:9000/websocket");
    websocket.setTimeout

    websocket.onopen = function(event) {
        console.log("Connected to Websocket");
    }

    websocket.onclose = function () {
        console.log('Connection with Websocket Closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occured: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            let json = JSON.parse(e.data);
            board.fill(json);
            updateBoard(board);
        }
    };
}

function boardInit() {
    for(let col = 0; col < 8; col++) {
        for(let row = 0; row < 8; row++) {
            let square = $("#" + col + row);
            if((row + col) % 2 !== 0) {
                square.addClass("white");
            } else {
                square.addClass("black");
            }
        }
    }
}


$( document ).ready(function() {
    console.log( "Document is ready" );
    //boardInit();
    board = new Board();
    loadJson();
    connectWebSocket();
});
