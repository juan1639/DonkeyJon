
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
            [this.resolucion[0], 0, './img/fondo_cielo3.png']
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
            jugador: null,
            toneles: []
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
            tecla_iz: false,
            tecla_de: false
        };

        this.tecla = {
            iz: 'ArrowLeft',
            de: 'ArrowRight',
            up: 'ArrowUp',
            do: 'ArrowDown',
            enter: 'Enter',
        };

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
            [this.ini_suelo - this.gap * 5, 0, 12],
            [this.ini_suelo - this.gap * 4, 0, 9],
            [this.ini_suelo - this.gap * 3, 5, 5],
            [this.ini_suelo - this.gap * 2, 2, 8],
            [this.ini_suelo - this.gap, 0, 11],
            [this.ini_suelo, -16, 48]
        ];

        this.imagenes = {
            ssheet_jugador: new Image(),
            fondo_cielo1: new Image(),
            tile_medio: new Image(),
            tile_iz: new Image('./img/tile2.png'),
            tile_de: new Image('./img/tile3.png'),
            tile_izS: new Image('./img/tile4.png'),
            tile_deS: new Image('./img/tile5.png'),
            tile_madera: new Image('./img/tile6.png'),
            tile_metal: new Image('./img/blockGrey.png'),
            escalera: new Image('./img/ladderWide_mid.png')
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

