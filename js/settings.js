
// ============================================================================
export class Settings {

    constructor(escalaSel) {

        this.constante = {
            bsx: 50,
            bsy: 50,
            nro_filas: 11,
            nro_columnas: 16,
            GRAVEDAD: 1,
            FPS: 60,
            ancho_jugador: 120,
            alto_jugador: 150
        };

        this.ini_jugador = {
            x: Math.floor(this.constante.nro_columnas / 2),
            y: this.constante.nro_filas - 4
        };

        this.resolucion = [
            this.constante.bsx * this.constante.nro_columnas, 
            this.constante.bsy * this.constante.nro_filas
        ];

        this.ini_suelo = this.resolucion[1] - this.constante.bsy;
        this.gap = this.constante.bsy * 6;

        this.ini_scrolls = [
            [-this.resolucion[0], 0, './img/fondo_cielo3.png'],
            [0, 0, './img/fondo_cielo1.png'],
            [this.resolucion[0], 0, './img/fondo_cielo3.png'],
            [this.resolucion[0] * 2, 0, './img/fondo_cielo1.png'],
            [-this.resolucion[0], -this.resolucion[1], './img/fondo_cielo4.png'],
            [0, -this.resolucion[1], './img/fondo_cielo2.png'],
            [this.resolucion[0], -this.resolucion[1], './img/fondo_cielo4.png'],
            [this.resolucion[0] * 2, -this.resolucion[1], './img/fondo_cielo2.png']
        ];

        this.escala = {
            x: escalaSel,
            y: escalaSel
        };

        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        this.objeto = {
            scroll: [],
            plataforma: [],
            escalera: [],
            jugador: null,
            bichos: []
        };

        this.marcadores = {
            puntos: 0,
            nivel: 1,
            vidas: 3,
            scorePtos: document.getElementById('puntos'),
            scoreNivel: document.getElementById('nivel'),
            scoreVidas: document.getElementById('vidas'),
            botonNewGame: document.getElementById('boton__newGame'),
            contenedorControles: document.getElementById('contenedor2__botonesControl'),
            botonNextLevel: document.getElementById('boton__NextLevel')
        };

        this.controles = {
            touch_iz: false,
            touch_de: false,
            touch_up: false,
            tecla_iz: false,
            tecla_de: false,
            tecla_up: false
        };

        this.tecla = {
            iz: 'ArrowLeft',
            de: 'ArrowRight',
            up: 'ArrowUp',
            do: 'ArrowDown',
            enter: 'Enter',
        };

        this.touch = {
            iz: ['boton__le', 'flecha__le'],
            de: ['boton__ri', 'flecha__ri'],
            up: '',
            do: '',
            nextLevel: 'boton__NextLevel',
            newGame: 'boton__newGame'
        }

        this.estado = {
            preJuego: false,
            enJuego: true,
            gameOver: false,
            nivelSuperado: false
        };
        
        this.colores = {
            azul_fondo: 'rgb(134, 210, 230)',
            blanco_nube: 'rgb(233, 233, 233)'
        };

        this.array_plataformas = [
            [this.ini_suelo - this.gap * 5, -16, 20, false, true],
            [this.ini_suelo - this.gap * 5, 7, 21, true, true],
            [this.ini_suelo - this.gap * 5, 31, 7, true, true],
            [this.ini_suelo - this.gap * 4, -7, 55, true, false],
            [this.ini_suelo - this.gap * 3, -16, 15, false, true],
            [this.ini_suelo - this.gap * 3, 2, 10, true, true],
            [this.ini_suelo - this.gap * 2, -5, 39, true, true],
            [this.ini_suelo - this.gap * 1, -7, 15, true, true],
            [this.ini_suelo - this.gap * 1, 11, 7, true, true],
            [this.ini_suelo - this.gap * 1, 21, 17, true, true],
            [this.ini_suelo, -16, 64]
        ];

        this.array_escaleras = [
            [31, this.ini_suelo, this.gap],
            [-3, this.ini_suelo - this.gap * 1, this.gap],
            [25, this.ini_suelo - this.gap * 2, this.gap * 2],
            [8, this.ini_suelo - this.gap * 2, this.gap],
            [-5, this.ini_suelo - this.gap * 3, this.gap],
            [34, this.ini_suelo - this.gap * 4, this.gap]
        ];

        this.imagenes = {
            ssheet_jugador: new Image(),
            fondo_cielo1: new Image(),
            tile_medio: new Image(),
            tile_izS: new Image(),
            tile_deS: new Image(),
            tile_madera: new Image('./img/tile6.png'),
            tile_metal: new Image('./img/blockGrey.png'),
            escalera: new Image()
        };

        this.sonidos = {
            gameOver: new Audio('./audio/gameoveretro.ogg'),
            jump: new Audio('./audio/jumpbros.ogg'),
            marioTuberias: new Audio('./audio/mario_tuberias.ogg'),
            pacmanDies: new Audio('./audio/pacmandies.ogg'),
            eatingCherry: new Audio('./audio/pacmaneatingcherry.mp3'),
            eatingGhost: new Audio('./audio/pacmaneatinghost.ogg'),
            intermision: new Audio('./audio/pacmanintermision.ogg')
        };
    }
}

