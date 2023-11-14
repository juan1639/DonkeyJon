import { settings } from "./main.js";

// ============================================================================
export class Escalera {

    constructor(x, y, size) {

        this.anchoTile = settings.constante.bsx;
        this.altoTile = settings.constante.bsy;

        this.ctx = settings.ctx;
        this.img = settings.imagenes.escalera;
        this.img.src = './img/ladderWide_mid.png';

        this.x = x * this.anchoTile;
        this.y = y - this.altoTile;
        this.size = size;
        console.log(this.y, this.size, this.altoTile);
    }

    dibuja(dxdy) {

        this.x += dxdy[0];
        this.y += dxdy[1];

        const top_escalera = this.y - this.size;

        for (let i = this.y; i > top_escalera; i -= this.altoTile) {
            this.ctx.drawImage(this.img, this.x, i, this.anchoTile, this.altoTile);
        }
    }
}

