<template>
    <div>
        <v-card color="#0077B6">
            <v-form>
              <v-card-title class="title" primary-title> Tipos de Retos </v-card-title>
            </v-form>
            <v-row justify="space-around">
            <template v-for="(item) in tipo_retos">
              <v-card id="container" width="250" 
              :key="item.id">
                <v-card-title  primary-title>{{item.nombre}}</v-card-title>
                <v-card-text>
                  <b>Descripción: </b> {{item.descripcion}}
                </v-card-text>
                <v-btn @click="eliminarTipoReto(item.id)">Eliminar Tipo Reto</v-btn>
                <v-btn @click="editarTipoReto(item.id)">Editar Tipo Reto</v-btn>
              </v-card>
            </template>
            </v-row>
        </v-card>
    <p></p>
    <v-card id="card" max-width="500px">
      <v-form ref="formularioTipoReto">
        <v-card-title primary-title> Formulario Tipo de Reto </v-card-title>
        <v-card-subtitle>* Campo Obligatorio</v-card-subtitle>
        <v-card-text>
          <v-text-field
            color="white"
            v-model="titulo"
            :rules="requiredRule"
          ><template #label>
              <span class="red--text"><strong>* </strong></span>Nombre
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
          <v-btn color="success" @click="crearTipoReto()">Subir Información</v-btn>
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
      return {
        tipo_retos: [],
        descripcion: null,
        titulo: null,
        requiredRule: [(v) => !!v || "El campo es obligatorio"],
      }
    },
    beforeMount() {
      this.cargarPagina();
      this.cargarTipoRetos();
      if(localStorage.getItem("cargo")!="Administrador"){
          this.$router.push("/");
      }
    },
    methods: {
      async cargarTipoRetos() {
        let url = config.URL_API + "/tiporeto";
        let payload = {};
        let response = await this.$axios.get(url, payload)
        let data = response.data
        for(let i=0;i<data.info.length;i++){
          this.tipo_retos.push(data.info[i]);
        }
      },
      async eliminarTipoReto(id){
        let url = config.URL_API + "/tiporeto";
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
            title: "Tipo Reto Eliminado",
            text: "Tipo Reto eliminado exitosamente",
          });
        }
      },
      async editarTipoReto(id){
          try{
            if (!this.$refs.formularioTipoReto.validate()) {
                return;
            }
        let url = config.URL_API + "/tiporeto";
        let payload = {};
        payload.nombre = this.titulo
        payload.descripcion = this.descripcion
        payload.id = id
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
            title: "Tipo Reto Editado",
            text: "Tipo Reto editado exitosamente",
          });
        }}catch (error){
              this.$swal({
            type: "error",
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrido un error. No se ha podido conectar a API.",
        });
        console.log(error);
          }
      },
      async crearTipoReto(){
          try{
            if (!this.$refs.formularioTipoReto.validate()) {
                return;
            }
        let url = config.URL_API + "/tiporeto";
        let payload = {};
        payload.nombre = this.titulo
        payload.descripcion = this.descripcion
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
            title: "Tipo Reto Creado",
            text: "Tipo Reto creado exitosamente",
          })
        }
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