<template>
  <div>
    <v-card>
      <v-form ref="formularioLogin">
        <v-card-title primary-title> Log In </v-card-title>
        <v-card-text>
          <v-text-field
            label="Identificación"
            v-mode  l="id"
            :rules="requiredRule"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Contraseña"
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
<style scoped>
.theme--dark.v-card {
  background-color: #0077B6;
}
.theme--dark.success {
  background-color: #90E0EF !important;
  border-color: #90E0EF !important;
}

.theme--light.v-card {
  background-color: #c5c5c5;
}
.theme--light.success {
  background-color: #47e30a !important;
  border-color: #47e30a !important;
}

.theme--light.v-card {
  background-color: #b60000;
  color: #fff;
}
.theme--light.success {
  background-color: #ef9090 !important;
  border-color: #ef9090 !important;
}
.theme--light.v-label {
  color: rgba(255,255,255,1.0)
}
</style>
