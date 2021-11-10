<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app height="70px">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />
      {{ nombre_usuario }}
      <v-btn id="sesion" @click="createReto()">Crear Reto</v-btn>
      <v-btn id="reto" @click="cerrarSesion()">Cerrar Sesión</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app height="30px">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import config from "../assets/js/config";

export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Inicio',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Qué es Innovación abierta',
          to: '/innovacion'
        }
      ],
      miniVariant: false,
      right: true,
      nombre_usuario: '', 
      title: 'Innovación Abierta'
    };
  },
  beforeMount() {
    this.nombre_usuario = localStorage.getItem("nombre_usuario") + " - " + localStorage.getItem("cargo")
    if(localStorage.getItem('cargo')== 'Administrador'){
      let a = {
        icon: 'mdi-chart-bubble',
          title: 'Verificar Retos',
          to: '/retos'
      }
      this.items.push(a)
      let b = {
        icon: 'mdi-chart-bubble',
          title: 'Tipos de Retos',
          to: '/tiporeto'
      }
      this.items.push(b)
    }else if(localStorage.getItem('cargo')=='Estudiante' || localStorage.getItem('cargo')=='Profesor'){
      let a = {
        icon: 'mdi-chart-bubble',
          title: 'Mis Propuestas',
          to: '/mispropuestas'
      }
      this.items.push(a)
    }
  },
  methods: {
    createReto() {
      this.$router.push('/createreto');
    },
    cerrarSesion(){
      localStorage.clear();
      this.$router.push("/login");
    }
  },
};
</script>
<style scoped>
#sesion{
  background-color:#023E8A;
  border-color: #023E8A;
  margin-left: 7.5px;
}
#reto{
  background-color: #48CAE4;
  border-color: #48CAE4;
  margin-left: 7.5px;
}
.theme--dark.v-application {
  background:#fcfcfc;
}
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #03045E;
}
.theme--dark.v-footer{
  background: #03045E;
}
.theme--dark.v-navigation-drawer{
  background: #023E8A;
}
</style>
