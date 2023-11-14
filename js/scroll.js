import { settings } from "./main.js";

// ============================================================================
export class Scroll {

    constructor(x, y, ancho, alto, ruta) {

        this.ctx = settings.ctx;
        this.img = settings.imagenes.fondo_cielo1;
        this.img.src = ruta;

        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
    }

    dibuja(dxdy) {

        this.x += dxdy[0];
        this.y += dxdy[1];

        if (this.y > this.alto && dxdy[1] > 0) this.y -= this.alto * 2;
        if (this.y < -this.alto && dxdy[1] < 0) this.y += this.alto * 2;

        this.ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
    }
}
