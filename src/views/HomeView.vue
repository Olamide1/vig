<template>
  <IndexComponent msg="Welcome"/>
</template>

<script>
// @ is an alias to /src
import IndexComponent from '@/components/Index.vue'

export default {
  name: 'HomeView',
  components: {
    IndexComponent
  }
}
</script>
