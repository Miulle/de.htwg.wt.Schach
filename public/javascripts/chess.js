function registerClick(){

}

$( document ).ready(function() {
    console.log( "Document is ready" );
    registerClick();
});

function highlightTest() {
    alert('clicked!');
}

function clickFct(elmnt) {
    elmnt.style.color = "red";
}

function registerClick() {

    $("TEST").click(function() {highlightTest()});

}