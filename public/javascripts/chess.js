$( document ).ready(function() {
    console.log( "Document is ready" );
    registerClick();
});

let counter = 0;

function highlightTest(elmnt) {
    alert("" + elmnt.id);
}

function clickFct(elmnt) {
    elmnt.style.color = "red";
    $("#" + elmnt).off("click");
}

function movePiece(elmnt) {
    //call route
    if (counter === 0) {
        //call selectpiece Route
        $.ajax({
            type: "GET",
            url: "/schach/savePiece/:from1/:from2"
        })
        counter = 1;
    } else if (counter === 1) {
        //call movepiece route
        $.ajax({
            type: "GET",
            url: "/schach/move/:to1/:to2"
        })
        counter = 0;
    }
}

function registerClick() {
    for (var col = 0; col < 8; col++) {
        for (var row = 0; row < 8; row++) {
            $("#" + col + row).click(function() { movePiece(this)});
        }
    }
}