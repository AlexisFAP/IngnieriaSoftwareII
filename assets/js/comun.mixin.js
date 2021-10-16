import config from "./config";

const comun = {
    methods: {
        async cargarPagina() {
            let token = localStorage.getItem("token");
            if (token === "null" || token == null || token == undefined) {
              $nuxt.setLayout('example')
            } else {
              await this.validarToken(token);
            }
          },
          async validarToken(token) {
            try {
              let url = config.URL_API + "/validar-token?token=" + token;
              let respuesta = await this.$axios.get(url);
              console.log(respuesta);
              $nuxt.setLayout('default')
              if($nuxt.$route.name == 'login' || $nuxt.$route.name == 'singup'){
                this.$router.push("/");
              }
            } catch (error) {
              console.log(error);
            }
          },
    }
}

export default comun