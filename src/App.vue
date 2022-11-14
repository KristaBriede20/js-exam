<template>
    <Header>
        <div v-if = "auth.is_authenticated == true">
           <Navigation class="show"></Navigation>
         </div>
    </Header>
    <div id="section-body">
        <router-view class="section-router"></router-view>
    </div>
    <div id="section-player" >
        <AudioPlayer />
    </div>
</template>
<script>
import {auth} from "/auth.js"
import Navigation from './components/NavigationComponent.vue'
</script>