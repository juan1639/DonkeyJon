import { settings } from "./main.js";

// ============================================================================
export class Escalera {

    constructor(left, top, sizeEscalera) {

        this.anchoTile = settings.constante.bsx;
        this.altoTile = settings.constante.bsy;

        this.ctx = settings.ctx;
        this.img = settings.imagenes.escalera;
        this.img.src = './img/ladderWide_mid.png';

        this.rect = {
            x: left * this.anchoTile,
            y: top - sizeEscalera,
            ancho: this.anchoTile,
            alto: sizeEscalera,
            size: sizeEscalera
        }

        console.log(this.rect.y, this.rect.size, this.altoTile);
    }

    dibuja(dxdy) {

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        const bottom_escalera = this.rect.y + this.rect.size;

        for (let i = this.rect.y; i < bottom_escalera; i += this.altoTile) {
            this.ctx.drawImage(this.img, this.rect.x, i, this.anchoTile, this.altoTile);
        }
    }
}

