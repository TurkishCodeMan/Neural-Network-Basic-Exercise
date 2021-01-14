<template>
  <body>
    <div id="app">
      <app-home></app-home>
    </div>
  </body>
</template>

<script>
import Home from "./components/Home"
export default {
  name: "App",
  components:{
    appHome:Home
  }
};
</script>

<style>
*{
  box-sizing: border-box;
}
body{
  margin: 0;
  padding:0;
  width: 100%;
  height: 100%;
  background-color:rgb(120, 220, 245);
}
</style>
