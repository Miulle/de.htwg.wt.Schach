import Vue from 'vue';

<template>
  <div class="chessboard">
    <div v-for="row in rows" :key="row">
      <div v-for="col in cols" :key="col" :id="col + '-' + row">
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      size: 8,
      rows: [0, 1, 2, 3, 4, 5, 6, 7],
      cols: [0, 1, 2, 3, 4, 5, 6, 7],
    }),
    mounted: function () {
      for(let col = 0; col < 8; col++) {
        for(let row = 0; row < 8; row++) {
          let square = $("#" + row + "-" + col);
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

<style scoped lang="scss">

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
    width:46.8vw;
    height: 46.8vw;
    max-height: 100vw;
    max-width: 100vw;
    margin: auto;
    border: 1vw solid #333;
  }
  .black {
    float: left;
    width: 1.4em;
    height: 1.4em;
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
    width: 1.4em;
    height: 1.4em;
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