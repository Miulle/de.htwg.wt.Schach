$( document ).ready(function() {
    console.log( "Document is ready" );
    registerClick();
});

function highlightTest(col, row) {
    alert('clicked!');
}

function clickFct(elmnt) {
    elmnt.style.color = "red";
}

function registerClick() {

    for (var col = 0; col < 8; col++) {
        for (var row = 0; row < 8; row++) {
            $("#" + col + row).click(function() { clickFct(this)}); }
    }
}