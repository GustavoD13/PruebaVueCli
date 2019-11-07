<template>
<div>
  <b-navbar variant="faded" type="light" class="border">
    <b-navbar-brand href="#">BootstrapVue</b-navbar-brand>
  </b-navbar>
  <div class="container">
  <div class="d-flex p-2 border mt-3">   
    <b-row>
    <b-col >
      <b-button-group size="sm">
        <b-button v-b-tooltip.hover title="Vista de lista"><font-awesome-icon icon="th" /></b-button>
        <b-button v-b-tooltip.hover title="Vista de tarjetas"><font-awesome-icon icon="th-list"/></b-button>
        <b-button v-b-tooltip.hover title="Descargar"><font-awesome-icon icon="file-pdf"/></b-button>
      </b-button-group>
    </b-col>
    <b-col > 
      <b-input-group size="sm" prepend="$">
    <b-form-input size="sm" v-b-tooltip.hover title="Ingresar Costo"></b-form-input>
    <b-input-group-append>
      <b-button v-b-tooltip.hover title="Editar"><font-awesome-icon icon="edit"/></b-button>
      <b-button v-b-tooltip.hover title="Guardar" v-on:click="obtengofecha()"><font-awesome-icon icon="save"/></b-button>
    </b-input-group-append>
  </b-input-group>
  </b-col>
  <b-col > 
    <b-input-group size="sm">
    <date-picker  v-model="fecha" :config="options"></date-picker>
    <b-input-group-append>
      <b-button v-b-tooltip.hover title="Buscar" v-on:click="obtengoMesAnio()"><font-awesome-icon icon="search"/></b-button>
      </b-input-group-append>
     </b-input-group>
  </b-col>
  </b-row>
  </div>
  <br>
    
    <!--<b-table striped hover :items="items"></b-table>-->
    <div class="mt-3">
    <b-card-group deck>
     <b-card v-for="item in items" :key="item.id" border-variant="info" header="Info" align="center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
     </b-card>
     </b-card-group>
     </div>
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
        }       
    }
   },
      components: {
      datePicker
    },
  created:function(){
     this.obtengoMesAnio()//this.fetchItems();
  },
  methods:{
    /*
   fetchItems()
    {
 let uri = 'http://localhost:3000/users';
      this.axios.get(uri).then((response) => {      
        this.items = response.data;
      }).catch(error => {
    throw new Error(error);
  })
    },
*/
    obtengoMesAnio: function () {
      const fecha= this.fecha;
     let uri = 'http://localhost:3000/users/'+fecha;
      this.axios.get(uri).then((response) => {      
        this.items = response.data;
      }).catch(error => {
    throw new Error(error);
                         })  
                              },    
    
}


  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.px-2 {
 width: 75%;
 align-self: center;
  margin-left: 20px !important;
  margin-right: 20px  !important;
  margin-top: 20px !important;
  margin-bottom: 20px  !important;
  

  
}
</style>
