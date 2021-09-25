<template>
    <div>
        <v-card>
            <v-form>
        <v-card-title primary-title> Lista de Retos </v-card-title>
        <v-card-text>
          
        </v-card-text>
        
      </v-form>
        </v-card>
        <Nuxt />
    </div>
</template>
<script>
export default {
    layout: 'example',
    data: () => ({
      items: [
        ['mdi-email', 'Inbox'],
        ['mdi-account-supervisor-circle', 'Supervisors'],
        ['mdi-clock-start', 'Clock-in'],
      ],
    }),
    methods: {

    }
  }
</script>

<style scoped>
.v-layout {
    color: black;
}
.theme--dark.v-card{
    background: #fcfcfc;
    color: black;
}
</style>