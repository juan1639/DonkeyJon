
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
            nro_bichos: 2,
            nro_CHISPASfireWorks: 99,
            nro_DIAMANTES: 7,
            nro_niveles: 2,
            txt_selectMusica: 'Musica: On',
            musica: true,
            txt_selectDificultad: 'Dificultad: Normal',
            dificultad: 1,
            pausaFireWorksNivelSuperado: 9999,
            pausaMsgNivelMostrar: 5200,
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
            [-this.resolucion[0], 0, './img/fondo_cielo103.png'],
            [0, 0, './img/fondo_cielo101.png'],
            [this.resolucion[0], 0, './img/fondo_cielo103.png'],
            [this.resolucion[0] * 2, 0, './img/fondo_cielo101.png'],
            [-this.resolucion[0], -this.resolucion[1], './img/fondo_cielo104.png'],
            [0, -this.resolucion[1], './img/fondo_cielo102.png'],
            [this.resolucion[0], -this.resolucion[1], './img/fondo_cielo104.png'],
            [this.resolucion[0] * 2, -this.resolucion[1], './img/fondo_cielo102.png']
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
            boommerang: [],
            bichos: [],
            pajaros: [],
            llave: null,
            bonus: [],
            lossiete: [],
            showbonus: [],
            decorativos: [],
            decorativosOffgame: [],
            textos: [],
            showvidas: [],
            chispa: []
        };

        this.marcadores = {
            puntos: 0,
            nivel: 1,
            vidas: 3,
            scorePtos: document.getElementById('puntos'),
            scoreNivel: document.getElementById('nivel'),
            scoreVidas: document.getElementById('vidas'),
            menuPrincipal: document.getElementById('menu__principal'),
            botonNewGame: document.getElementById('boton__newGame'),
            botonSelectDificultad: document.getElementById('boton__selectDificultad'),
            botonSelectMusica: document.getElementById('boton__selectMusica'),
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

        this.nro_enemigosDificultad = {
            mariq: [1, 2, 3],
            carac: [1, 2, 3],
            pajaros: [1, 2, 3],
        };

        this.nro_enemigos = {
            mariq: [2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            carac: [2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            pajaros: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5]
        };

        this.controles = {
            touch_iz: false,
            touch_de: false,
            touch_up: false,
            touch_do: false,
            touch_at: false,
            tecla_iz: false,
            tecla_de: false,
            tecla_up: false,
            tecla_do: false,
            tecla_at: false
        };

        this.tecla = {
            iz: 'ArrowLeft',
            de: 'ArrowRight',
            up: 'ArrowUp',
            do: 'ArrowDown',
            at: ['Control', ' '],
            music_onoff: ['s', 'S'],
            enter: 'Enter'
        };

        this.touch = {
            iz: ['boton__le', 'flecha__le'],
            de: ['boton__ri', 'flecha__ri'],
            up: ['boton__up', 'flecha__up'],
            do: ['boton__do', 'flecha__do'],
            at: ['boton__at', 'icono__at'],
            music_onoff: 'boton__music',
            nextLevel: 'boton__NextLevel',
            newGame: 'boton__newGame',
            canvas: 'canvas'

        }

        this.estado = {
            preJuego: false,
            enJuego: true,
            jugadorDies: false,
            gameOver: false,
            reJugar: false,
            nivelSuperado: false
        };
        
        this.colores = {
            azul_fondo: 'rgb(134, 210, 230)',
            blanco_nube: 'rgb(233, 233, 233)',
            txt_amar2: 'rgb(240, 240, 170)',
            txt_amar1: 'rgb(255, 89, 19)',
            txt_amar3: 'rgb(225, 155, 29)'
        };

        // -------------------------------------------------------------------
        // [ y, x, longSize, bordeIz, bordeDe, movil/fija, nro_alturas nivel ]
        // -------------------------------------------------------------------
        this.array_plataformas = [

            [this.ini_suelo - this.gap * 7 - this.gapMini, 10, 5, true, true, 0, 6],
            [this.ini_suelo - this.gap * 6, -16, 22, false, true, 0, 6],
            [this.ini_suelo - this.gap * 7, 9, 12, false, false, 1, 6],
            [this.ini_suelo - this.gap * 6, 23, 25, true, false, 0, 6],
            [this.ini_suelo - this.gap * 6, 12, 2, true, true, 0, 6],

            [this.ini_suelo - this.gap * 5 - this.gapMini * 2, 30, 3, true, true, 0, 6],
            [this.ini_suelo - this.gap * 5 - this.gapMini, 35, 2, true, true, 0, 6],

            [this.ini_suelo - this.gap * 5, -16, 20, false, true, 0, 6],
            [this.ini_suelo - this.gap * 5, 8, 20, true, true, 0, 6],
            [this.ini_suelo - this.gap * 5, 32, 8, true, true, 0, 6],

            [this.ini_suelo - this.gap * 3, 28, 4, true, true, 0, 6],

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

        this.array_plataformas2 = [

            [this.ini_suelo - this.gap * 6, 0, 14, false, true, 0, 6],
            [this.ini_suelo - this.gap * 6, 23, 23, true, true, 0, 6],
            [this.ini_suelo - this.gap * 6, 52, 12, true, false, 0, 6],

            [this.ini_suelo - this.gap * 5 - this.gapMini * 2, 28, 4, true, true, 0, 6],
            [this.ini_suelo - this.gap * 5 - this.gapMini, 28, 4, true, true, 0, 6],

            [this.ini_suelo - this.gap * 5, 21, 18, true, true, 0, 6],

            [this.ini_suelo - this.gap * 4, 31, 7, true, true, 0, 6],
            [this.ini_suelo - this.gap * 4, 22, 5, true, true, 0, 6],
            [this.ini_suelo - this.gap * 4, 41, 5, true, true, 0, 6],

            [this.ini_suelo - this.gap * 3, 31, 4, true, true, 0, 6],
            [this.ini_suelo - this.gap * 3, 6, 10, true, true, 0, 6],

            [this.ini_suelo - this.gap * 2, 32, 8, true, true, 0, 6],
            [this.ini_suelo - this.gap * 2, 23, 5, true, true, 0, 6],

            [this.ini_suelo - this.gap * 1 - this.gapMini * 2, 42, 3, true, true, 0, 6],
            [this.ini_suelo - this.gap * 1 - this.gapMini, 39, 2, true, true, 0, 6],

            [this.ini_suelo - this.gap * 1, 25, 12, true, true, 0, 6],

            [this.ini_suelo - this.gap * 1, 48, 8, false, false, 1, 6],

            [this.ini_suelo, 0, 64, false, false, 0, 6]
        ];

        this.array_nivelesPlataformas = [
            this.array_plataformas,
            this.array_plataformas2,
            this.array_plataformas
        ];

        this.array_escaleras = [
            [31, this.ini_suelo, this.gap],
            [-1, this.ini_suelo - this.gap * 1, this.gap],
            [25, this.ini_suelo - this.gap * 2, this.gap * 2],
            [8, this.ini_suelo - this.gap * 2, this.gap],
            [-5, this.ini_suelo - this.gap * 3, this.gap],
            [34, this.ini_suelo - this.gap * 4, this.gap]
        ];

        this.array_escaleras2 = [
            [31, this.ini_suelo, this.gap],
            [10, this.ini_suelo, this.gap * 3],
            [25, this.ini_suelo - this.gap * 2, this.gap * 2],
            [12, this.ini_suelo - this.gap * 3, this.gap * 3],
            [-5, this.ini_suelo - this.gap * 3, this.gap],
            [34, this.ini_suelo - this.gap * 4, this.gap]
        ];

        this.array_nivelesEscaleras = [
            this.array_escaleras,
            this.array_escaleras2,
            this.array_escaleras
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
            [6, this.ini_suelo - this.gap * 2, 1, './img/signArrow_up.png', false],
            [10, this.ini_suelo - this.gap * 2, 1, './img/signArrow_right.png', false],
            [-7, this.ini_suelo, 1, './img/signArrow_TR.png', false],
            [38, this.ini_suelo, 1, './img/signArrow_up.png', false],
            [3, this.ini_suelo - this.gap * 1, 1, './img/signArrow_up.png', false],
            [30, this.ini_suelo - this.gap * 4, 1, './img/signArrow_TL.png', false],
            [32, this.ini_suelo - this.gap * 4, 1, './img/signArrow_up.png', false],
            [34, this.ini_suelo - this.gap * 6, 1, './img/signLeft.png', false],
            [9, this.ini_suelo - this.gap * 5, 1, './img/signLeft.png', false],
            [37, this.ini_suelo - this.gap * 6, 1, './img/Letrero_Arlekin.png', false],

            [2, this.ini_suelo - this.gap * 5, 1, './img/switchRed_mid.png', true],

            [-12, this.ini_suelo - this.gap * 6, 1, './img/flagYellow1.png', false],
            [-10, this.ini_suelo - this.gap * 6, 1, './img/lockYellow.png', false]
        ];

        this.array_decorativos2 = [
            [58, this.ini_suelo, 1, './img/tree05.png', false],
            [-10, this.ini_suelo - this.gap * 3, 1, './img/tree05.png', false],
            [42, this.ini_suelo - this.gap * 4, 1, './img/tree05.png', false],
            [59, this.ini_suelo - this.gap * 6, 2, './img/tree05.png', false],
            [6, this.ini_suelo, 1, './img/tree05.png', false],
            [6, this.ini_suelo - this.gap * 3, 1, './img/tree05.png', false],
            [26, this.ini_suelo, 1, './img/Letrero_creditos.png', false],
            [1, this.ini_suelo, 1, './img/Letrero_kenneyNl.png', false],
            [42, this.ini_suelo, 1, './img/Letrero_IMI.png', false],
            [32, this.ini_suelo - this.gap * 2, 1, './img/Letrero_piscis.png', false],
            [49, this.ini_suelo, 1, './img/signArrow_up.png', false],
            [12, this.ini_suelo, 1, './img/signArrow_up.png', false],
            [14, this.ini_suelo, 1, './img/signRight.png', false],
            [32, this.ini_suelo - this.gap * 4, 1, './img/signArrow_up.png', false],
            [24, this.ini_suelo - this.gap * 6, 1, './img/signLeft.png', false],
            [27, this.ini_suelo - this.gap * 6, 1, './img/signRight.png', false],
            [37, this.ini_suelo - this.gap * 6, 1, './img/Letrero_Arlekin.png', false],

            [35, this.ini_suelo - this.gap * 6, 1, './img/switchRed_mid.png', true],

            [2, this.ini_suelo - this.gap * 6, 1, './img/flagYellow1.png', false],
            [6, this.ini_suelo - this.gap * 6, 1, './img/lockYellow.png', false]
        ];

        this.array_nivelesDecorativos = [
            this.array_decorativos,
            this.array_decorativos2,
            this.array_decorativos
        ];

        this.array_textos = [
            [' Pulse agachar para realizar accion', 'center', 50, this.colores.txt_amar1],
            [' N i v e l  ', 'center', 120, this.colores.txt_amar3]
        ];

        this.array_llaves = [
            ['./img/keyYellow.png', 29 * this.constante.bsx, this.ini_suelo - this.gap * 3, true],
            ['./img/keyYellow.png', 54 * this.constante.bsx, this.ini_suelo - this.gap * 6, true],
            ['./img/keyYellow.png', 29 * this.constante.bsx, this.ini_suelo - this.gap * 3, true]
        ];

        this.msg = {
            nivel: false
        };
        
        this.array_bonus = [
            ['./img/items_ri.png', 35, this.ini_suelo, true],
            ['./img/items_ri.png', 12, this.ini_suelo - this.gap * 1, true],
            ['./img/items_ri.png', 29, this.ini_suelo - this.gap * 2, true],
            ['./img/items_ri.png', 10, this.ini_suelo - this.gap * 3, true],
            ['./img/items_ri.png', 12, this.ini_suelo - this.gap * 4, true],
            ['./img/items_ri.png', 33, this.ini_suelo - this.gap * 5, true],
            ['./img/items_ri.png', 25, this.ini_suelo - this.gap * 6, true],
            ['./img/items_ri.png', -6, this.ini_suelo - this.gap * 3, true],
            ['./img/items_ri.png', -4, this.ini_suelo - this.gap * 5, true]
        ];

        this.array_bonus2 = [
            ['./img/items_ri.png', 35, this.ini_suelo, true],
            ['./img/items_ri.png', 8, this.ini_suelo - this.gap * 3, true],
            ['./img/items_ri.png', 32, this.ini_suelo - this.gap * 3, true],
            ['./img/items_ri.png', 10, this.ini_suelo - this.gap * 3, true],
            ['./img/items_ri.png', 56, this.ini_suelo, true],
            ['./img/items_ri.png', 30, this.ini_suelo - this.gap * 6, true],
            ['./img/items_ri.png', 56, this.ini_suelo - this.gap * 6, true],
            ['./img/items_ri.png', 53, this.ini_suelo, true],
            ['./img/items_ri.png', 46, this.ini_suelo, true]
        ];

        this.array_nivelesBonus = [
            this.array_bonus,
            this.array_bonus2,
            this.array_bonus
        ];

        this.array_decorativosOffgame = [
            [this.resolucion[0] / 2, this.resolucion[1] / 2, './img/cartel_presentacion.png', 400, 300],
            [this.resolucion[0] / 2, this.resolucion[1] / 2, './img/cartel_gameover.png', 400, 140]
        ];

        this.trucos = {
            invisible: false,
            vidasInfinitas: false
        };

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
            ataque: new Audio('./audio/misc125.mp3'),
            dieThrow1: new Audio('./audio/dieThrow1.ogg'),
            dieThrow2: new Audio('./audio/dieThrow2.ogg'),
            chips1: new Audio('./audio/chipsCollide1.ogg'),
            chips2: new Audio('./audio/chipsCollide2.ogg'),
            chips3: new Audio('./audio/chipsCollide3.ogg'),
            marioTuberias: new Audio('./audio/mario_tuberias.ogg'),
            pacmanDies: new Audio('./audio/pacmandies.ogg'),
            eatingCherry: new Audio('./audio/pacmaneatingcherry.mp3'),
            eatingGhost: new Audio('./audio/pacmaneatinghost.ogg'),
            intermision: new Audio('./audio/pacmanintermision.ogg'),
            fireWorks: new Audio('./audio/fireworks.mp3'),
            musicaFondo: new Audio('./audio/music-puzzle-game1.mp3')
        };

        this.volumen = {
            gameOver: 0.8,
            jump: 0.3,
            ataque: 0.7,
            marioTuberias: 0.9,
            pacmanDies: 0.4,
            eatingCherry: 0.9,
            eatingGhost: 0.8,
            intermision: 0.6,
            fireWorks: 0.9,
            musicaFondo: 0.5
        }
    }
}

