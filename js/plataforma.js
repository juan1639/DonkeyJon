import { settings } from "./main.js";

// ============================================================================
export class Plataforma {

    constructor(y, x, ancho, ruta, bordeIz, bordeDe) {

        this.anchoTile = settings.constante.bsx;
        this.altoTile = settings.constante.bsy;

        this.ctx = settings.ctx;
        this.img = settings.imagenes.tile_medio;
        this.img.src = ruta;

        this.img_bordeIz = new Image();
        this.img_bordeIz.src = './img/tile2.png';
        this.img_bordeDe = new Image();
        this.img_bordeDe.src = './img/tile3.png';

        this.x = x * this.anchoTile;
        this.y = y;
        this.ancho = ancho;

        this.bordeIz = bordeIz;
        this.bordeDe = bordeDe;
    }

    dibuja(dxdy) {

        this.x += dxdy[0];
        this.y += dxdy[1];

        let imagen = this.img; 

        for (let i = 0; i < this.ancho; i ++) {

            if (i === 0 && this.bordeIz) {
                imagen = this.img_bordeIz;

            } else if (i === this.ancho - 1 && this.bordeDe) {
                imagen = this.img_bordeDe;
                
            } else {
                imagen = this.img;
            }

            this.ctx.drawImage(imagen, this.x + i * this.anchoTile, this.y, this.anchoTile, this.altoTile);
        }
    }
}
