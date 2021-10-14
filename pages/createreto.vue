<template>
  <div>
    <v-card>
      <v-form ref="formularioReto">
        <v-card-title primary-title> Crear Reto </v-card-title>
        <v-card-text>
          <v-text-field
            label="Dependencia" color="white"
            v-model="dependencia"
            :rules="requiredRule"
          ></v-text-field>
          <v-text-field
            label="Problema" color="white"
            v-model="problema"
            :rules="requiredRule"
          ></v-text-field>
          <v-textarea
            label="Antecedentes" color="white"
            v-model="antecedentes"
            :rules="requiredRule"
          ></v-textarea>
          <v-text-field
            label="Interesados" color="white"
            v-model="interesados"
            :rules="requiredRule"
          ></v-text-field>
           <v-select
            :items="tipors"
            v-model="tipor"
            label="Tipo de Reto" color="white"
            :rules="requiredRule"
          ></v-select>
          <v-textarea
            label="Impacto Esperado" color="white"
            v-model="impacto_esperado"
            :rules="requiredRule"
          ></v-textarea>
          <v-file-input
            v-model="file"
            placeholder="Subir Archivo"
            label="Subir Archivo"
            prepend-icon="mdi-archive">
          </v-file-input>
          <v-text-field
            label="Premio" color="white"
            v-model="premio"
            :rules="requiredRule"
          ></v-text-field>
          <v-row justify="center">
            <v-date-picker color="blue light" header-color="primary" v-model="fecha"></v-date-picker>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="createReto()">Crear Reto</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import config from "../assets/js/config";
export default {
  data() {
    return{
        id: null,
        id_usuario: null,
        dependencia: null,
        problema: null,
        antecedentes: null,
        interesados: null,
        id_tipo: null,
        tipor: null,
        tipors: ['Ideación', 'Tipo reto 2', 'Tipo reto 3'],
        impacto_esperado: null,
        portada: null,
        requiredRule: [(v) => !!v || "El campo es obligatorio"],
        premio: null,
        fecha: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        file: null,
    };
  },
  methods: {
      onFileSelected(event) {
        this.portada = event.target.files[0]
      },
      subirArchivo(){
        let InstFormData = new FormData();
        InstFormData.append('file' , this.file);
        let url = config.URL_API + "/upload";
        let response = this.$axios.post(url, InstFormData , {headers : {'content-type': 'multipart/form-data'}})
        console.log(response);
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
        payload.id = parseInt(this.id);
        payload.id_usuario = localStorage.getItem("id");
        payload.dependencia = this.dependencia
        payload.problema = this.problema;
        payload.antecedentes = this.antecedentes;
        payload.interesados = this.interesados;
        switch (this.tipor) {
            case 'Ideación':
                this.id_tipo = '1';
                break;
            case 'Tipo reto 2':
                this.id_tipo = '2';
                break;
            case 'Tipo reto 3':
                this.id_tipo = '3';
                break;
        }
        payload.id_tipo_reto = this.id_tipo;
        payload.impacto_esperado = this.impacto_esperado;
        payload.portada = this.portada;
        payload.premio = this.premio;
        payload.fecha = this.fecha;
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
.theme--dark.v-card {
  background-color: #0077B6;
}
.theme--dark.success {
  background-color: #90E0EF !important;
  border-color: #90E0EF !important;
}
</style>