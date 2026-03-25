    const SERVIDOR = `http://${window.location.host}`

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


let jugadorId = null
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
let contadorFrames = 0
let batallaId = null
let soyJugadorA = false
let esMiTurnoActual = false
let intervaloBatalla = null
let enemigoIdEnBatalla = null
let ultimaRondaMostrada = 0
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
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
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


// Enemigos reales del servidor, identificados por su ID de jugador
let enemigosPorId = {}
let enemigos = []

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🌱', id: 'bottom-tierra'},  
]

Hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '💧', id: 'bottom-agua'},
    ]
Capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '🌱', id: 'bottom-tierra'},
    ]
Ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

const LANGOSTELVIS_ATAQUES = [
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '🌱', id: 'bottom-tierra'},
    ]
Langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

const TUCAPALMA_ATAQUES = [
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🌱', id: 'bottom-tierra'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '💧', id: 'bottom-agua'},
    ]
Tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

const PYDOS_ATAQUES = [
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '🔥', id: 'bottom-fuego'},
    {nombre: '💧', id: 'bottom-agua'},
    {nombre: '🌱', id: 'bottom-tierra'},
    ]
Pydos.ataques.push(...PYDOS_ATAQUES)

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

    unirsealjuego()
}

function unirsealjuego() {
    fetch(`${SERVIDOR}/unirse`)
        .then(function (res) {
            if(res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
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

    seleccionarMokepon(mascotaJugador)

    iniciarMapa()
    extraerAtaques(mascotaJugador)
    secuenciaAtaque()
    }

    function seleccionarMokepon(mascotaJugador){
        fetch(`${SERVIDOR}/mokepon/${jugadorId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mokepon: mascotaJugador })
        })
        .then(function (res) {
            if (!res.ok) return null
            // Registrar posición provisional antes de obtener enemigos,
            // para que otros jugadores nos vean con coordenadas en GET /jugadores
            return fetch(`${SERVIDOR}/mokepon/${jugadorId}/posicion`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ x: Math.floor(mapa.width / 2), y: Math.floor(mapa.height / 2) })
            })
        })
        .then(function (res) {
            if (res && res.ok) return res.json()
        })
        .then(function (data) {
            // POST /posicion ya devuelve enemigos con sus coordenadas actuales
            if (data && data.enemigos) procesarEnemigos(data.enemigos)
        })
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
    botones.forEach(function(boton) {
        boton.addEventListener('click', function() {
            if (!batallaId || !esMiTurnoActual) return
            const tipo = boton.dataset.ataque
            if (!tipo) return
            boton.style.background = '#112f58'
            esMiTurnoActual = false
            actualizarIndicadorTurno()

            fetch(`${SERVIDOR}/batalla/${batallaId}/ataque`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jugadorId: jugadorId, ataque: tipo })
            })
            .then(function(res) { if (res.ok) return res.json() })
            .then(function(data) {
                if (!data) return
                esMiTurnoActual = data.turnoActual === jugadorId
                actualizarIndicadorTurno()
                if (data.ultimaRonda && data.ultimaRonda.ronda > ultimaRondaMostrada) procesarResultadoRonda(data.ultimaRonda)
                if (data.estado === 'terminada') procesarFinBatalla(data.ganador === jugadorId)
            })
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    imgEnemigo.src = enemigo.foto
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

function encontrarPosicionValida(posicionesOcupadas = []) {
    const separacion = 6
    let x, y, intentos = 0
    let valido
    do {
        x = aleatorio(0, mapa.width - 40)
        y = aleatorio(0, mapa.height - 40)
        intentos++
        const enTerreno = esPosicionValida(x, y)
        const sinSolapamiento = posicionesOcupadas.every(p =>
            x >= p.x + 40 + separacion ||
            p.x >= x + 40 + separacion ||
            y >= p.y + 40 + separacion ||
            p.y >= y + 40 + separacion
        )
        valido = enTerreno && sinSolapamiento
    } while (!valido && intentos < 500)
    return { x, y }
}

function obtenerJugadores() {
    fetch(`${SERVIDOR}/jugadores`)
        .then(function (res) {
            if (res.ok) return res.json()
        })
        .then(function (data) {
            if (!data || !data.jugadores) return
            const otrosJugadores = data.jugadores.filter(function (j) {
                return j.id !== jugadorId
            })
            procesarEnemigos(otrosJugadores)
        })
}

function procesarEnemigos(enemigosServidor) {
    const idsActivos = []

    enemigosServidor.forEach(function (enemigoServidor) {
        if (!enemigoServidor.mokepon) return
        if (enemigoServidor.id === jugadorId) return

        const id = enemigoServidor.id
        idsActivos.push(id)

        if (!enemigosPorId[id]) {
            const mokeponNombre = enemigoServidor.mokepon.nombre
            const template = mokepones.find(function (m) {
                return m.nombre === mokeponNombre
            })
            if (template) {
                const nuevoEnemigo = new Mokepon(
                    template.nombre,
                    template.foto,
                    template.vida,
                    template.mapaFoto.src,
                    id
                )
                nuevoEnemigo.mapaFoto = template.mapaFoto
                nuevoEnemigo.ataques = template.ataques
                nuevoEnemigo.x = enemigoServidor.x ?? 0
                nuevoEnemigo.y = enemigoServidor.y ?? 0
                enemigosPorId[id] = nuevoEnemigo
            }
        }

        if (enemigosPorId[id] && enemigoServidor.x != null && enemigoServidor.y != null) {
            enemigosPorId[id].x = enemigoServidor.x
            enemigosPorId[id].y = enemigoServidor.y
        }
    })

    Object.keys(enemigosPorId).forEach(function (id) {
        if (!idsActivos.includes(id)) {
            delete enemigosPorId[id]
        }
    })

    enemigos = Object.values(enemigosPorId)
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

        enemigos.forEach(enemigo => {
            if (enemigo.x !== null && enemigo.y !== null) enemigo.pintarMokepon()
        })

        enviarposicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

        contadorFrames++
        if (contadorFrames % 4 === 0) {
            obtenerJugadores()
        }

        if (
            mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0
        ) {
            enemigos.forEach(enemigo => revisarColision(enemigo))
        }

        function enviarposicion(x, y){
            fetch(`${SERVIDOR}/mokepon/${jugadorId}/posicion`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ x: x, y: y })
            })
            .then(function (res) {
                if (res.ok) return res.json()
            })
            .then(function (data) {
                if (!data) return
                procesarEnemigos(data.enemigos)
                if (data.batallaId && !batallaId) {
                    batallaId = data.batallaId
                    soyJugadorA = false
                    clearInterval(intervalo)
                    iniciarPollingBatalla()
                }
            })
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

    // Registrar posición provisional inmediatamente para aparecer en el mapa
    // de otros jugadores sin esperar a que cargue la imagen del fondo
    fetch(`${SERVIDOR}/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x: Math.floor(mapa.width / 2), y: Math.floor(mapa.height / 2) })
    })

    function arrancar() {
        // Dibujar fondo una vez para poder leer píxeles
        lienzo.drawImage(mapabackground, 0, 0, mapa.width, mapa.height)

        // Colocar al jugador en una posición verde válida
        const posicionesOcupadas = []
        const posJugador = encontrarPosicionValida(posicionesOcupadas)
        mascotaJugadorObjeto.x = posJugador.x
        mascotaJugadorObjeto.y = posJugador.y
        posicionesOcupadas.push(posJugador)

        window.addEventListener('keydown', sePrecionoUnaTecla)
        window.addEventListener('keyup', detenerMovimiento)

        // Cargar jugadores y enviar posición real en paralelo
        const fetchJugadores = fetch(`${SERVIDOR}/jugadores`)
            .then(function(res) { return res.ok ? res.json() : null })
            .then(function(data) {
                if (data && data.jugadores)
                    procesarEnemigos(data.jugadores.filter(function(j) { return j.id !== jugadorId }))
            })

        const fetchPosicion = fetch(`${SERVIDOR}/mokepon/${jugadorId}/posicion`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ x: posJugador.x, y: posJugador.y })
        })
        .then(function(res) { return res && res.ok ? res.json() : null })
        .then(function(data) { if (data && data.enemigos) procesarEnemigos(data.enemigos) })

        Promise.all([fetchJugadores, fetchPosicion]).finally(function() {
            obtenerJugadores()   // refresco extra para cubrir condición de carrera
            intervalo = setInterval(PintarCanvas, 50)
        })
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
    if (batallaId) return

    detenerMovimiento()
    clearInterval(intervalo)

    fetch(`${SERVIDOR}/batalla/iniciar`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jugadorAId: jugadorId, jugadorBId: enemigo.id })
    })
    .then(function(res) { if (res.ok) return res.json() })
    .then(function(data) {
        if (!data) return
        batallaId = data.batallaId
        soyJugadorA = jugadorId === data.jugadorAId
        enemigoIdEnBatalla = soyJugadorA ? data.jugadorBId : data.jugadorAId
        mostrarCombate(enemigo, data.turnoActual)
        iniciarPollingBatalla()
    })
}

