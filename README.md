# Mokepon

Juego multijugador en tiempo real inspirado en Pokémon, desarrollado como proyecto del curso de programación de [Platzi](https://platzi.com). Los jugadores eligen su mokepon, exploran un mapa y se enfrentan en batallas por turnos al colisionar con otros jugadores.

**Autor:** Renzo Zavala

---

## Tecnologías

- **Backend:** Node.js + Express 5
- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Canvas:** HTML5 Canvas API para el mapa y los personajes
- **Comunicación:** REST API con `fetch`

---

## Estructura del proyecto

```
Mokpeon/
├── index.js          # Servidor Express (API REST)
├── package.json
└── public/
    ├── mokepon.html  # Interfaz del juego
    ├── styles.css
    ├── js/
    │   └── mokepon.js  # Lógica del cliente
    └── assets/
        ├── mokemap.png              # Imagen del mapa
        ├── hipodoge.png
        ├── capipepo.png
        ├── ratigueya.png
        ├── langostelvis.png
        ├── tucapalma.png
        ├── pydos.png
        └── mokepons_mokepon_*.png   # Imágenes de ataque
```

---

## Mokepones disponibles

| Mokepon       | Ataques principales |
|---------------|---------------------|
| Hipodoge      | 💧 Agua (x3), 🔥 Fuego, 🌱 Tierra |
| Capipepo      | 🌱 Tierra (x3), 🔥 Fuego, 💧 Agua |
| Ratigueya     | 🔥 Fuego (x3), 💧 Agua, 🌱 Tierra |
| Langostelvis  | 🔥 Fuego (x3), 💧 Agua, 🌱 Tierra |
| Tucapalma     | 🌱 Tierra (x3), 🔥 Fuego, 💧 Agua |
| Pydos         | 🔥 Fuego (x3), 💧 Agua, 🌱 Tierra |

### Sistema de ventajas (piedra-papel-tijera)

```
🔥 Fuego  >  🌱 Tierra
🌱 Tierra >  💧 Agua
💧 Agua   >  🔥 Fuego
```

---

## Mecánicas del juego

### Flujo principal

1. **Selección de mokepon** — El jugador elige entre 6 mokepones con tarjetas visuales.
2. **Exploración del mapa** — El mokepon se mueve por un mapa en Canvas. El movimiento está restringido a zonas verdes válidas mediante detección de píxeles.
3. **Colisión = batalla** — Al chocar con otro jugador conectado se inicia automáticamente una batalla.
4. **Combate por turnos** — Cada jugador elige 5 ataques por ronda (uno a la vez, en turnos alternados). El servidor resuelve la ronda y descuenta una vida al perdedor.
5. **Victoria** — Gana quien elimine las 3 vidas del oponente primero.

### Sistema de batalla

- Cada jugador tiene **3 vidas**.
- Cada ronda consta de **5 ataques** intercalados por turno.
- El servidor compara los ataques par a par y suma victorias; quien gane más intercambios gana la ronda y quita una vida al rival.
- Un empate en victorias no descuenta vidas.
- La batalla continúa hasta que un jugador llega a 0 vidas.
- El turno inicial de cada batalla se asigna aleatoriamente.

### Mapa y movimiento

- El canvas se adapta al ancho de pantalla (máximo 600 px).
- **Teclado:** flechas direccionales.
- **Móvil / touch:** botones en pantalla con soporte `ontouchstart` / `ontouchend`.
- Los jugadores rivales se pintan en tiempo real sobre el mismo mapa.

---

## API REST

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET`  | `/unirse` | Registra un nuevo jugador y devuelve su ID único |
| `POST` | `/mokepon/:jugadorId` | Asigna un mokepon al jugador |
| `GET`  | `/jugadores` | Devuelve la lista de jugadores con mokepon asignado |
| `POST` | `/mokepon/:jugadorId/posicion` | Actualiza la posición y devuelve lista de enemigos + batallaId activo |
| `POST` | `/batalla/iniciar` | Inicia una batalla entre dos jugadores |
| `POST` | `/batalla/:batallaId/ataque` | Registra el ataque del jugador en su turno |
| `GET`  | `/batalla/:batallaId/estado` | Consulta el estado actual de la batalla (usado por polling) |

---

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/ReZaVal/Mokpeon.git
cd Mokpeon

# Instalar dependencias
npm install

# Iniciar el servidor
node index.js
```

El servidor corre en `http://localhost:8080`. Abre esa URL en el navegador (o comparte la IP local para jugar en red local con múltiples dispositivos).

---

## Multijugador

El juego soporta múltiples jugadores simultáneos en la misma red. Cada cliente:

- Obtiene un ID único al unirse (`timestamp + random`).
- Envía su posición al servidor en cada frame del canvas.
- Recibe la lista de otros jugadores y los pinta en el mapa.
- Al colisionar con otro jugador, inicia una batalla; el segundo jugador la detecta mediante polling cada segundo (`GET /batalla/:id/estado`).
