<template>
  <div>
    <v-card>
      <v-form ref="formularioLogin">
        <v-card-title primary-title> Sing Up </v-card-title>
        <v-card-text>
          <v-text-field
            label="First Name"
            v-model="firstname"
            :rules="requiredRule"
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="lastname"
            :rules="requiredRule"
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="email"
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
          <v-btn color="success">Sing Up</v-btn>
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
}
.theme--light.success {
  background-color: #DA4167 !important;
  border-color: #DA4167 !important;
}
.theme--light.v-sheet {
  color: #FFFFFF;
}
.theme--light.v-input {
    color: #FFFFFF;
}
</style>