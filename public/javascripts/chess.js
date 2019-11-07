$( document ).ready(function() {
    console.log( "Document is ready" );
    registerClick();
});

var counter = 0;
var col1 = 0;
var row1 = 0;

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

function registerClick() {
    for (var col = 0; col < 8; col++) {
        for (var row = 0; row < 8; row++) {
            $("#" + col + row).click(function() { movePiece(this) });
        }
    }
}