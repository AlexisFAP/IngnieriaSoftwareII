<template>
  <div>
    <v-card>
      <v-form ref="formularioPropuesta">
        <v-card-title primary-title> Propuesta </v-card-title>
        <v-card-subtitle>* Campo Obligatorio</v-card-subtitle>
        <v-card-text>
          <v-text-field
            color="white"
            v-model="titulo"
            :rules="requiredRule"
          ><template #label>
              <span class="red--text"><strong>* </strong></span>Título
            </template></v-text-field>
          <v-textarea
            color="white"
            v-model="descripcion"
            :rules="requiredRule"
          ><template #label>
              <span class="red--text"><strong>* </strong></span>Descripción
            </template></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="createPropuesta()">Postular Propuesta</v-btn>
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
        descripcion: null,
        titulo: null,
        requiredRule: [(v) => !!v || "El campo es obligatorio"],
    };
  },
  beforeMount(){
    this.cargarPagina();
  },
  methods: {
      async createPropuesta() {
        try{
            if (!this.$refs.formularioPropuesta.validate()) {
                return;
            }
        let url = config.URL_API + "/postulaciones";
        let payload = {};
        payload.id_usuario = localStorage.getItem("id");
        payload.id_reto = localStorage.getItem("id_reto");;
        payload.descripcion = this.descripcion;
        payload.titulo = this.titulo;
        payload.estado = 'En Proceso'
        let response = await this.$axios.post(url, payload)
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
            title: "Propuesta Creada",
            text: "Propuesta creadoa exitosamente",
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