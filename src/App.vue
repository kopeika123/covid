<template>
  <transition mode="out-in">
    <router-view/>
  </transition>
</template>

<script>
//import HelloWorld from './components/Covid.vue'

export default {
  name: 'App',
 // components: {
 //   HelloWorld
//  }
}
</script>

<style>
#app {
  background: rgb(244, 246, 248) none repeat scroll 0% 0% !important;
  font-family: "Roboto", sans-serif;
}
</style>
