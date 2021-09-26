<template>
    <div>
        <v-card color="#0077B6">
            <v-form>
                <v-card-title primary-title> Qué es Innovación Abierta </v-card-title>
                <v-card-text>
                    Es un módulo de Ideágora encargado de administrar los retos y propuestas 
                    asociadas a los retos que los usuarios de Ideágora formulan y hacen.
                    Este modulo principalmente tiene la función de filtro para que los retos 
                    propuestos por profesores o entidades tengan la posibilidad de ver posibles 
                    soluciones a sus retos hechas por usuarios y estas propuestas de solución 
                    quede entre el retador y el solucionador.<br><br>

                    Posteriormente otro módulo que es jupiter se encarga de la ejecución de estas propuestas de solución.
                </v-card-text>
            </v-form>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
      return {
        naume_layot: '',
      }  
    },
    beforeMount() {
      this.cargarPagina();
    },
    methods: {
      async cargarPagina() {
        this.nombre_usuario = localStorage.getItem("nombre_usuario");
        let token = localStorage.getItem("token");
        if (token === "null" || token == null || token == undefined) {
          this.name_layout = 'example'
          $nuxt.setLayout('example')
        } else {
          await this.validarToken(token);
        }
      },
      async validarToken(token) {
        try {
          let url = config.URL_API + "/validar-token/" + token;
          let respuesta = await this.$axios.get(url);
          console.log(respuesta);
          this.name_layout = 'default';
          $nuxt.setLayout('default')
        } catch (error) {
        }
      },
    },
  }
</script>

<style scoped>
.v-card__subtitle, .v-card__text {
  font-size: 1.025rem;
}
</style>