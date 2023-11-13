import { settings } from "./main.js";

// ============================================================================
export class Plataforma {

    constructor(y, x, ancho, ruta) {

        this.anchoTile = settings.constante.bsx;
        this.altoTile = settings.constante.bsy;

        this.ctx = settings.ctx;
        this.img = settings.imagenes.tile_medio;
        this.img.src = ruta;

        this.x = x * this.anchoTile;
        this.y = y;
        this.ancho = ancho;
    }

    dibuja(dxdy) {

        this.x += dxdy[0];
        this.y += dxdy[1];

        for (let i = 0; i < this.ancho; i ++) {
            this.ctx.drawImage(this.img, this.x + i * this.anchoTile, this.y, this.anchoTile, this.altoTile);
        }
    }

}
