<template>
  <v-snackbar elevation="5" v-model="show" :color="colorBar" timeout="2000" app top>
    <p class="font-weight-black">{{ textMessage }}</p>
  </v-snackbar>
</template>

<script>
import { getSet } from '~/utils'
export default {
  computed: {
    textMessage: function() { return this.$store.getters['utils/snackbar/GET_TEXT_MESSAGE']},
    colorBar: function() { return this.$store.getters['utils/snackbar/GET_COLOR_BAR']},
    show: getSet('utils/snackbar/GET_SHOW','utils/snackbar/SET_SHOW' ),
  },
}
</script>