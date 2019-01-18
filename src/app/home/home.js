// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(process);
const { net } = require('electron').remote;
var logOut = document.getElementById('logout');
var productosBotton = document.getElementById('productos');
const Store = require('electron-store');
const store = new Store();

const token = sessionStorage.getItem('token');


productosBotton.addEventListener('click', getProductos);



function logout(){

    console.log("f");
    
    sessionStorage.clear();
    store.delete('token');
    store.delete('nombre');

    window.location.replace('../login/login.html');
            
}

function getProductos(){
    const request = net.request({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        protocol: 'http:',
        hostname: 'localhost',
        port: 8080,
        path: '/api/productos/all',
    })
       
    request.on('response', (response) => {
        console.log(response.statusCode);
        if (response.statusCode != 200) {
            alert("Error de Red");
        }else{
            var body = JSON.parse(new TextDecoder('utf-8').decode(response.data[0]))
        
            console.log(body);
            
            
        }
        
        
        
        
        response.on('error', (error) => {
            console.log(`ERROR: ${JSON.stringify(error)}`)
        })
        
    })
    request.end();
}

logOut.addEventListener('click', logout);

function login() {
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
    //request.write(JSON.stringify({email:"jjchavez@urbe.edu.ve", password: "1956784juan"}),"utf-8")
    
}

