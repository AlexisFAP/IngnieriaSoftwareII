<template>
  <div>
    <v-card>
      <v-form ref="formularioReto">
        <v-card-title primary-title> Cambiar Estado Reto </v-card-title>
        <v-card-subtitle>* Campo Obligatorio</v-card-subtitle>
        <v-card-text>
           <v-select
           color="white"
            :items="estados"
            v-model="estado"
            :rules="requiredRule"
          ><template #label>
              <span class="red--text"><strong>* </strong></span>Estado
            </template>
          </v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="actualizarEstado()">Actualizar Estado</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import config from "../assets/js/config";
import comun from "../assets/js/comun.mixin"
export default {
  mixins:[comun],
  data() {
    return{
        estado:null,
        estados: ['Completado', 'En Proceso', 'Cancelado'],
        requiredRule: [(v) => !!v || "El campo es obligatorio"],
    };
  },
  beforeMount(){
    this.cargarPagina();
    this.verificarRol();
  },
  methods: {
      verificarRol(){
        if(!localStorage.getItem("rol")=="Profesor"){
          this.$router.push("/");
        }
      },
      async actualizarEstado() {
        try{
            if (!this.$refs.formularioReto.validate()) {
                return;
            }
        let url = config.URL_API + "/retos";
        let payload = {};
        payload.estado = this.estado;
        payload.id = localStorage.getItem('id_reto')
        let response = await this.$axios.put(url, payload)
        let data = response.data
        if (data.ok == false) {
          this.$swal({
            type: "error",
            icon: "error",
            title: "Oops...",
            text: data.message,
          })
        }else{
             console.log(data.info);
            this.$swal({
            type: "success",
            icon: "success",
            title: "Reto Editado",
            text: "Reto editado exitosamente",
          }).then((result) =>{
            if(!result.isConfirmed){
              this.$router.push("/");
            }
          });
        }
        console.log(response);
        }catch (error){
            this.$swal({
            type: "error",
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrido un error. No se ha podido conectar a API.",
        });
        console.log(error);
        }
      }
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