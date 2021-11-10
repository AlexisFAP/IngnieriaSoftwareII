<template>
    <div>
      <v-card color="#0077B6"
              v-if="show">
        <v-form>
          <v-card-title class="title" primary-title> Mis Retos </v-card-title>
        </v-form>
        <v-row justify="space-around">
            <template v-for="(item) in mis_retos">
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
                <v-btn @click="editarReto(item.id)">Cambiar Estado</v-btn>
                <v-btn @click="verPropuestas(item.id)">Ver Propuestas</v-btn>
              </v-card>
            </template>
            </v-row>
      </v-card>
      <p></p>
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
                <v-btn @click="propuesta(item.id)">Proponer Propuesta</v-btn>
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
        url: '',
        items: [
        ['mdi-email', 'Inbox'],
        ['mdi-account-supervisor-circle', 'Supervisors'],
        ['mdi-clock-start', 'Clock-in'],
      ],
        retos: [],
        ids_retos: [],
        show: false,
        mis_retos: []
      }
    },
    beforeMount() {
      this.cargarPagina();
      this.cargarRetos();
      this.url = config.URL_API+'/';
      this.cargarMisRetos();
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
          if(data.info[i].estado != 'Pendiente'){
            this.retos.push(data.info[i]);
          }
        }
        console.log(this.mis_retos);
      },
      propuesta(index) {
        localStorage.setItem('id_reto', index)
        this.$router.push('/crearpropuesta');
      },
      tipoReto(num) {
        for(let i =0;i<this.ids_retos.length;i++){
          if(this.ids_retos[i].id == num){
            return this.ids_retos[i].nombre
          }
        }
      },
      async cargarMisRetos(){
        let url = config.URL_API + "/retos";
        let payload = {};
        let response = await this.$axios.get(url, payload)
        let data = response.data
        if (data.ok == true) {
          console.log(data.info);
        }
        for(let i=0;i<data.info.length;i++){
          if(localStorage.getItem('id') == data.info[i].id_usuario && data.info[i].estado != 'Pendiente'){
            this.mis_retos.push(data.info[i]);
          }
        }
        if(this.mis_retos.length > 0){
          this.show = true;
        }else{
          this.show = false;
        }
      },
      editarReto(index){
        localStorage.setItem('id_reto', index)
        this.$router.push('/updatereto');
      },
      verPropuestas(index){
        localStorage.setItem('id_reto', index)
        this.$router.push('/propuestas');
      }
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
  background-color: #02306b;
  border-color: #02306b;
}
</style>