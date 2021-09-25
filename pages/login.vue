<template>
  <div>
    <v-card>
      <v-form ref="formularioLogin">
        <v-card-title primary-title> Log In </v-card-title>
        <v-card-text>
          <v-text-field
            label="Email" color="white"
            v-mode  l="id"
            :rules="requiredRule"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Password" color="white"
            v-model="clave"
            :rules="requiredRule"
          ></v-text-field>
        </v-card-text>
        <v-progress-linear
          :indeterminate="true"
          v-if="loading"
        ></v-progress-linear>
        <v-card-actions>
          <v-btn color="success">Log In</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script>

</script>
<style scoped>
.theme--dark.v-card {
  background-color: #0077B6;
}
.theme--dark.success {
  background-color: #90E0EF !important;
  border-color: #90E0EF !important;
}
div.v-input.v-input--is-label-active.v-input--is-dirty.v-input--is-focused {
  caret-color: #fcfcfc !important;
  color: #fcfcfc !important;
}
</style>
