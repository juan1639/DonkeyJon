import { settings } from './main.js';
import { FireWorks } from "./fireworks.js";

// ============================================================================
//  Funciones varias
// 
// ----------------------------------------------------------------------------

// ============================================================================
function checkColision(obj1, obj2, corr, dy) {

    return obj1.rect.x + corr.obj1_hor < obj2.rect.x + obj2.rect.ancho - corr.obj2_hor && 
            obj1.rect.x + obj1.rect.ancho - corr.obj1_hor > obj2.rect.x + corr.obj2_hor &&
            obj1.rect.y + corr.obj1_ver < obj2.rect.y + dy + obj2.rect.alto - corr.obj2_ver && 
            obj1.rect.y + obj1.rect.alto - corr.obj1_ver > obj2.rect.y + dy + corr.obj2_ver;
}

// ============================================================================
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

function playSonidosLoop(sonido, loop, volumen) {
    sonido.play();
    sonido.loop = loop;
    sonido.volume = volumen;
}

export {
    borraCanvas,
    checkColision,
    checkColision_abovePtos,
    lanzar_fireWorks,
    playSonidosLoop
};
