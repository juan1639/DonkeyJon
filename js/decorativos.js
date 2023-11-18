import { settings } from "./main.js";

// ============================================================================
export class Decorativos {

    constructor(id, left, top, cuantos, accion) {

        this.anchoTile = settings.constante.bsx;
        this.altoTile = settings.constante.bsy;
        this.id = id;

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = this.id;

        this.cuantos = cuantos;
        this.accion = accion;

        this.rect = {
            x: left,
            y: top,
            ancho: this.anchoTile,
            anchoBucle: cuantos,
            alto: this.altoTile
        }
    }

    dibuja(dxdy) {

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        const size = this.elegir_sizeElemento(this.anchoTile, this.altoTile);
        const ancho = size[0];
        const alto = size[1];

        for (let i = 0; i < this.rect.anchoBucle; i ++) {
            this.ctx.drawImage(this.img, this.rect.x + i * ancho, this.rect.y - alto, ancho, alto);
        }
    }

    elegir_sizeElemento() {

        if (this.id === './img/signLarge.png') {
            return [this.anchoTile * 4, this.altoTile * 3];

        } else if (this.id.slice(0, 12) === './img/signAr') {
            return [this.anchoTile, this.altoTile * 2];
            
        } else if (this.id.slice(0, 15) === './img/switchRed') {
            return [this.anchoTile, this.altoTile];
        }

        return [this.anchoTile * 2, this.altoTile * 4];
    }
}
