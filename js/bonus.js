import { settings } from "./main.js";

// ============================================================================
export class Bonus {

    constructor(id, left, top, accion) {

        this.anchoTile = settings.constante.bsx;
        this.altoTile = settings.constante.bsy;
        this.id = id;

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = this.id;

        this.accion = accion;
        this.accion_realizada = false;

        this.rect = {
            x: left,
            y: top - this.altoTile,
            ancho: this.anchoTile,
            alto: this.altoTile
        }

        const clipX = this.elegir_item();
        this.colorId = (clipX - 8) / 32;
        this.puntos = 2000;

        this.clip = {
            x: clipX,
            y: 224,
            ancho: 32,
            alto: 24
        }
    }

    dibuja(dxdy) {

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        const cw = this.clip.ancho;
        const ch = this.clip.alto;

        if (this.rect.x < -settings.constante.bsx || this.rect.x > settings.resolucion[0] + settings.constante.bsx || this.rect.y < -settings.constante.bsy * 2 || this.rect.y > settings.resolucion[1] + settings.constante.bsy) return;

        // -----------------------------------------------------------------------------------
        if (!this.accion_realizada) {
            this.ctx.drawImage(this.img, this.clip.x, this.clip.y, cw, ch, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
        } 
    }

    elegir_item() {

        return 8 + 32 * Math.floor(Math.random()* 7);
    }
}
