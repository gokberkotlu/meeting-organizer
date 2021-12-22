<template>
  <div id="app">
    <h2>APP.VUE</h2>
    <Meetings />
  </div>
</template>

<script>
import Meetings from './pages/Meetings.vue'

export default {
  name: 'App',
  components: {
    Meetings
  }
}
</script>
