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

        this.resolucion = [
            this.constante.bsx * this.constante.nro_columnas, 
            this.constante.bsy * this.constante.nro_filas
        ];

        this.ini_suelo = this.resolucion[1] - this.constante.bsy * 2;
        this.gap = this.constante.bsy * 6;
        this.gapMini = this.constante.bsy * 2;

        this.ini_jugador = {
            x: Math.floor(this.resolucion[0] / 2),
            y: this.ini_suelo - this.constante.alto_jugador
        };

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
            bichos: [],
            pajaros: [],
            llave: null,
            bonus: [],
            decorativos: [],
            textos: [],
            chispa: []
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

        this.bandera = {
            nivel: [
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false
            ]
        };

        this.nro_enemigos = {
            mariq: [4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9],
            carac: [4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9],
            pajaros: [3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7]
        };

        this.controles = {
            touch_iz: false,
            touch_de: false,
            touch_up: false,
            touch_do: false,
            tecla_iz: false,
            tecla_de: false,
            tecla_up: false,
            tecla_do: false
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
            up: ['boton__up', 'flecha__up'],
            do: ['boton__do', 'flecha__do'],
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
            blanco_nube: 'rgb(233, 233, 233)',
            txt_amar2: 'rgb(240, 240, 170)',
            txt_amar1: 'rgb(255, 89, 19)'
        };

        // -------------------------------------------------------------------
        // [ y, x, longSize, bordeIz, bordeDe, movil/fija, nro_alturas nivel ]
        // -------------------------------------------------------------------
        this.array_plataformas = [

            [this.ini_suelo - this.gap * 6, -16, 22, false, true, 0, 6],
            [this.ini_suelo - this.gap * 6, 7, 3, false, false, 1, 6],
            [this.ini_suelo - this.gap * 6, 23, 25, true, false, 0, 6],

            [this.ini_suelo - this.gap * 5 - this.gapMini * 2, 30, 3, true, true, 0, 6],
            [this.ini_suelo - this.gap * 5 - this.gapMini, 35, 2, true, true, 0, 6],

            [this.ini_suelo - this.gap * 5, -16, 20, false, true, 0, 6],
            [this.ini_suelo - this.gap * 5, 8, 20, true, true, 0, 6],
            [this.ini_suelo - this.gap * 5, 32, 8, true, true, 0, 6],

            [this.ini_suelo - this.gap * 4, -6, 24, true, true, 0, 6],
            [this.ini_suelo - this.gap * 4, 22, 26, true, false, 0, 6],

            [this.ini_suelo - this.gap * 3, -16, 15, false, true, 0, 6],
            [this.ini_suelo - this.gap * 3, 3, 10, true, true, 0, 6],

            [this.ini_suelo - this.gap * 2, -4, 39, true, true, 0, 6],

            [this.ini_suelo - this.gap * 1, -6, 14, true, true, 0, 6],
            [this.ini_suelo - this.gap * 1, 11, 7, true, true, 0, 6],
            [this.ini_suelo - this.gap * 1, 21, 17, true, true, 0, 6],

            [this.ini_suelo, -16, 64, false, false, 0, 6]
        ];

        this.array_escaleras = [
            [31, this.ini_suelo, this.gap],
            [-1, this.ini_suelo - this.gap * 1, this.gap],
            [25, this.ini_suelo - this.gap * 2, this.gap * 2],
            [8, this.ini_suelo - this.gap * 2, this.gap],
            [-5, this.ini_suelo - this.gap * 3, this.gap],
            [34, this.ini_suelo - this.gap * 4, this.gap]
        ];

        this.array_decorativos = [
            [-10, this.ini_suelo, 1, './img/tree05.png', false],
            [42, this.ini_suelo, 1, './img/tree05.png', false],
            [-10, this.ini_suelo - this.gap * 3, 1, './img/tree05.png', false],
            [42, this.ini_suelo - this.gap * 4, 1, './img/tree05.png', false],
            [-14, this.ini_suelo - this.gap * 5, 3, './img/tree05.png', false],
            [42, this.ini_suelo - this.gap * 6, 2, './img/tree05.png', false],
            [26, this.ini_suelo, 1, './img/Letrero_creditos.png', false],
            [-15, this.ini_suelo, 1, './img/Letrero_kenneyNl.png', false],
            [-15, this.ini_suelo - this.gap * 3, 1, './img/Letrero_IMI.png', false],
            [31, this.ini_suelo - this.gap * 2, 1, './img/Letrero_piscis.png', false],
            [-7, this.ini_suelo, 1, './img/signArrow_TR.png', false],
            [38, this.ini_suelo, 1, './img/signArrow_up.png', false],
            [3, this.ini_suelo - this.gap * 1, 1, './img/signArrow_up.png', false],
            [30, this.ini_suelo - this.gap * 4, 1, './img/signArrow_TL.png', false],
            [32, this.ini_suelo - this.gap * 4, 1, './img/signArrow_up.png', false],
            [34, this.ini_suelo - this.gap * 6, 1, './img/signArrow_left.png', false],
            [9, this.ini_suelo - this.gap * 5, 1, './img/signArrow_left.png', false],
            [37, this.ini_suelo - this.gap * 6, 1, './img/Letrero_Arlekin.png', false],

            [-6, this.ini_suelo - this.gap * 5, 1, './img/switchRed_mid.png', true],

            [-12, this.ini_suelo - this.gap * 6, 1, './img/flagYellow1.png', false],
            [-10, this.ini_suelo - this.gap * 6, 1, './img/lockYellow.png', false]
        ];

        this.array_textos = [
            [' Pulse agachar para realizar accion', -39, this.ini_suelo - this.constante.bsy, 55, this.colores.txt_amar1],
            [' Primero debes coger la llave!', -32, this.ini_suelo - this.constante.bsy - 10, 60, this.colores.txt_amar1]
            
        ];
        
        this.array_bonus = [
            ['./img/items_ri.png', 35, this.ini_suelo, true],
            ['./img/items_ri.png', 12, this.ini_suelo - this.gap * 1, true],
            ['./img/items_ri.png', 29, this.ini_suelo - this.gap * 2, true],
            ['./img/items_ri.png', 10, this.ini_suelo - this.gap * 3, true],
            ['./img/items_ri.png', 12, this.ini_suelo - this.gap * 4, true],
            ['./img/items_ri.png', 33, this.ini_suelo - this.gap * 5, true],
            ['./img/items_ri.png', 25, this.ini_suelo - this.gap * 6, true]
        ];

        this.imagenes = {
            ssheet_jugador: new Image(),
            fondo_cielo1: new Image(),
            tile_medio: new Image(),
            tile_madera: new Image(),
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

        this.volumen = {
            gameOver: 0.8,
            jump: 0.3,
            marioTuberias: 0.9,
            pacmanDies: 0.6,
            eatingCherry: 0.9,
            eatingGhost: 0.8,
            intermision: 0.6
        }
    }
}

