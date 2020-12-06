<template>
  <div class="d-flex flex-column flex-md-row justify-center">
    <v-card
      v-for="counter in dataCounters"
      :key="counter.title"
      :class="counter.color"
      class="mb-2 mx-md-2"
    >
      <v-card-text>
        <div class="d-flex flex-row align-center">
          <v-col class="mr-5" cols="2">
            <v-icon color="white" size="50px">
              {{ counter.icon }}
            </v-icon>
          </v-col>
          <v-col cols="10">
            <p class="white--text ma-0 pa-0">{{ counter.title }}</p>
            <p class="white--text text-h6 font-weight-black ma-0 pa-0">
              {{ counter.count }}
            </p>
          </v-col>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataCounters: [
        {
          color: 'deep-purple darken-4',
          icon: 'mdi-account-box',
          title: 'ACTIVE USERS',
          count: 18,
        },
        {
          color: 'indigo darken-4',
          icon: 'mdi-image',
          title: 'INVENTORY ITEMS',
          count: 36,
        },
        {
          color: 'blue darken-4',
          icon: 'mdi-basket',
          title: 'SAMPLE DATA',
          count: 18,
        },
         {
          color: 'pink darken-4',
          icon: 'mdi-account-child-circle',
          title: 'SAMPLE DATAA',
          count: 30,
        },
      ],
    }
  },
}
</script>