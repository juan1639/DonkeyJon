import { settings } from "./main.js";
import { checkColision } from "./functions.js";

// ============================================================================
export class Plataforma {

    constructor(top, left, width, ruta, bordeIz, bordeDe) {

        this.anchoTile = settings.constante.bsx;
        this.altoTile = settings.constante.bsy;

        this.rutaArchivoPng = ruta;

        this.ctx = settings.ctx;
        this.img = settings.imagenes.tile_medio;
        this.img.src = ruta;

        this.img_bordeIz = new Image();
        this.img_bordeIz.src = './img/tile2.png';
        this.img_bordeDe = new Image();
        this.img_bordeDe.src = './img/tile3.png';

        this.bordeIz = bordeIz;
        this.bordeDe = bordeDe;

        this.rect = {
            x: left * settings.constante.bsx,
            y: top,
            ancho: width * settings.constante.bsx,
            anchoBucle: width,
            alto: settings.constante.bsy
        }
    }

    dibuja(dxdy) {

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        if (this.rect.y < -settings.constante.bsy || this.rect.y > settings.resolucion[1] + settings.constante.bsy) return;

        // -------------------------------------------------------------------------
        let imagen = this.img; 

        for (let i = 0; i < this.rect.anchoBucle; i ++) {

            if (i === 0 && this.bordeIz) {
                imagen = this.img_bordeIz;

            } else if (i === this.rect.anchoBucle - 1 && this.bordeDe) {
                imagen = this.img_bordeDe;
                
            } else {
                imagen = this.img;
            }

            this.ctx.drawImage(imagen, this.rect.x + i * this.anchoTile, this.rect.y, this.anchoTile, this.altoTile);
        }
    }
}

// ============================================================================
export class PlataformaMovil {

    constructor(top, left, width, ruta, dx, dy) {

        this.anchoTile = settings.constante.bsx;
        this.altoTile = settings.constante.bsy;

        this.rutaArchivoPng = ruta;

        this.ctx = settings.ctx;
        this.img = settings.imagenes.tile_madera;
        this.img.src = ruta;

        this.rect = {
            x: left * settings.constante.bsx,
            y: top,
            ancho: width * settings.constante.bsx,
            anchoBucle: width,
            alto: settings.constante.bsy
        }

        this.move = {
            activo: true,
            velX: dx,
            velY: dy
        }

        this.correcciones = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: 0,
            obj2_ver: 0
        } 
    }

    dibuja(dxdy) {

        this.actualiza(dxdy);

        if (this.rect.y < -settings.constante.bsy || this.rect.y > settings.resolucion[1] + settings.constante.bsy) return;

        // -------------------------------------------------------------------
        for (let i = 0; i < this.rect.anchoBucle; i ++) {

            this.ctx.drawImage(this.img, this.rect.x + i * this.anchoTile, this.rect.y, this.anchoTile, this.altoTile);
        }
    }

    actualiza(dxdy) {

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        if (!settings.objeto.jugador.accion_realizada) return;

        // ---------------------------------------------------
        if (settings.marcadores.nivel === 1) {

            this.rect.x += this.move.velX;

            if (this.check_colisionPlataformas()) {
                this.rect.x -= this.move.velX;
                this.move.velX *= -1;
            }

            return;
        }

        if (settings.marcadores.nivel === 2) {

            this.rect.y += this.move.velY;

            if (this.check_colisionPlataformas()) {
                this.rect.y -= this.move.velY;
                this.move.velY *= -1;
            }

            return;
        }
    }

    check_colisionPlataformas() {

        for (let plataf of settings.objeto.plataforma) {

            if (checkColision(plataf, this, this.correcciones, 0)) {
                
                if (plataf.rutaArchivoPng !== './img/tile6.png') return true;
            }
        }

        return false;
    }
}
