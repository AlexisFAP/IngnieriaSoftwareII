<template>
  <div>
    <v-card id="card" max-width="600px">
      <v-form ref="formularioPropuesta">
        <v-card-title primary-title> Propuesta </v-card-title>
        <v-card-subtitle>* Campo Obligatorio</v-card-subtitle>
        <v-card-text>
          <v-text-field
            color="white"
            v-model="titulo"
            :rules="requiredRule"
          ><template #label>
              <span class="red--text"><strong>* </strong></span>Título Propuesta
            </template></v-text-field>
          <v-textarea
            color="white"
            v-model="descripcion"
            :rules="requiredRule"
            rows="3"
          ><template #label>
              <span class="red--text"><strong>* </strong></span>Descripción Propuesta
            </template></v-textarea>
        </v-card-text>
        <v-row justify="center">
            <span class="fecha">Fecha Entrega 1</span>
            <v-date-picker class="date" color="blue light" header-color="primary" v-model="fecha1"></v-date-picker>
          </v-row>
        <v-row justify="center">
          <span class="fecha">Fecha Entrega 2</span>
            <v-date-picker class="date" color="blue light" header-color="primary" v-model="fecha2"></v-date-picker>
          </v-row>
        <v-row justify="center">
          <span class="fecha">Fecha Entrega 3</span>
            <v-date-picker class="date" color="blue light" header-color="primary" v-model="fecha3"></v-date-picker>
          </v-row>
          <p></p>
        <v-card-actions id="a">
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
        fecha1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        fecha2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        fecha3: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        id:null,
    };
  },
  beforeMount(){
    this.cargarPagina();
    if(localStorage.getItem("cargo")=="Administrador"){
      this.$router.push("/");
    }
    this.idpropuestas();
  },
  methods: {
      async idpropuestas(){
        let url = config.URL_API + "/avancesid";
        let payload = {};
        let response = await this.$axios.get(url, payload)
        let data = response.data
        this.id = data.info[0].id +1
        console.log(this.id);
      },
      async createPropuesta() {
        try{
            if (!this.$refs.formularioPropuesta.validate()) {
                return;
            }
        let url = config.URL_API + "/postulaciones";
        let payload = {};
        payload.id = this.id
        payload.id_usuario = localStorage.getItem("id");
        payload.id_reto = localStorage.getItem("id_reto");;
        payload.descripcion = this.descripcion;
        payload.titulo = this.titulo;
        payload.estado = 'En Proceso'
        let response = await this.$axios.post(url, payload)
        let data = response.data
        url = config.URL_API + "/avances";
        let payload2 = {}
        payload2.fecha = this.fecha1
        payload2.id_postulacion = this.id
        let response2 = await this.$axios.post(url, payload2)
        let data2 = response2.data
        let payload3 = {}
        payload3.fecha = this.fecha2
        payload3.id_postulacion = this.id
        let response3 = await this.$axios.post(url, payload3)
        let data3 = response3.data
        let payload4 = {}
        payload4.fecha = this.fecha3
        payload4.id_postulacion = this.id
        let response4 = await this.$axios.post(url, payload4)
        let data4 = response4.data
        if (data.ok == false && data2.ok == false && data3.ok == false && data4.ok == false) {
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
            text: "Propuesta creado exitosamente",
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
.fecha{
  margin: auto 0;
  margin-right: 20px;
  
}
#a{
  justify-content: center;
}
#card{
  margin: 0 auto;
}
.theme--dark.v-card {
  background-color: #0077B6;
}
.theme--dark.success {
  background-color: rgb(115, 204, 219)!important;
  border-color: rgb(115, 204, 219) !important;
}
</style>