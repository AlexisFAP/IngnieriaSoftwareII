<template>
    <div>
        <v-card color="#0077B6">
            <v-form>
                <v-card-title primary-title> Qué es un Reto </v-card-title>
                <v-card-text>
                    Un reto en Ideágora es básicamente un proyecto propuesto 
                    por un usuario que tenga un rol de profesor o entidad, estos 
                    retos son la esencia en si para el inicio de un proyecto 
                    entre un retador y un solucionador, permitiendo que los 
                    solucionadores tengan la posibilidad de participar y ejecutar 
                    proyectos y los retadores puedan tener múltiples soluciones y 
                    escoger entre ellas una que haya seleccionado como ganadora.<br><br>
                    Estos retos a simple vista ya poseen características que permiten al 
                    usuario saber como deberá iniciar y cuales son sus límites, de esta 
                    manera cada usuario que quiera ser el solucionador de un reto sabrá 
                    desde el comienzo si es capaz de proponer una solución al reto.
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