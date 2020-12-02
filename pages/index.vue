<template>
  <div>
    <p v-for="x in 100" :key="x">
      {{x}} Hello mon
    </p>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
    asyncData() {
    // console.log(context)
  
  },
  middleware: 'auth',
}

</script>
