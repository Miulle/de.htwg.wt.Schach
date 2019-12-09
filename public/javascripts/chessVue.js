$(document).ready(function () {
    var chessGame = new Vue({
        el:'#chess-game'
    })
})

Vue.component('chess-field', {
    //fill with proper values
    template:`
        <div class="chessboard">
            //fill
            <div v-for="xxx" class="xxx">
                //fill
                <div v-for="yyy" class="yyy" v-bind:id="yyy"></div>
            </div>
        </div>
    `,
    data: function () {
        return {
            //fill with proper values
        }
    },

})