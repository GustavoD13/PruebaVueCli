<template>
<div class="container">
  <header>
    <!-- Header content -->
  </header>

  <nav>
    <!-- Navigation -->
    <b-card-body class=" mb-5 shadow-lg rounded">
      <b-card-title>Altea II</b-card-title>
      <b-card-sub-title class="mb-2">Domicilio: </b-card-sub-title>
      <b-card-text>
        Isabel La Catolica 1078
      </b-card-text>
    </b-card-body>

    <b-list-group flush class=" mb-5 shadow-lg rounded">
      <b-list-group-item>Dia Facturacion: 12 </b-list-group-item>
      <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
      <b-list-group-item>Vestibulum at eros</b-list-group-item>
    </b-list-group>
  </nav>

  <main>
    <!-- Main content -->
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
    </b-row>
  <div class="mt-3" v-if ="mostrar">
    <b-table striped hover :items="items" class="border"></b-table>
   </div>
   <div class="mt-3" v-else>
    <b-card-group deck  v-for="row in formattedItems" :key="row.id">
    <b-card v-for="item in row" :key="item.id" border-variant="info" :header="item.unidad" align="center" class="m-1 font-italic"> 
   <!--   <b-card v-for="item in row" :key="item.id" border-variant="info" :header="item.unidad" align="center" class="card">-->
   <b-card-text class="text-left text-monospace">
       Consumo: {{item.consumo}} Kw
       Porcentaje: {{item.porcentaje}}
       Costo: {{item.costo}}
  </b-card-text>
     </b-card>
    </b-card-group>
     </div> 

  </main>

  <aside>
    <!-- Sidebar / Ads -->
    <b-card header="Consumo Total" bg-variant="secondary" text-variant="white" class=" mb-5 shadow-lg rounded">
      <blockquote class="card-blockquote">
        <h4 class="mb-0">{{this.consumoTotal}}</h4>
      </blockquote>
    </b-card>
    <b-card header="Importe" bg-variant="bg-light" text-variant="text-dark" class=" mb-5 shadow-lg rounded border">
      <blockquote class="card-blockquote">
        <h4 class="mb-0">{{this.importe}}</h4>
      </blockquote>
    </b-card>
    <b-card header="Consumo Promedio" bg-variant="info" text-variant="white" class=" mb-5 shadow-lg rounded">
      <blockquote class="card-blockquote">
        <h4 class="mb-0">{{this.promedio}}</h4>
      </blockquote>
    </b-card>
  </aside>

  <footer>
    <!-- Footer content -->
  </footer>
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
      const baseUrl = process.env.baseURL || "http://localhost:3000";
     let uri = baseUrl+'/users/'+fecha;
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
              if (i % 4 === 0) c.push([]);
              c[c.length - 1].push(n);
              return c;
          }, []);
      } 
  }

  }

</script>

<style scoped lang="scss">

.container {
  display: grid;

  grid-template-areas:
    "header header header"
    "nav content side"
    "footer footer footer";

  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;
  height: 100vh;
  border-color: black;
}

header {
  grid-area: header;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  grid-area: nav;
  margin-left: 0.5rem;
  margin-right: 1rem;
  margin-top:5rem;
}

main {
  grid-area: content;
  
}

aside {
  grid-area: side;
  margin-right: 0.5rem;
  margin-left: 1rem;
  margin-top:10rem;
}

footer {
  grid-area: footer;
  background-color: beige;
}

@media (max-width: 768px) {
  .container {
    grid-template-areas:
      "header"
      "nav"
      "content"
      "side"
      "footer";

    grid-template-columns: 1fr;
    grid-template-rows:
      auto /* Header */
      minmax(75px, auto) /* Nav */
      1fr /* Content */
      minmax(75px, auto) /* Sidebar */
      auto; /* Footer */
  }

  nav, aside {
    margin: 0;
  }
}
 



</style>