// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(process);
const { net } = require('electron').remote;
var submit = document.getElementById('submit')
submit.addEventListener('click', () =>{
    console.log("gfsfsf");
    

    
    const request = net.request({
        method: 'POST',
        protocol: 'http:',
        hostname: 'localhost',
        port: 8080,
        path: '/api/usuario/login'
    })

    request.on('response', (response) => {
        console.log(response.statusCode);
        console.log(response.data);
        console.log(response);
        
        response.on('error', (error) => {
            console.log(`ERROR: ${JSON.stringify(error)}`)
        })
    })
    request.write(JSON.stringify({email:"", password: ""}))
    request.end();
})
function login() {
    //return false
    
}

