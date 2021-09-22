<template>
  <div>
    <v-card>
      <v-form ref="formularioLogin">
        <v-card-title primary-title> Log In </v-card-title>
        <v-card-text>
          <v-text-field
            label="Identificación"
            v-model="id"
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