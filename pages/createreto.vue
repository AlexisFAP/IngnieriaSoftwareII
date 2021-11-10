<template>
  <div>
    <v-card id="card" max-width="600px">
      <v-form ref="formularioReto">
        <v-card-title primary-title> Crear Reto </v-card-title>
        <v-card-subtitle>* Campo Obligatorio</v-card-subtitle>
        <v-card-text>
          <v-text-field
          color="white"
            v-model="dependencia"
            :rules="requiredRule"
          > <template #label>
              <span class="red--text"><strong>* </strong></span>Dependencia
            </template>
          </v-text-field>
          <v-text-field
          color="white"
            v-model="problema"
            :rules="requiredRule"
          > <template #label>
              <span class="red--text"><strong>* </strong></span>Problema
            </template>
          </v-text-field>
          <v-textarea
          color="white"
            v-model="antecedentes"
            :rules="requiredRule"
            rows="3"
          > <template #label>
              <span class="red--text"><strong>* </strong></span>Antecedentes
            </template>
          </v-textarea>
          <v-text-field
          color="white"
            v-model="interesados"
            :rules="requiredRule"
          > <template #label>
              <span class="red--text"><strong>* </strong></span>Interesados
            </template>
          </v-text-field>
           <v-select
           color="white"
            :items="tipors"
            v-model="tipor"
            :rules="requiredRule"
            item-text="nombre"
            item-value="id"
          ><template #label>
              <span class="red--text"><strong>* </strong></span>Tipo Reto
            </template>
          </v-select>
            <template #label>
              <span class="red--text"><strong>* </strong></span>Tipo de Reto
            </template>
          <v-textarea
            color="white"
            v-model="impacto_esperado"
            :rules="requiredRule"
            rows="3"
          > <template #label>
              <span class="red--text"><strong>* </strong></span>Impacto Esperado
            </template>
          </v-textarea>
          <v-file-input
            v-model="file"
            placeholder="Subir Archivo"
            color="white"
            prepend-icon="mdi-archive">
            <template #label>
              <span class="red--text"><strong>* </strong></span>Subir Archivo
            </template>
          </v-file-input>
          <v-text-field
           color="white"
            v-model="premio"
            :rules="requiredRule"
          > <template #label>
              <span class="red--text"><strong>* </strong></span>Premio
            </template>
          </v-text-field>
          <v-row justify="center">
            <v-date-picker color="blue light" header-color="primary" v-model="fecha"></v-date-picker>
          </v-row>
        </v-card-text>
        <v-card-actions id="a">
          <v-btn color="success" @click="createReto()">Crear Reto</v-btn>
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
        id_usuario: null,
        dependencia: null,
        problema: null,
        antecedentes: null,
        interesados: null,
        id_tipo: null,
        tipor: null,
        tipors: [],
        impacto_esperado: null,
        portada: null,
        requiredRule: [(v) => !!v || "El campo es obligatorio"],
        premio: null,
        fecha: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        file: null,
    };
  },
  beforeMount(){
    this.cargarPagina();
    this.verificarRol();
    this.cargarTipoRetos();
  },
  methods: {
      async subirArchivo(){
        let InstFormData = new FormData();
        InstFormData.append('file' , this.file);
        this.portada = this.file.name;
        let url = config.URL_API + "/upload";
        let response = this.$axios.post(url, InstFormData , {headers : {'content-type': 'multipart/form-data',token:localStorage.getItem("token")}})
        console.log(response);
      },
      verificarRol(){
        if(localStorage.getItem("cargo") != "Profesor"){
          this.$router.push("/");
        }
      },
      async cargarTipoRetos(){
        let url =config.URL_API + "/tiporeto";
        let payload = {}
        let response = await this.$axios.get(url, payload)
        let data = response.data
        for(let i=0;i<data.info.length;i++){
          this.tipors.push(data.info[i]);
        }
        console.log("fa");
        console.log(this.tipors);
      },
      async createReto() {
        this.subirArchivo();
        console.log("fecha buena "+ this.fecha);
        try{
            if (!this.$refs.formularioReto.validate()) {
                return;
            }
        let url = config.URL_API + "/retos";
        let payload = {};
        payload.id_usuario = localStorage.getItem("id");
        payload.dependencia = this.dependencia
        payload.problema = this.problema;
        payload.antecedentes = this.antecedentes;
        payload.interesados = this.interesados;
        payload.id_tipo_reto = this.tipor;
        payload.impacto_esperado = this.impacto_esperado;
        payload.portada = this.portada;
        payload.premio = this.premio;
        payload.fecha = this.fecha;
        payload.estado = 'Pendiente';
        console.log("fecha buena 2"+ this.fecha);
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
            title: "Reto Creado",
            text: "Reto creado exitosamente",
          })
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
#card{
  margin: 0 auto;
}
#a{
  justify-content: center;
}
.theme--dark.v-card {
  background-color: #0077B6;
}
.theme--dark.success {
  background-color: rgb(115, 204, 219) !important;
  border-color: rgb(115, 204, 219) !important;
}
</style>