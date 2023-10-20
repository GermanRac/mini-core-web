<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="contenedor">
      <label>Fecha Inicio</label>
      <el-date-picker v-model="startDate" class="datePicker" format="DD/MM/YYYY" value-format="DD/MM/YYYY" type="date"
        placeholder="Fecha Inicio"></el-date-picker>

      <label>Fecha Final</label>
      <el-date-picker v-model="endDate" class="datePicker" format="DD/MM/YYYY" value-format="DD/MM/YYYY" type="date"
        placeholder="Fecha Fin"></el-date-picker>

      <button @click="handleClick">Filtrar</button>
    </div>

    <div v-for="(res, index) in result" :key="index">
      <label> Vendedor: {{ res.Vendedor }}</label>
      <label> Monto vendido: {{ res.CuotaMonto }}</label>
    </div>

  </div>
</template>

<script>

import { getUsers, getSells } from '../Controllers/Methods.js';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      users: [],
      sells: [],
      result: [],
    }
  },
  async mounted() {
    this.users = await getUsers();
    this.sells = await getSells();

    console.log("this.users: ", this.users);
    console.log("this.sells: ", this.sells);
  },
  methods: {
    handleClick() {
      console.log("Fechas: I: ", this.startDate, " | F: ", this.endDate);

      let ventasEnRango = [];
      this.sells.forEach((sell) => {
        console.log("venta foreach: ", sell);
        if (this.isInTheDateRange(this.startDate, this.endDate, sell.FechaVenta)) {
          ventasEnRango.push(sell);
        }
      });

      console.log("ventasEnRango: ", ventasEnRango);

      console.log("this.result antes: ", ventasEnRango);
      let resultAux = this.sumarCuotasMonto(ventasEnRango);

      console.log("this.result después: ", resultAux);

      this.result = this.reemplazarVendedorPorNombre(resultAux, this.users);
    },
    reemplazarVendedorPorNombre(sells, users) {
      sells.forEach(sell => {
        const vendedorId = sell.Vendedor;
        const usuario = users.find(user => user.id === vendedorId);

        if (usuario) {
          sell.Vendedor = usuario.Nombre;
        }
      });

      return sells;
    },
    sumarCuotasMonto(listaObjetos) {
      const resultado = [];
      const vendedores = {};

      listaObjetos.forEach(objeto => {
        const vendedor = objeto.Vendedor;
        const cuotaMonto = parseFloat(objeto.CuotaMonto);

        if (!isNaN(cuotaMonto)) {
          if (vendedor in vendedores) {
            vendedores[vendedor] += cuotaMonto;
          } else {
            vendedores[vendedor] = cuotaMonto;
          }
        }
      });

      for (const vendedor in vendedores) {
        resultado.push({ Vendedor: vendedor, CuotaMonto: vendedores[vendedor] });
      }

      return resultado;
    },
    isInTheDateRange(fechaInicial, fechaFinal, fecha) {
      try {
        // Extraer día, mes y año de las fechas
        const [diaInicial, mesInicial, anioInicial] = fechaInicial.split("/");
        const [diaFinal, mesFinal, anioFinal] = fechaFinal.split("/");
        const [dia, mes, anio] = fecha.split("/");

        // Crear objetos de fecha en el formato correcto (mes - 1 porque los meses en JavaScript son base 0)
        const fechaInicialObj = new Date(anioInicial, mesInicial - 1, diaInicial);
        const fechaFinalObj = new Date(anioFinal, mesFinal - 1, diaFinal);
        const fechaObj = new Date(anio, mes - 1, dia);

        return fechaObj >= fechaInicialObj && fechaObj <= fechaFinalObj;
      } catch (error) {
        console.error("isInTheDateRange error: ", error);
        return false;

      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
