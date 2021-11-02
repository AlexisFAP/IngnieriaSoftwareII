<template>
    <div>
        <v-card color="#0077B6">
            <v-form>
              <v-card-title class="title" primary-title> Lista de Retos </v-card-title>
            </v-form>
            <v-row justify="space-around">
            <template v-for="(item) in retos">
              <v-card id="container" width="250" 
              :key="item.id">
                <v-img
                  lazy-src="https://innovacioningsoftii.herokuapp.com/files/imagen.jpg"
                   max-height="100"
                  max-width="250"
                  src="https://innovacioningsoftii.herokuapp.com/files/descarga.jpg"
                ></v-img>
                <v-card-title  primary-title> {{item.problema}}</v-card-title>
                <v-card-text >
                  <div v-if="item.id_tipo_reto!=null"><b>Tipo Reto: </b> {{tipoReto(item.id_tipo_reto)}}</div>
                </v-card-text>
                <v-card-text>
                  <b>Abierto: </b> {{item.fecha}}
                </v-card-text>
                <v-card-text>
                  <b>Premio: </b> {{item.premio}}
                </v-card-text>
                <v-card-text>
                  <b>Estado: </b> {{item.estado}}
                </v-card-text>
                <v-btn @click="aceptarReto(item.id)">Aceptar Reto</v-btn>
                <v-btn @click="rechazarReto(item.id)">Rechazar Reto</v-btn>
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
        retos: [],
        ids_retos: [],
      }
    },
    beforeMount() {
      this.cargarPagina();
      this.cargarRetos();
    },
    methods: {
      async cargarRetos() {
        let url = config.URL_API + "/retos";
        let payload = {};
        let response = await this.$axios.get(url, payload)
        let data = response.data
        if (data.ok == true) {
          console.log(data.info);
        }
        url = config.URL_API + "/tiporeto";
        payload = {};
        let response2 = await this.$axios.get(url, payload)
        let data2 = response2.data
        for(let i=0;i<data2.info.length;i++){
          this.ids_retos.push(data2.info[i]);
        }
        for(let i=0;i<data.info.length;i++){
          this.retos.push(data.info[i]);
        }
        console.log(this.mis_retos);
      },
      async aceptarReto(index) {
        let url = config.URL_API + "/retos";
        let payload = {};
        payload.estado = 'En Proceso';
        payload.id = index
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
            title: "Reto Aceptado",
            text: "Reto aceptado exitosamente",
          }).then((result) =>{
            if(!result.isConfirmed){
              this.$router.push("/retos");
            }
          });
        }
      },
      async rechazarReto(index) {
        let url = config.URL_API + "/retos";
        let payload = {};
        payload.id = index
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
            title: "Reto Rechazado",
            text: "Reto rechazado exitosamente",
          }).then((result) =>{
            if(!result.isConfirmed){
              this.$router.push("/retos");
            }
          });
        }
      },
      tipoReto(num) {
        if(num == 1){
          return 'Ideación'
        }
        if(num == 2){
          return 'Tipo reto 2'
        }
        if(num == 3){
          return 'Tipo reto 3'
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