import { settings } from './main.js';
import { FireWorks } from "./fireworks.js";
import { Textos } from './textos.js';
import { Plataforma, PlataformaMovil } from './plataforma.js';
import { Escalera } from './Escalera.js';
import { Decorativos } from './decorativos.js';
import { Llave } from './llave.js';

// ============================================================================
//  Funciones varias
// 
// ============================================================================
function checkColision(obj1, obj2, corr, dy) {
    
    return obj1.rect.x + corr.obj1_hor < obj2.rect.x + obj2.rect.ancho - corr.obj2_hor && 
            obj1.rect.x + obj1.rect.ancho - corr.obj1_hor > obj2.rect.x + corr.obj2_hor &&
            obj1.rect.y + corr.obj1_ver < obj2.rect.y + dy + obj2.rect.alto - corr.obj2_ver && 
            obj1.rect.y + obj1.rect.alto - corr.obj1_ver > obj2.rect.y + dy + corr.obj2_ver;
}

// ----------------------------------------------------------------------------
function checkColision_abovePtos(obj1, obj2) {

    // En la 3ra linea del return la diferencia es --- obj2.rect.alto * 2 ---

    return obj1.rect.x < obj2.rect.x + obj2.rect.ancho && 
            obj1.rect.x + obj1.rect.ancho > obj2.rect.x &&
            obj1.rect.y < obj2.rect.y + obj2.rect.alto * 2 && 
            obj1.rect.y + obj1.rect.alto > obj2.rect.y;
}

// ============================================================================
function lanzar_fireWorks() {

    const nroChispas = settings.constante.nro_CHISPASfireWorks;

    const rangoX = Math.floor(settings.resolucion[0] / 2);
    const rangoY = Math.floor(settings.resolucion[1] / 4);

    const x = Math.floor(Math.random()* rangoX) + settings.resolucion[0] / 4;
    const y = Math.floor(Math.random()* rangoY) + settings.resolucion[1] / 8;
    
    for (let i = 0; i < nroChispas; i ++) {
        settings.objeto.chispa.push(new FireWorks(i, x, y));
    }
}

// ============================================================================
function construir_nuevoNivel() {

    settings.objeto.plataforma = [];
    settings.objeto.escalera = [];
    settings.objeto.decorativos = [];

    instanciar_plataformas(settings.marcadores.nivel);
    instanciar_escaleras(settings.marcadores.nivel);
    instanciar_decorativos(settings.marcadores.nivel);
    instanciar_llave(settings.marcadores.nivel);

    settings.marcadores.nivel ++;
    settings.estado.nivelSuperado = false;
    settings.sonidos.fireWorks.pause();
    settings.sonidos.musicaFondo.play();
}

// ============================================================================
function instanciar_plataformas(nivel) {

    const nivelActual = settings.array_nivelesPlataformas[nivel];
    const final = nivelActual.length - 1;

    for (let i = final; i >= 0; i --) {

        const p_y = nivelActual[i][0];
        const p_x = nivelActual[i][1];
        const p_ancho = nivelActual[i][2];
        const p_bordeIz = nivelActual[i][3];
        const p_bordeDe = nivelActual[i][4];
        const movil = nivelActual[i][5];

        if (movil === 0) {
            settings.objeto.plataforma.push(new Plataforma(p_y, p_x, p_ancho, './img/tile1.png', p_bordeIz, p_bordeDe));
            
        } else {
            settings.objeto.plataforma.push(new PlataformaMovil(p_y, p_x, p_ancho, './img/tile6.png', movil, movil));
        }
    }
}

// ============================================================================
function instanciar_escaleras(nivel) {

    const nivelActual = settings.array_nivelesEscaleras[nivel];

    for (let escalera of nivelActual) {

        const e_x = escalera[0];
        const e_y = escalera[1];
        const e_size = escalera[2];

        settings.objeto.escalera.push(new Escalera(e_x, e_y, e_size));
    }
}

// ============================================================================
function instanciar_decorativos(nivel) {

    const nivelActual = settings.array_nivelesDecorativos[nivel];

    for (let i of nivelActual) {
        const decX = i[0] * settings.constante.bsx;
        const accion = i[4]; // interactuable true/false
        console.log('dec:', decX, i[3], i[1], i[2], i[4]);

        settings.objeto.decorativos.push(new Decorativos(i[3], decX, i[1], i[2], accion));
    }
}

// ============================================================================
function instanciar_llave(nivel) {

    const nivelActual = settings.array_llaves[nivel];

    const id_llave = nivelActual[0];
    const llx = nivelActual[1];
    const lly = nivelActual[2];
    const booleano = nivelActual[3];

    settings.objeto.llave = new Llave(id_llave, llx, lly, booleano);
}

// ============================================================================
function check_gameOver() {

    if (settings.marcadores.vidas < 0 && settings.estado.enJuego) {
        settings.estado.enJuego = false;
        settings.estado.gameOver = true;

        const txt = 'Toque Pantalla o pulse ENTER para jugar volver a jugar...';

        setTimeout(() => {
            settings.estado.gameOver = false;
            settings.estado.reJugar = true;
            settings.objeto.textos.push(new Textos(txt, 'center', 27, 'rgb(240, 49, 19)'));
        }, 5000);
    }
}

// ============================================================================
function check_getLos7() {

    return settings.objeto.lossiete.every(diamante => diamante.mostrar);
}

// ============================================================================
function reescalaCanvas() {
    return;
}

// ----------------------------------------------------------------------------
function borraCanvas() {
    // canvas.width = canvas.width;
    // canvas.height = canvas.height;
    settings.ctx.fillStyle = settings.colores.sueloColor;
    settings.ctx.fillRect(0, 0, settings.canvas.width, settings.canvas.height);
}

// ----------------------------------------------------------------------------
function playSonidosLoop(sonido, loop, volumen) {
    sonido.play();
    sonido.loop = loop;
    sonido.volume = volumen;
}

export {
    borraCanvas,
    checkColision,
    checkColision_abovePtos,
    check_gameOver,
    check_getLos7,
    lanzar_fireWorks,
    construir_nuevoNivel,
    playSonidosLoop
};
