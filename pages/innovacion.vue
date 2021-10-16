<template>
    <div>
        <v-card>
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
        <v-card>
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
        <v-card>
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
import comun from "../assets/js/comun.mixin"
export default {
  mixins:[comun],
    beforeMount() {
      this.cargarPagina();
    },
  }
</script>
<style scoped>
.theme--dark.v-card{
  margin: 10px 0;
  background-color:#0077B6
}
.v-card__subtitle, .v-card__text {
  font-size: 1.025rem;
}
</style>