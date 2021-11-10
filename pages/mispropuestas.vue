<template>
    <div>
        <v-card color="#0077B6">
            <v-form>
              <v-card-title class="title" primary-title> Mis Propuestas </v-card-title>
            </v-form>
            <v-row justify="space-around">
            <template v-for="(item) in propuestas">
              <v-card id="container" width="250" 
              :key="item.id">
                <v-card-title  primary-title> {{item.titulo}}</v-card-title>
                <v-card-text>
                  <b>Descripción: </b> {{item.descripcion}}
                </v-card-text>
                <v-btn @click="eliminarPropuesta(item.id)">Eliminar Propuesta</v-btn>
                <v-btn @click="editarPropuesta(item.id)">Editar Propuesta</v-btn>
              </v-card>
            </template>
            </v-row>
        </v-card>
    </div>
</template>
<script>
import config from "../assets/js/config";
import comun from "../assets/js/comun.mixin"
export default {
  mixins:[comun],
    data() {
      return {
        propuestas: [],
        avances: [],
        prop_avan: [],
      }
    },
    beforeMount() {
      this.cargarPagina();
      this.cargarPropuestas();
      this.verificarRol();
    },
    methods: {
        editarPropuesta(id){
            localStorage.setItem("id_propuesta",id)
            this.$router.push("/editarpropuesta");
        },
      async eliminarPropuesta(id){
        let url = config.URL_API + "/postulaciones";
        let payload = {};
        payload.id = id
        let response = await this.$axios.delete(url, {data:payload})
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
            title: "Propuesta Eliminada",
            text: "Propuesta eliminada exitosamente",
          });
        }
      },
      async cargarPropuestas() {
        let url = config.URL_API + "/postulaciones";
        let payload = {};
        let response = await this.$axios.get(url, payload)
        let data = response.data
        if (data.ok == true) {
          console.log(data.info);
        }
        
        url = config.URL_API + "/avances";
        let response2 = await this.$axios.get(url, payload)
        let data2 = response2.data
        for(let i=0;i<data2.info.length;i++){
            this.avances.push(data2.info[i]);
        }
        //console.log('da2');
        //console.log(this.avances);
        for(let i=0;i<data.info.length;i++){
            if(data.info[i].id_usuario ==localStorage.getItem("id")){
                this.propuestas.push(data.info[i]);
            }
        }
        for(let i=0;i<this.propuestas.length;i++){
            let a = []
            for(let j=0;j<this.avances.length;j++){
                if(this.propuestas[i].id == this.avances[j].id_postulacion){
                    a.push(this.avances[j])
                } 
            }
            if(a.length > 0){
                
            }
        }
        console.log('da');
        console.log(this.propuestas);
        console.log('da3');
        console.log(this.prop_avan);
      },
    },
  }
</script>

<style scoped>
#container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-bottom: 10px;
  background: rgb(43, 67, 148);
}
.v-card__title{
  font-size: 15px;
}
.title{
  font-size: 1.25rem;
}
.theme--dark.v-btn{
  
  margin-bottom: 10px;
  background-color: #023E8A;
  border-color: #023E8A;
}
</style>