<template>
<!--<div class="display: grid border">-->
  <div class="grid-container ">
 <!-- <div class="container border-secondary">-->
   <div class="main">
  <div class="d-flex p-2 border mt-3">   
    <b-row>
    <b-col > 
      <b-input-group size="sm" prepend="$">
    <b-form-input size="sm" v-model="importe" v-b-tooltip.hover title="Ingresar Costo"></b-form-input>
    <b-input-group-append>
      <b-button v-b-tooltip.hover title="Guardar" ><font-awesome-icon icon="arrow-circle-right"/></b-button>
    </b-input-group-append>
  </b-input-group>
  </b-col>
  <b-col> 
    <b-input-group size="sm">
    <date-picker  v-model="fecha" :config="options"></date-picker>
    <b-input-group-append>
      <b-button v-b-tooltip.hover title="Buscar" v-on:click="obtengoMesAnio()"><font-awesome-icon icon="search"/></b-button>
      <b-button v-b-tooltip.hover :title="tooltip" v-on:click="cambiarVista()"><font-awesome-icon :icon="miIcon"/></b-button>
      <b-button v-b-tooltip.hover title="Descargar" ><font-awesome-icon icon="file-pdf"/></b-button>
    </b-input-group-append>
     </b-input-group>
  </b-col>
  
    <b-col > 
    ConsumoTotal: {{this.consumoTotal}}
    </b-col>
     <b-col > 
    Importe: {{this.importe}}
    </b-col>
    <b-col > 
    Promedio: {{this.promedio}}
    </b-col>
  </b-row>
  </div>
  <br>
    <div class="mt-3" v-if ="mostrar">
    <b-table striped hover :items="items" class="border"></b-table>
   </div>
   <div class="mt-3" v-else>
    <b-card-group deck  v-for="row in formattedItems" :key="row.id">
    <b-card v-for="item in row" :key="item.id" border-variant="info" :header="item.unidad" align="center" class="m-1"> 
   <!--   <b-card v-for="item in row" :key="item.id" border-variant="info" :header="item.unidad" align="center" class="card">-->
        <b-card-text>

    <b-list-group >
      <b-list-group-item>Medidor: {{item.medidor}}</b-list-group-item>
      <b-list-group-item>Consumo: {{item.consumo}}</b-list-group-item>
      <b-list-group-item>Porcentaje: {{item.porcentaje}}</b-list-group-item>
      <b-list-group-item>Costo: {{item.costo}}</b-list-group-item>
    </b-list-group>
 </b-card-text>
     </b-card>
    </b-card-group>
     </div> 
    </div>
  
  <div class="sidenav">

  </div>

  </div>

</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
export default {
  name: 'HelloWorld',
       data(){
    return{
      items: [],
      fecha:  new Date().getMonth()+1 +'-'+new Date().getFullYear(),
        options: {
          format: 'MM-YYYY',
          useCurrent: false,
        },
       mostrar:false,
       miIcon:'th-list',
       tooltip:'Cambiar a Vista de Lista',
       importe:0,
       consumoTotal:0,
       promedio:0
    }
   },
   components: {
      datePicker
    },
  created:function(){
     this.obtengoMesAnio()//this.fetchItems();

  },
  methods:{
    obtengoMesAnio: function () {
      const fecha= this.fecha;
     let uri = 'http://localhost:3000/users/'+fecha;
      this.axios.get(uri).then((response) => {      
        this.items = response.data;
           this.obtenerConsumoTotal();
           this.obtenerConsumoPromedio();
      }).catch(error => {
    throw new Error(error);
    })  
      
  },
      cambiarVista: function(){        
         this.mostrar =!this.mostrar;
       if(this.mostrar === true){
          this.miIcon='th';
          this.tooltip='Cambiar a Vista de Cuadros';
        }
        else {
          this.miIcon='th-list';
          this.tooltip='Cambiar a Vista de Lista';
        }

    } ,
    obtenerConsumoTotal: function () {
                  var total= this.items.reduce((acc, item) => acc + item.consumo, 0)
                  this.consumoTotal = total;
                } 
    ,
    obtenerConsumoPromedio: function () {
                  let count = this.items.length;
                  var total= this.items.reduce((acc, item) => acc += item.consumo, 0)
                  this.promedio = (total/= count);
                }            


},
computed: {
      formattedItems() {
          return this.items.reduce((c, n, i) => {
              if (i % 6 === 0) c.push([]);
              c[c.length - 1].push(n);
              return c;
          }, []);
      } 
  }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas:
    "sidenav header"
    "sidenav main"
    "sidenav footer";
  height: 100vh;
  border: 2px solid #201d1d
}

.header {
  grid-area: header;
  background-color: #648ca6;
}

.sidenav {
  grid-area: sidenav;
  background-color: #394263;
}

.main {
  grid-area: main;
  margin: 5px;
  border: 2px solid #bd2121;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 5px;
  
}

.footer {
  grid-area: footer;
  background-color: #648ca6;
}
.px-2 {
 width: 75%;
 align-self: center;
  margin-left: 20px !important;
  margin-right: 20px  !important;
  margin-top: 20px !important;
  margin-bottom: 20px  !important;
   
}
 /*.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    background-color: #82bef6;
    margin: 50px;
    -webkit-column-break-inside: avoid;
    padding: 24px;
    box-sizing: border-box;
    border: 2px solid #e7e7e7;
    border-radius: 4px;
    padding: .5rem;
  }*/

 .card {
    max-width: 250px;
    max-height: 300px;
}
</style>
