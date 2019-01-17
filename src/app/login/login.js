// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(process);
const { net } = require('electron').remote;
const Store = require('electron-store');
const store = new Store();
var submit = document.getElementById('submit')


document.addEventListener("keypress", (e) =>{
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        login();
    }
})

submit.addEventListener('click', login);



if (store.get('token', false) != false) {
    sessionStorage.setItem('token', store.get('token'));
    sessionStorage.setItem('nombre', store.get('nombre'));
    
    window.location.replace('../home/home.html');
}


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
            return;
        }else if(response.statusCode == 200){
            var body = JSON.parse(new TextDecoder('utf-8').decode(response.data[0]))
        
            store.set('token', body.token);
            store.set('nombre', body.nombre);
            
            
            sessionStorage.setItem('token', body.token);
            sessionStorage.setItem('nombre', body.nombre);
    
            window.location.replace('../home/home.html');
            
            
        }
        
        
        response.on('error', (error) => {
            console.log(`ERROR: ${JSON.stringify(error)}`)
        })
        
    })
    request.end(JSON.stringify({email:email.value, password: password.value}),"utf-8");
    //request.write(JSON.stringify({email:"jjchavez@urbe.edu.ve", password: "1956784juan"}),"utf-8")
    
}

