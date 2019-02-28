// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(process);
const { net } = require('electron').remote;

var logOut = document.getElementById('logout');
const Store = require('electron-store');
const store = new Store();

const interact = require('interactjs')

const token = sessionStorage.getItem('token');


interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: false, right: true, bottom: false, top: false },

    // keep the edges inside the parent
    restrictEdges: {
      outer: 'parent',
      endOnly: true,
    },

    // minimum size
    restrictSize: {
      min: { width: 100, height: 50 },
    },

    inertia: true,
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
  });


//productosBotton.addEventListener('click', getProductos);
var productosVue = new Vue({
    el: '#producto-list',
    data: {
      object: [],
      token:token
    },
    methods: {
        getProductos: getProductos,
        getProductosMateriales: getProductosMateriales
    }
  })

  //For ProductoMaterial
  var productoMaterialVue = new Vue({
    el: '#producto-material-list',
    data: {
      object: [],
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


getProductos('0', '20');

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
            alert("Error de Red");
        }else{
            var body = JSON.parse(new TextDecoder('utf-8').decode(response.data[0]))
        
            console.log(body);
            productosVue.object = body
            
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

