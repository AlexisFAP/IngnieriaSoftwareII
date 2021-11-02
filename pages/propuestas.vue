<template>
    <div>
        <v-card color="#0077B6">
            <v-form>
              <v-card-title class="title" primary-title> Lista de Propuestas </v-card-title>
            </v-form>
            <v-row justify="space-around">
            <template v-for="(item) in propuestas">
              <v-card id="container" width="250" 
              :key="item.id">
                <v-card-title  primary-title> {{item.titulo}}</v-card-title>
                <v-card-text>
                  <b>Descripción: </b> {{item.descripcion}}
                </v-card-text>
              </v-card>
            </template>
            </v-row>
            <!-- ></!-->
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
      }
    },
    beforeMount() {
      this.cargarPagina();
      this.cargarPropuestas();
      this.verificarRol();
    },
    methods: {
      async cargarPropuestas() {
        let url = config.URL_API + "/postulaciones";
        let payload = {};
        let response = await this.$axios.get(url, payload)
        let data = response.data
        if (data.ok == true) {
          console.log(data.info);
        }
        for(let i=0;i<data.info.length;i++){
            if(data.info[i].id_reto == localStorage.getItem('id_reto')){
                this.propuestas.push(data.info[i]);
            }
        }
      },
    },
  }
</script>

<style scoped>
#container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-bottom: 10px;
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