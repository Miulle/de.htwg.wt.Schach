import Vue from 'vue';

<template>
  <div class="chessboard">
    @for(row <- 0 until 8) {
    @for(col <- 0 until 8) {
    <div id="@col@row">
    </div>
    }
    <div class="clear"></div>
    }
  </div>
</template>

<script>
  export default {
    data: () => ({
      size: 8,
    }),
    mounted: function () {
      for(let col = 0; col < size; col++) {
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
  };
</script>

<style lang="scss" scoped>

  body {
    background-color: #D8D8D8;
  }

  h1 {
    color: black;
    text-align: center;
    font-family: impact;
    font-size: 50px;


  }h3 {
     color: black;
     text-align: left;
     font-family: impact;
     font-size: 30px;
   }

  h4 {
    color: black;
    text-align: center;
    font-family: impact;
    font-size: 10px;
  }

  p {
    font-family: Agency FB;
    font-size: 20px;
    text-align: left;
  }

  .chessboard {
    width:40vw;
    height: 40vw;
    margin: auto;
    border: 1vw solid #333;
  }
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

  .black:hover {
    background: yellow;
  }

  .white:hover {
    background: yellow;
  }

  .buttoncontainer {
    margin: 20px;
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