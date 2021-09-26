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

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div>
        <v-btn id="singup" @click="singUp()">Registrar</v-btn>
        <v-btn id="login" @click="logIn()">Iniciar Sesión</v-btn>
      </div>
      
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>
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
          title: 'Qué es TRL',
          to: '/trl'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Qué es Innovación abierta',
          to: '/innovacion'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Qué es un Reto',
          to: '/reto'
        }
      ],
      miniVariant: false,
      right: true,
      title: 'Ideagora - Innovación Abierta'
    }
  },
  methods: {
    singUp(){
      this.$router.push('/singup');
    },
    logIn(){
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
#singup{
  background-color:#023E8A;
  border-color: #023E8A;
  margin-right: 3px;
}
#login{
  background-color: #48CAE4;
  border-color: #48CAE4;
  margin-left: 3px;
}
h1 {
  font-size: 20px;
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
