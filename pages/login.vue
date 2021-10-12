<template>
  <div>
    <v-card>
      <v-form ref="formularioLogin">
        <v-card-title primary-title> Ingresar </v-card-title>
        <v-card-text>
          <v-text-field
            type="password"
            label="Contraseña" color="white"
            v-model="clave"
            :rules="requiredRule"
          ></v-text-field>
        </v-card-text>
        <v-progress-linear
          :indeterminate="true"
          v-if="loading"
        ></v-progress-linear>
        <v-card-actions>
          <v-btn color="success" @click="login()">Ingresar</v-btn>
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
      id: null,
      clave: null,
      requiredRule: [(v) => !!v || "El campo es obligatorio"],
      loading: false,
    };
  },
  methods: {
    async login() {
      try {
        if (!this.$refs.formularioLogin.validate()) {
          return;
        }
        let url = config.URL_API + "/login";
        let payload = {};
        payload.id = this.id;
        payload.clave = this.clave;
        this.loading = true;
        let response = await this.$axios.post(url, payload);
        this.loading = false;

        let data = response.data;
        if (data.ok == true) {
          let token = data.info.token
          let nombre_usuario =  data.info.nombre_completo
          let id = data.info.id
          localStorage.setItem('token', token)
          localStorage.setItem('nombre_usuario', nombre_usuario)
          localStorage.setItem('id',id)
          console.log(data.info);
          this.$router.push('/')
        } else {
          this.$swal({
            type: "error",
            icon: "error",
            title: "Oops...",
            text: data.message,
          });
          console.log("no da");
        }
        console.log(response);
      } catch (error) {
        this.sa
        this.$swal({
          type: "error",
          icon: "error",
          title: "Oops...",
          text: "Id y/o contraseña incorrectos",
        });
        console.log(error);
      } finally {
        this.loading = false;
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
div.v-input.v-input--is-label-active.v-input--is-dirty.v-input--is-focused {
  caret-color: #fcfcfc !important;
  color: #fcfcfc !important;
}
</style>
