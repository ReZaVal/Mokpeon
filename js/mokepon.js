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

    const sectionVerMapa = document.getElementById('ver-mapa')
    const mapa = document.getElementById('mapa')



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
let mascotaJugadorObjeto
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
let numeroRonda = 0
let bottomFuego
let bottomAgua
let bottomTierra
let lienzo = mapa.getContext('2d')
let intervalo
let mapabackground = new Image()
mapabackground.src = './assets/mokemap.png'

let alturaquebuscamos
let anchodelmapa = window.innerWidth
const anchomaximodelmapa = 600

if (anchodelmapa > anchomaximodelmapa){
    anchodelmapa = anchomaximodelmapa - 20
}

alturaquebuscamos = anchodelmapa * 400 / 600

mapa.width = anchodelmapa
mapa.height = alturaquebuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }

}

let Hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let Capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let Ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')
let Langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, './assets/langostelvis.png')
let Tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, './assets/tucapalma.png')
let Pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, './assets/pydos.png')

let HipodogeEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let CapipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let RatigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')
let LangostelvisEnemigo = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, './assets/langostelvis.png')
let TucapalmaEnemigo = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, './assets/tucapalma.png')
let PydosEnemigo = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, './assets/pydos.png')

// Paso 1: array con todos los posibles enemigos
let enemigos = [HipodogeEnemigo, CapipepoEnemigo, RatigueyaEnemigo, LangostelvisEnemigo, TucapalmaEnemigo, PydosEnemigo]


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
    sectionVerMapa.style.display = 'none'  


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

    // Paso 2: excluir del array al enemigo con el mismo nombre que el jugador
    enemigos = enemigos.filter(enemigo => enemigo.nombre !== mascotaJugador)

    iniciarMapa()
    extraerAtaques(mascotaJugador)
    secuenciaAtaque()
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
        const tipoAtaque = ataque.nombre === '🔥' ? 'Fuego' : ataque.nombre === '💧' ? 'Agua' : 'Tierra'
        ataquesMokepon = `<button data-ataque="${tipoAtaque}" id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    bottomFuego = document.getElementById('bottom-fuego')
    bottomAgua = document.getElementById('bottom-agua')
    bottomTierra = document.getElementById('bottom-tierra')
    botones = document.querySelectorAll('.BAtaque') 

}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const tipo = boton.dataset.ataque
            if (tipo) {
                ataquesJugador.push(tipo)
                boton.style.background = '#112f58'
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    imgEnemigo.src = enemigo.foto
    const mokeponenemigo = mokepones.find(m => m.nombre === enemigo.nombre)
    ataquesMokeponEnemigo = mokeponenemigo.ataques
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
    numeroRonda++
    let separador = document.createElement('p')
    separador.innerText = `Round ${numeroRonda}`
    historialResultado.appendChild(separador)

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
    bottomReiniciar.style.display = 'flex'
}

function reiniciarjuego(){
    location.reload()
}

function aleatorio(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min)
}

function esPosicionValida(x, y) {
    const cx = Math.floor(x + 20)
    const cy = Math.floor(y + 20)
    if (cx < 0 || cx >= mapa.width || cy < 0 || cy >= mapa.height) return false
    const pixel = lienzo.getImageData(cx, cy, 1, 1).data
    const tolerancia = 30
    return (
        Math.abs(pixel[0] - 182) <= tolerancia &&
        Math.abs(pixel[1] - 230) <= tolerancia &&
        Math.abs(pixel[2] - 207) <= tolerancia
    )
}

function encontrarPosicionValida() {
    let x, y, intentos = 0
    do {
        x = aleatorio(0, mapa.width - 40)
        y = aleatorio(0, mapa.height - 40)
        intentos++
    } while (!esPosicionValida(x, y) && intentos < 500)
    return { x, y }
}

function PintarCanvas(){
        const prevX = mascotaJugadorObjeto.x
        const prevY = mascotaJugadorObjeto.y

        mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
        mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

        lienzo.clearRect(0, 0, mapa.width, mapa.height)
        lienzo.drawImage(mapabackground, 0, 0, mapa.width, mapa.height)

        if (!esPosicionValida(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)) {
            mascotaJugadorObjeto.x = prevX
            mascotaJugadorObjeto.y = prevY
        }

        mascotaJugadorObjeto.pintarMokepon()
        enemigos.forEach(enemigo => enemigo.pintarMokepon())
        if (
            mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0
        ) {
            enemigos.forEach(enemigo => revisarColision(enemigo))
        }
}   

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}   

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePrecionoUnaTecla(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break 
        default:
            break
    }
}

function iniciarMapa(){
    sectionVerMapa.style.display = 'flex'
    mascotaJugadorObjeto = obtenerobjetomascota()

    function arrancar() {
        // Dibujar fondo una vez para poder leer píxeles
        lienzo.drawImage(mapabackground, 0, 0, mapa.width, mapa.height)

        // Colocar al jugador y los enemigos en posiciones verdes válidas
        const posJugador = encontrarPosicionValida()
        mascotaJugadorObjeto.x = posJugador.x
        mascotaJugadorObjeto.y = posJugador.y

        enemigos.forEach(enemigo => {
            const pos = encontrarPosicionValida()
            enemigo.x = pos.x
            enemigo.y = pos.y
        })

        intervalo = setInterval(PintarCanvas, 50)
        window.addEventListener('keydown', sePrecionoUnaTecla)
        window.addEventListener('keyup', detenerMovimiento)
    }

    if (mapabackground.complete) {
        arrancar()
    } else {
        mapabackground.onload = arrancar
    }
}

function obtenerobjetomascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
   }

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota =
         mascotaJugadorObjeto.y
    const abajoMascota =
         mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota =
         mascotaJugadorObjeto.x
    const derechaMascota =
         mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }
    detenerMovimiento()
    sectionseleccionarataque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    
    // alert('Se detecto una colision con ' + enemigo.nombre)
}

window.addEventListener('load', iniciarJuego)
bottomReiniciar.addEventListener('click', reiniciarjuego) 