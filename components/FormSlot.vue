<template>
  <v-card>
    <v-card-title class="indigo white--text">
      <v-icon left color="white">
        <slot name="form-icons"> $vuetify.icons.register </slot>
      </v-icon>
      <span class="headline">
        <slot name="form-headline"> Form </slot>
      </span>
    </v-card-title>
    <v-card-text>
      <div class="pa-1">
        <slot></slot>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <slot name="form-actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {}
</script>