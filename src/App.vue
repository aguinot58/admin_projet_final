<template>

  <div id="app" class="app-container">
    <app-header></app-header>
    <div class="content">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
  
</template>

<style>

  html, body {
    height: 100%;
    margin: 0;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex-grow: 1;
    padding-bottom: 2em;
  }

</style>