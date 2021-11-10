import config from "./config";

const comun = {
    methods: {
      verificarRol(){
        if(!localStorage.getItem("rol")=="Profesor"){
          this.$router.push("/");
        }
      },
        async cargarPagina() {
            let token = localStorage.getItem("token");
            if (token === "null" || token == null || token == undefined) {
              $nuxt.setLayout('example')
              if($nuxt.$route.name != "login" && $nuxt.$route.name != "singup" && $nuxt.$route.name != "innovacion" && $nuxt.$route.name != "index"){
                this.$router.push("/");
              }
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
            } catch (error) {
              console.log(error);
            }
          },
    }
}

export default comun