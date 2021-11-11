<template>
  <div>
    <v-card id="card" max-width="600px">
      <v-form ref="formularioPropuesta">
        <v-card-title primary-title> Avance 1 </v-card-title>
        <v-card-text>
          <v-text-field
            color="white"
            v-model="titulo1"
            label="Título"
          ></v-text-field>
          <v-textarea
            color="white"
            v-model="descripcion1"
            rows="3"
            label="Descripción"
          ></v-textarea>
          <v-card-title primary-title> Avance 2 </v-card-title>
          <v-text-field
            color="white"
            v-model="titulo2"
            label="Título"
          ></v-text-field>
          <v-textarea
            color="white"
            v-model="descripcion2"
            rows="3"
            label="Descripción"
          ></v-textarea>
          <v-card-title primary-title> Avance 3 </v-card-title>
          <v-text-field
            color="white"
            v-model="titulo3"
            label="Título"
          ></v-text-field>
          <v-textarea
            color="white"
            v-model="descripcion3"
            rows="3"
            label="Descripción"
          ></v-textarea>
        </v-card-text>
        <v-card-actions id="a">
          <v-btn color="success" @click="editarAvances()">Modificar Avances</v-btn>
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
        avances: [],
        descripcion1: null,
        titulo1: null,
        descripcion2: null,
        titulo2: null,
        descripcion3: null,
        titulo3: null,
    };
  },
  beforeMount(){
    this.cargarPagina();
    this.cargarAvances();
  },
  methods: {
      async cargarAvances() {
        let url = config.URL_API + "/avances";
        let payload = {}
        let response = await this.$axios.get(url, payload)
        let data = response.data
        for(let i=0;i<data.info.length;i++){
            if(localStorage.getItem("id_propuesta") == data.info[i].id_postulacion){
                this.avances.push(data.info[i]);
            }
        }
        console.log(this.avances);
      },
      async editarAvances() {
        try{
            if (!this.$refs.formularioPropuesta.validate()) {
                return;
            }
        let url = config.URL_API + "/avances";
        let payload = {};
        payload.id = this.avances[0].id
        payload.titulo = this.titulo1
        payload.descripcion = this.descripcion1
        let payload2 = {}
        payload2.id = this.avances[1].id
        payload2.titulo = this.titulo2
        payload2.descripcion = this.descripcion2
        let payload3 = {}
        payload3.id = this.avances[2].id
        payload3.titulo = this.titulo3
        payload3.descripcion = this.descripcion3
        let response = await this.$axios.put(url, payload)
        let response2 = await this.$axios.put(url, payload2)
        let response3 = await this.$axios.put(url, payload3)
        let data = response.data
        let data2 = response2.data
        let data3 = response3.data
        if (data.ok == false && data2.ok == false && data3.ok == false) {
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
            title: "Avances Editados",
            text: "Avances editados exitosamente",
          }).then((result) =>{
            if(!result.isConfirmed){
              this.$router.push("/mispropuestas");
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