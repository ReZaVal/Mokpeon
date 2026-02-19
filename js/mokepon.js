    const sectionseleccionarataque = document.getElementById('seleccionar-ataque')
    const bottomMascotaJugador = document.getElementById('bottom-mascota')
    const bottomReiniciar = document.getElementById('bottom-reiniciar')

    const sectionseleccionmascota = document.getElementById('seleccionar-mascota')
    const spanMascotaJugador = document.getElementById('mascota-jugador')
    const spanMascotaEnemigo = document.getElementById('mascota-enemigo')


    const spanvidasjugador = document.getElementById('vidas-jugador')
    const spanvidasenemigo = document.getElementById('vidas-enemigo')

    
    const sectionMensajes = document.getElementById('resultado')
    const historialResultado = document.getElementById('historial-resultado')
    const contenedorTarjetas = document.getElementById('contenedorTarjetas')
    const contenedorAtaques = document.getElementById('contenedorAtaques')
    const imgJugador = document.getElementById('imagen-jugador')
    const imgEnemigo = document.getElementById('imagen-enemigo')

let mokepones = []
let ataqueEnemigo = []
let ataqueJugador = []     
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botones = []
let ataquesJugador = []
let ataquesEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasjugador = 3
let vidasenemigo = 3
let bottomFuego
let bottomAgua
let bottomTierra

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let Hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5)
let Capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5)
let Ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5)
let Langostelvis = new Mokepon('Langostelvis', './assets/Langostelvis.png', 5)
let Tucapalma = new Mokepon('Tucapalma', './assets/Tucapalma.png', 5)
let Pydos = new Mokepon('Pydos', './assets/Pydos.png', 5)

Hipodoge.ataques.push(
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🌱', id: 'bottom-tierra'},                                
)

Capipepo.ataques.push(
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '💧', id: 'bottom-agua'},
)
Ratigueya.ataques.push(
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '🌱', id: 'bottom-tierra'},            
)

Langostelvis.ataques.push(
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🌱', id: 'bottom-tierra'},                                
)

Tucapalma.ataques.push(
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '💧', id: 'bottom-agua'},
)

Pydos.ataques.push(
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '🌱', id: 'bottom-tierra'},            
)

mokepones.push(Hipodoge, Capipepo, Ratigueya, Langostelvis, Tucapalma, Pydos)


function iniciarJuego() {

    sectionseleccionarataque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = 
        `<input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
`
        contenedorTarjetas.innerHTML += opcionDeMokepones
        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputTucapalma = document.getElementById('Tucapalma')
        inputPydos = document.getElementById('Pydos')

    })

    bottomReiniciar.style.display = 'none'
    bottomMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador() {
    sectionseleccionmascota.style.display = 'none'
    sectionseleccionarataque.style.display = 'flex'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else if (inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    } else if (inputTucapalma.checked){
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    } else if (inputPydos.checked){
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    } else { alert('Selecciona un mascota')}
    
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
            imgJugador.src = mokepones[i].foto
        }
    }

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    bottomFuego = document.getElementById('bottom-fuego')
    bottomAgua = document.getElementById('bottom-agua')
    bottomTierra = document.getElementById('bottom-tierra')
    botones = document.querySelectorAll('.BAtaque') 

}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click',(e) => {
            if (e.target.textContent == '🔥') {
                ataquesJugador.push('Fuego')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
            } else if (e.target.textContent == '💧') {
                ataquesJugador.push('Agua')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
            } else if (e.target.textContent == '🌱') {
                ataquesJugador.push('Tierra')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
            }
            ataqueAleatorioEnemigo()
        })
    })

}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0,mokepones.length-1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    imgEnemigo.src = mokepones[mascotaAleatoria].foto
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){ 
        ataqueEnemigo.push('Fuego')
    } else if (ataqueAleatorio == 2 || ataqueAleatorio == 4){ 
        ataqueEnemigo.push('Agua')
    } else { 
        ataqueEnemigo.push('Tierra')
    }

    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataquesJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataquesJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    let victoriasRonda = 0
    let derrotasRonda = 0

    for (let index = 0; index < ataquesJugador.length; index++) {
        if(ataquesJugador[index] === ataqueEnemigo[index]) {
            // empate en este ataque
        } else if((ataquesJugador[index] == 'Fuego' && ataqueEnemigo[index] == 'Tierra') || (ataquesJugador[index] == 'Agua' && ataqueEnemigo[index] == 'Fuego') || (ataquesJugador[index] == 'Tierra' && ataqueEnemigo[index] == 'Agua')) {
            victoriasRonda++
        } else {
            derrotasRonda++
        }
    }

    if (victoriasRonda > derrotasRonda) {
        vidasenemigo--
        spanvidasenemigo.innerHTML = vidasenemigo
        crearMensaje('Ganaste')
    } else if (derrotasRonda > victoriasRonda) {
        vidasjugador--
        spanvidasjugador.innerHTML = vidasjugador
        crearMensaje('Perdiste')
    } else {
        crearMensaje('Empate')
    }

    ataquesJugador = []
    ataqueEnemigo = []
    botones.forEach((boton) => boton.style.background = '')

    revisarvidas()
}

function revisarvidas(){
    if (vidasenemigo == 0){
        crearMensajeFinal("Felicitaciones! Ganaste 🎉😊🎉😊🎆")
    } else if(vidasjugador == 0){
        crearMensajeFinal("Lo siento Perdiste 😭")
    }
}

function crearMensaje (resultado) {
    let mensajeRonda = document.createElement('p')
    if (resultado === 'Ganaste') {
        mensajeRonda.innerText = 'Tu mokepon ganó la batalla'
    } else if (resultado === 'Perdiste') {
        mensajeRonda.innerText = 'El mokepon enemigo ganó la batalla'
    } else {
        mensajeRonda.innerText = 'Empate en esta batalla'
    }
    historialResultado.appendChild(mensajeRonda)
}

function crearMensajeFinal (resultadofinal) {
    sectionMensajes.innerText = resultadofinal
    botones.forEach((boton) => boton.disabled = true)
    bottomReiniciar.style.display = 'block'
}

function reiniciarjuego(){
    location.reload()
}

function aleatorio(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', iniciarJuego)
bottomReiniciar.addEventListener('click', reiniciarjuego)