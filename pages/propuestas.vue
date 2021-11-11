<template>
    <div>
        <v-card color="#0077B6">
            <v-form>
              <v-card-title class="title" primary-title> Lista de Propuestas </v-card-title>
            </v-form>
            <v-row justify="space-around">
            <template v-for="(item) in prop_avan">
              <v-card id="container" width="420" 
              :key="item.id">
                <v-card-title  primary-title> {{item[0].titulo}}</v-card-title>
                <v-card-text>
                  <b>Descripción: </b> {{item[0].descripcion}}
                </v-card-text>
                <v-card-subtitle>Avance 1 - <b>Título: </b> {{item[1].titulo}}</v-card-subtitle>
                <v-card-text>
                  <b>Descripción: </b> {{item[1].descripcion}}
                </v-card-text>
                <v-card-text>
                  <b>Fecha: </b> {{item[1].fecha}}
                </v-card-text>
                <v-card-subtitle>Avance 2 - <b>Título: </b> {{item[2].descripcion}}</v-card-subtitle>
                <v-card-text>
                  <b>Descripción: </b> {{item[2].descripcion}}
                </v-card-text>
                <v-card-text>
                  <b>Fecha: </b> {{item[2].fecha}}
                </v-card-text>
                <v-card-subtitle>Avance 3 - <b>Título: </b> {{item[3].descripcion}}</v-card-subtitle>
                <v-card-text>
                  <b>Descripción: </b> {{item[3].descripcion}}
                </v-card-text>
                <v-card-text>
                  <b>Fecha: </b> {{item[3].fecha}}
                </v-card-text>
                <v-btn @click="eliminarPropuesta(item[0].id)">Eliminar Propuesta</v-btn>
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
      this.verificarPropuesta();
    },
    methods: {
      async verificarPropuesta(){
        let url = config.URL_API + "/retos";
        let payload = {};
        let response = await this.$axios.get(url, payload)
        let data = response.data
        let a = false
        console.log("da2");
        console.log(data.info);
        for(let i=0;i<data.info.length;i++){
          if(data.info[i].id_usuario == localStorage.getItem("id")){
            a = true;
          }
        }
        console.log(a);
        if(a == false){
          this.$router.push("/");
        }
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
        for(let i=0;i<data.info.length;i++){
            if(data.info[i].id_reto == localStorage.getItem('id_reto')){
              this.propuestas.push(data.info[i]);
            }
        }
        for(let i=0;i<this.propuestas.length;i++){
            let a = []
            let b  = {}
            a.push(this.propuestas[i])
            b.propuesta = this.propuestas[i];
            for(let j=0;j<this.avances.length;j++){
                if(this.propuestas[i].id == this.avances[j].id_postulacion){
                    a.push(this.avances[j])
                    b.avance = this.avances[j]
                } 
            }
            this.prop_avan.push(a)
        }
      },
    },
  }
</script>

<style scoped>
#container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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