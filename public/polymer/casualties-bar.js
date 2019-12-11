import {
    LitElement,
    html
} from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';



class CasualtiesBar extends LitElement {

    static get properties() {
        return {
            pieces: {
                type: Array[String]
            }
        }
    }

    
    
    // getPiece(piecesList) {
    //
    //     for (var i = 0; i < piecesList.length; i++) {
    //         switch(piecesList[i]) {
    //             case piecesList[i].startsWith("Pawn"):
    //
    //         }
    //     }
    //
    //     for (p in piecesList) {
    //         switch(p) {
    //             case p.startsWith("Pawn"):
    //                 if (bPSide === "w") {
    //                     this.squares[bPX][bPY] = "<span>&#9817;</span>";
    //                 }
    //                 else {
    //                     this.squares[bPX][bPY] = "<span>&#9823;</span>";
    //                 }
    //                 break;
    //             case "EmptyField":
    //                 this.squares[bPX][bPY] = "<span>" + "" + "</span>";
    //                 break;
    //             case "Rook":
    //                 if (bPSide === "w") {
    //                     this.squares[bPX][bPY] = "<span>&#9814;</span>";
    //                 }
    //                 else {
    //                     this.squares[bPX][bPY] = "<span>&#9820;</span>";
    //                 }
    //                 break;
    //             case "Knight":
    //                 if (bPSide === "w") {
    //                     this.squares[bPX][bPY] = "<span>&#9816;</span>";
    //                 }
    //                 else {
    //                     this.squares[bPX][bPY] = "<span>&#9822;</span>";
    //                 }
    //                 break;
    //             case "King":
    //                 if (bPSide === "w") {
    //                     this.squares[bPX][bPY] = "<span>&#9812;</span>";
    //                 }
    //                 else {
    //                     this.squares[bPX][bPY] = "<span>&#9818;</span>";
    //                 }
    //                 break;
    //             case "Queen":
    //                 if (bPSide === "w") {
    //                     this.squares[bPX][bPY] = "<span>&#9813;</span>";
    //                 }
    //                 else {
    //                     this.squares[bPX][bPY] = "<span>&#9819;</span>";
    //                 }
    //                 break;
    //             case "Bishop":
    //                 if (bPSide === "w") {
    //                     this.squares[bPX][bPY] = "<span>&#9815;</span>";
    //                 }
    //                 else {
    //                     this.squares[bPX][bPY] = "<span>&#9821;</span>";
    //                 }
    //         }
    //     }
    // }

    render() {
        return html `

        <style>
            .black {
                float: left;
                width: 12.5%;
                height: 12.5%;
                max-height: 100vw;
                max-width: 100vw;
                background-color: #999;
                font-size: 4vw;
                text-align:center;
                display: table-cell;
                vertical-align:middle;
                cursor: pointer;
            }
            .white {
                float: left;
                width: 12.5%;
                height: 12.5%;
                max-height: 100vw;
                max-width: 100vw;
                background-color: #fff;
                font-size: 4vw;
                text-align:center;
                display: table-cell;
                vertical-align:middle;
                cursor: pointer;
            }
            .icon {
                color: black;
                text-align: center;
                font-family: impact;
                font-size: 50px;
                margin-right: 20px;
                margin-left: 20px;
                width: auto;
                height: auto;
            }
        </style>
        
        <div id="casualtiesBar">
            <div id="statusBar" class="black"><span>♖</span></div>
        </div>
        `;
    }
}
customElements.define('casualties-bar', CasualtiesBar);