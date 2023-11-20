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
function lanzar_fireWorks() {

    const rangoX = Math.floor(settings.resolucion[0] / 2) + settings.resolucion[0] / 4;
    const rangoY = Math.floor(settings.resolucion[1] / 3) + settings.resolucion[1] / 6;

    const x = Math.floor(Math.random()* rangoX);
    const y = Math.floor(Math.random()* rangoY);
    
    for (let i = 0; i < 50; i ++) {

        const rango_velX = 49;
        const rango_velY = 49;

        const velX = Math.floor(Math.random()* rango_velX * 2);
        const velY = Math.floor(Math.random()* rango_velY * 2);

        settings.objeto.chispa.push(new FireWorks(i, x, y, velX - rango_velX, velY - rango_velY));
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
    lanzar_fireWorks,
    playSonidosLoop
};
