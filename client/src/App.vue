<template>
  <div id="app">
    <Navbar />
    <Meetings />
  </div>
</template>

<script>
import Meetings from './pages/Meetings.vue'
import Navbar from './components/common/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Meetings
  }
}
</script>
