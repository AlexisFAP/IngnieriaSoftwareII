<template>
  <div>
    <v-card>
      <v-form ref="formularioSingup">
        <v-card-title primary-title> Registrarse </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nombre Completo" color="white"
            v-model="name"
            :rules="requiredRule"
          ></v-text-field>
          <v-select
            :items="cargos"
            v-model="cargo"
            label="Cargo" color="white"
            :rules="requiredRule"
          ></v-select>
          <v-text-field
            type="password"
            label="Contraseña" color="white"
            v-model="clave"
            :rules="requiredRule"
          ></v-text-field>
          <v-text-field
            label="Usuario" color="white"
            v-model="user"
            :rules="requiredRule"
          ></v-text-field>
          <v-text-field
            label="Teléfono" color="white"
            v-model="phone"
            :rules="requiredRule"
          ></v-text-field>
          <v-text-field
            label="Correo" color="white"
            v-model="email"
            :rules="requiredRule"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="singup()">Registrarse</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import config from "../assets/js/config";
export default {
  data() {
    return{
      name: null,
      cargo: null,
      user: null,
      phone: null,
      email: null,
      clave: null,
      requiredRule: [(v) => !!v || "El campo es obligatorio"],
      cargos: ['Profesor', 'Estudiante'],
    };
  },
  methods: {
    async singup() {
      try {
        if (!this.$refs.formularioSingup.validate()) {
          return;
        }
        let url = config.URL_API + "/usuarios";
        let payload = {};
        payload.nombre_completo = this.name;
        payload.cargo = 'Estudiante';
        payload.clave = this.clave;
        payload.usuario = this.user;
        payload.telefono = this.phone;
        payload.correo = this.email;
        console.log("esta es la clave" + this.clave);
        let response = await this.$axios.post(url, payload)

        let data = response.data;
        if (data.ok == true) {
          console.log(data.info);
          this.$swal({
            type: "success",
            icon: "success",
            title: "Usuario Creado",
            text: "Su usuario se puedo crear exitosamente",
          });
        } else {
          this.$swal({
            type: "error",
            icon: "error",
            title: "Oops...",
            text: data.message,
          });
        }
        console.log(response);
      } catch (error) {
        this.$swal({
          type: "error",
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error. No se ha podido conectar a API.",
        });
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.theme--dark.v-card {
  background-color: #0077B6;
}
.theme--dark.success {
  background-color: #90E0EF !important;
  border-color: #90E0EF !important;
}
</style>