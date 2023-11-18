import { settings } from "./main.js";

// ============================================================================
export class Llave {

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
            y: top,
            ancho: this.anchoTile * 2,
            alto: this.altoTile * 2
        }

        this.rect.y -= this.rect.alto;

        this.clip = {
            x: 0,
            y: 0,
            ancho: 128,
            alto: 90
        }
    }

    dibuja(dxdy) {

        if (this.accion_realizada) {
            this.rect.x = 0;
            this.rect.y = 0;

        } else {

            this.rect.x += dxdy[0];
            this.rect.y += dxdy[1];
        }
        
        const cw = this.clip.ancho;
        const ch = this.clip.alto;

        this.ctx.drawImage(this.img, this.clip.x, this.clip.y, cw, ch, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
    }
}
