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
      <b-button v-b-tooltip.hover title="Guardar"><font-awesome-icon icon="save"/></b-button>
    </b-input-group-append>
  </b-input-group></b-col>
  </b-row>

  </div>

 

  <br>

    <b-table striped hover :items="items"></b-table>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
       data(){
    return{
      items: []
    }
  },
  created:function(){
     this.fetchItems();
  },
  methods:{

    
   fetchItems()
    {
 let uri = 'http://localhost:3000/users';
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
