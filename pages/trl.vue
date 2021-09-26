<template>
    <div>
        <v-card color="#0077B6">
            <v-form>
        <v-card-title primary-title> Qué es TRL </v-card-title>
        <v-card-text>
          Es un método para medir el grado de madurez de una tecnología, 
          y este mismo método ayuda a saber mejor cual es el potencial de 
          innovación de la tecnología usada. Este método se emplea principalmente en 2 rutas, 
          una creada por la NASA y otro por la Unión Europea, igualmente es valido usar 
          cualquiera de los dos rutas y cada ruta usa un total 9 pasos a seguir para saber 
          el grado de madurez de la tecnología analizada.
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