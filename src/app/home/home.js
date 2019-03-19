// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(process);
const Photon = require("electron-photon");
// Lop Photon instance
const { net } = require('electron').remote;

var logOut = document.getElementById('logout');
const Store = require('electron-store');
const store = new Store();

const token = sessionStorage.getItem('token');
var infiniteScroll =  require('vue-infinite-scroll');

//productosBotton.addEventListener('click', getProductos);
var productosVue = new Vue({
    directives: {infiniteScroll},
    el: '#producto-list',
    data: {
      object: [],
      content: [],
      token:token,
      actualPage: 0,
      busy: false
    },
    methods: {
        //getProductos: getProductos(this.actualPage, 20),
        getProductosMateriales: getProductosMateriales,
        loadMore: function(){
            this.busy = true;
            if(!this.object.last)
                getProductos(this.actualPage++, 2);
            this.busy = false;
        }
    }
  })

  //For ProductoMaterial
  var productoMaterialVue = new Vue({
    el: '#producto-material-list',
    data: {
      object: null,
      content: [],
      token:token,
      productoId: '',
    },
    methods: {
        getProductosMateriales: getProductosMateriales
    }
  })
  

function logout(){
    
    sessionStorage.clear();
    store.delete('token');
    store.delete('nombre');

    window.location.replace('../login/login.html');
            
}


//getProductos('0', '20');

function getProductos(page, size){
    const request = net.request({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        protocol: 'http:',
        hostname: 'localhost',
        port: 8080,
        path: '/api/productos/all?page='+page+'&size='+size,
    })
       
    request.on('response', (response) => {
        console.log(response.statusCode);
        if (response.statusCode != 200) {
            console.log(response.statusMessage);
            alert("Error de Red");
        }else{
            var body = JSON.parse(new TextDecoder('utf-8').decode(response.data[0]))
        
            console.log(body);
            productosVue.object = body;
            body.content.forEach(e => {
                productosVue.content.push(e); 
            });
            
            console.log(body.content);
             
            
        }
        
        response.on('error', (error) => {
            console.log(`ERROR: ${JSON.stringify(error)}`)
        })
        
    })
    request.end();
}

function getProductosMateriales(productoId,page,size){

    if (productoId == null) {
        return;
    }
    const request = net.request({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        protocol: 'http:',
        hostname: 'localhost',
        port: 8080,
        path: '/api/productoMaterial/all?productoId='+productoId+'&page='+page+'&size='+size,
    })
       
    request.on('response', (response) => {
        console.log(response.statusCode);
        if (response.statusCode != 200) {
            alert("Error de Red");
        }else{
            var body = JSON.parse(new TextDecoder('utf-8').decode(response.data[0]))
        
            console.log(body);
            productoMaterialVue.object = body;
            productoMaterialVue.productoId = productoId;
            
        }
        
        
        
        
        response.on('error', (error) => {
            console.log(`ERROR: ${JSON.stringify(error)}`)
        })
        
    })
    request.end();
}

logOut.addEventListener('click', logout);

function addProducto() {
    const files = document.querySelector('[id=productoImg]').files;
    const formData = new FormData();
    const file = files[0];
    formData.append('file', file);
    var email = document.getElementById('email');
    var password = document.getElementById('password');

    if (!email.checkValidity()) {
        alert('Ingrese un email válido')
        return;
    }
    if (!password.checkValidity()) {
        alert('Ingrese una contraseña válida')
    }
    
    
    const request = net.request({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        protocol: 'http:',
        hostname: 'localhost',
        port: 8080,
        path: '/api/usuario/login',
    })
       
    request.on('response', (response) => {
        console.log(response.statusCode);
        if (response.statusCode != 200) {
            alert("Email o contraseña inválida")
        }
        
        var body = JSON.parse(new TextDecoder('utf-8').decode(response.data[0]))
        
        sessionStorage.setItem('token', body.token);
        sessionStorage.setItem('nombre', body.nombre);

        
        
        
        response.on('error', (error) => {
            console.log(`ERROR: ${JSON.stringify(error)}`)
        })
        
    })
    request.end(JSON.stringify({email:email.value, password: password.value}),"utf-8");
    
}