function mostrarCombate(enemigo, turnoActual) {
    sectionseleccionarataque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    esMiTurnoActual = turnoActual === jugadorId
    actualizarIndicadorTurno()
}

function actualizarIndicadorTurno() {
    const indicador = document.getElementById('indicador-turno')
    if (!indicador) return
    indicador.innerText = esMiTurnoActual ? 'Tu turno — elige un ataque' : 'Esperando ataque del enemigo...'
    botones.forEach(function(boton) { boton.disabled = !esMiTurnoActual })
}

function iniciarPollingBatalla() {
    consultarEstadoBatalla()
    intervaloBatalla = setInterval(consultarEstadoBatalla, 1000)
}

function detenerPollingBatalla() {
    clearInterval(intervaloBatalla)
    intervaloBatalla = null
}

function consultarEstadoBatalla() {
    if (!batallaId) return
    fetch(`${SERVIDOR}/batalla/${batallaId}/estado?jugadorId=${jugadorId}`)
        .then(function(res) { if (res.ok) return res.json() })
        .then(function(data) { if (data) actualizarUIBatalla(data) })
}

function actualizarUIBatalla(data) {
    if (sectionseleccionarataque.style.display !== 'flex') {
        sectionseleccionarataque.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        enemigoIdEnBatalla = soyJugadorA ? data.jugadorBId : data.jugadorAId
        const enemigo = enemigosPorId[enemigoIdEnBatalla]
        if (enemigo) seleccionarMascotaEnemigo(enemigo)
    }

    esMiTurnoActual = data.esMiTurno
    spanvidasjugador.innerHTML = data.misVidas
    spanvidasenemigo.innerHTML = data.vidasEnemigo
    actualizarIndicadorTurno()

    if (data.ultimaRonda && data.ultimaRonda.ronda > ultimaRondaMostrada) procesarResultadoRonda(data.ultimaRonda)
    if (data.estado === 'terminada') {
        detenerPollingBatalla()
        procesarFinBatalla(data.soyGanador)
    }
}

function procesarResultadoRonda(ultimaRonda) {
    ultimaRondaMostrada = ultimaRonda.ronda
    const yoGane = (soyJugadorA && ultimaRonda.ganadorRonda === 'A') ||
                   (!soyJugadorA && ultimaRonda.ganadorRonda === 'B')
    const esEmpate = ultimaRonda.ganadorRonda === 'empate'
    crearMensaje(esEmpate ? 'Empate' : yoGane ? 'Ganaste' : 'Perdiste')
    spanvidasjugador.innerHTML = soyJugadorA ? ultimaRonda.vidasA : ultimaRonda.vidasB
    spanvidasenemigo.innerHTML = soyJugadorA ? ultimaRonda.vidasB : ultimaRonda.vidasA
    botones.forEach(function(boton) { boton.style.background = '' })
}

function procesarFinBatalla(yoGane) {
    detenerPollingBatalla()
    crearMensajeFinal(yoGane ? 'Felicitaciones! Ganaste 🎉😊🎉😊🎆' : 'Lo siento Perdiste 😭')
    batallaId = null
}

window.addEventListener('load', iniciarJuego)
bottomReiniciar.addEventListener('click', reiniciarjuego)