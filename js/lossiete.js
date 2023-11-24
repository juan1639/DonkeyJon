import { settings } from "./main.js";

// ============================================================================
export class LosSiete {

    constructor(id, left, top) {

        this.id = id;
        this.mostrar = false;

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = './img/items_ri.png';

        const marginLeft = Math.floor(settings.resolucion[0] / 2 - ((settings.constante.bsx * 7) / 2));

        this.rect = {
            x: marginLeft + left,
            y: top,
            ancho: settings.constante.bsx,
            alto: settings.constante.bsy
        }

        const clipX = 8 + 32 * this.id;

        this.clip = {
            x: clipX,
            y: 224,
            ancho: 32,
            alto: 24
        }
    }

    dibuja() {

        if (this.mostrar) {
            this.ctx.drawImage(this.img, this.clip.x, this.clip.y, this.clip.ancho, this.clip.alto, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
        } 
    }
}
