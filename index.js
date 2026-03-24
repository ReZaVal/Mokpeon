const express = require('express')
const path = require('path')
const cors = require('cors')
const { Http2ServerRequest } = require('http2')

const app = express()
http://DESKTOP-7SUOIPS.local:8080
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const jugadores = []
const batallas = []

class Batalla {
    constructor(id, jugadorAId, jugadorBId) {
        this.id = id
        this.jugadorAId = jugadorAId
        this.jugadorBId = jugadorBId
        this.turnoActual = Math.random() < 0.5 ? jugadorAId : jugadorBId
        this.ataquesA = []
        this.ataquesB = []
        this.vidasA = 3
        this.vidasB = 3
        this.ronda = 0
        this.estado = 'en_curso'
        this.ganador = null
        this.ultimaRonda = null
        this.creadoEn = Date.now()
    }
}

function resolverRonda(batalla) {
    batalla.ronda++
    let victoriasA = 0, victoriasB = 0

    for (let i = 0; i < 5; i++) {
        const a = batalla.ataquesA[i]
        const b = batalla.ataquesB[i]
        if (a === b) continue
        const aGana = (a === 'Fuego' && b === 'Tierra') ||
                      (a === 'Agua'  && b === 'Fuego')  ||
                      (a === 'Tierra' && b === 'Agua')
        if (aGana) victoriasA++; else victoriasB++
    }

    let ganadorRonda
    if      (victoriasA > victoriasB) { batalla.vidasB--; ganadorRonda = 'A' }
    else if (victoriasB > victoriasA) { batalla.vidasA--; ganadorRonda = 'B' }
    else                               { ganadorRonda = 'empate' }

    batalla.ataquesA = []
    batalla.ataquesB = []
    batalla.ultimaRonda = { ronda: batalla.ronda, ganadorRonda, vidasA: batalla.vidasA, vidasB: batalla.vidasB }

    if (batalla.vidasA === 0 || batalla.vidasB === 0) {
        batalla.estado = 'terminada'
        if      (batalla.vidasA === 0 && batalla.vidasB === 0) batalla.ganador = 'empate'
        else if (batalla.vidasA === 0)                         batalla.ganador = batalla.jugadorBId
        else                                                   batalla.ganador = batalla.jugadorAId
    }
}

class jugador {
    constructor(id) {
    this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }

}

class mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get('/', (_req, res) => {
  res.redirect('/mokepon.html')
})

app.get('/unirse', (req, res) => {
  const id = `${Math.random()}`

  const nuevoJugador = new jugador(id)

  jugadores.push(nuevoJugador)

  res.setHeader("Access-Control-Allow-Origin", "*")

  res.send(id)

})

app.post('/mokepon/:jugadorId',(req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const nombre = req.body.mokepon || ""
  const nuevoMokepon = new mokepon(nombre)

  const jugadorIdenx = jugadores.findIndex((jugador) => jugadorId ===jugador.id)

  if(jugadorIdenx >= 0) {
    jugadores[jugadorIdenx].asignarMokepon(nuevoMokepon)
  }
  
  console.log(jugadores)
  console.log(jugadorId)
  res.end()
})

app.get('/jugadores', (_req, res) => {
  const jugadoresConMokepon = jugadores.filter(j => j.mokepon)
  res.json({ jugadores: jugadoresConMokepon })
})

app.post('/mokepon/:jugadorId/posicion', (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const jugadorIdenx = jugadores.findIndex((jugador) => jugadorId ===jugador.id)

  if(jugadorIdenx >= 0) {
    jugadores[jugadorIdenx].actualizarPosicion(x, y)
  }

  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

  const batallaActiva = batallas.find(function(b) {
    return b.estado === 'en_curso' &&
           (b.jugadorAId === jugadorId || b.jugadorBId === jugadorId)
  })

  res.json({
    enemigos,
    batallaId: batallaActiva ? batallaActiva.id : null
  })

})

app.post('/batalla/iniciar', (req, res) => {
  const { jugadorAId, jugadorBId } = req.body

  const existente = batallas.find(function(b) {
    return b.estado === 'en_curso' && (
      (b.jugadorAId === jugadorAId && b.jugadorBId === jugadorBId) ||
      (b.jugadorAId === jugadorBId && b.jugadorBId === jugadorAId)
    )
  })
  if (existente) return res.json({ batallaId: existente.id, turnoActual: existente.turnoActual, jugadorAId: existente.jugadorAId, jugadorBId: existente.jugadorBId })

  for (let i = batallas.length - 1; i >= 0; i--) {
    if (batallas[i].estado === 'terminada' && Date.now() - batallas[i].creadoEn > 300000)
      batallas.splice(i, 1)
  }

  const nueva = new Batalla(`batalla_${Math.random()}`, jugadorAId, jugadorBId)
  batallas.push(nueva)
  res.json({ batallaId: nueva.id, turnoActual: nueva.turnoActual, jugadorAId, jugadorBId })
})

app.post('/batalla/:batallaId/ataque', (req, res) => {
  const { jugadorId, ataque } = req.body
  const batalla = batallas.find(b => b.id === req.params.batallaId)
  if (!batalla) return res.status(404).json({ error: 'Batalla no encontrada' })
  if (batalla.turnoActual !== jugadorId) return res.status(400).json({ error: 'No es tu turno' })

  if (jugadorId === batalla.jugadorAId) batalla.ataquesA.push(ataque)
  else                                  batalla.ataquesB.push(ataque)

  batalla.turnoActual = (jugadorId === batalla.jugadorAId) ? batalla.jugadorBId : batalla.jugadorAId

  if (batalla.ataquesA.length === 5 && batalla.ataquesB.length === 5) resolverRonda(batalla)

  res.json({
    turnoActual: batalla.turnoActual,
    ultimaRonda: batalla.ultimaRonda,
    vidasA: batalla.vidasA,
    vidasB: batalla.vidasB,
    estado: batalla.estado,
    ganador: batalla.ganador
  })
})

app.get('/batalla/:batallaId/estado', (req, res) => {
  const { jugadorId } = req.query
  const batalla = batallas.find(b => b.id === req.params.batallaId)
  if (!batalla) return res.status(404).json({ error: 'Batalla no encontrada' })

  const soyA = jugadorId === batalla.jugadorAId
  res.json({
    batallaId: batalla.id,
    jugadorAId: batalla.jugadorAId,
    jugadorBId: batalla.jugadorBId,
    turnoActual: batalla.turnoActual,
    esMiTurno: batalla.turnoActual === jugadorId,
    misVidas:     soyA ? batalla.vidasA : batalla.vidasB,
    vidasEnemigo: soyA ? batalla.vidasB : batalla.vidasA,
    ultimaRonda: batalla.ultimaRonda,
    estado: batalla.estado,
    ganador: batalla.ganador,
    soyGanador: batalla.ganador === jugadorId
  })
})

app.listen(8080, () => {
  console.log('Server is running')
})