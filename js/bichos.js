import { settings } from "./main.js";

// ============================================================================
export class Bichos {

    constructor() {

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = './img/Ssheet_platD.png';

        this.rect = {
            x: 1 * settings.constante.bsx,
            y: settings.resolucion[1] - settings.constante.bsy * 2,
            ancho: settings.constante.bsx * 2,
            alto: settings.constante.bsy,
            clipX: 270,
            clipY: 320,
            clipAncho: 112,
            clipAlto:72
        }

        this.move = {
            acelX: 0.0,
            velX: 6,
            velY: 0,
            flip: false,
            anima: 0
        }

        console.log(this.rect.x, this.rect.y);
    }

    dibuja(dxdy) {

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        //this.x += this.move.velX;

        this.ctx.save();

        if (this.move.flip) {
            this.ctx.translate(this.rect.x + this.rect.ancho, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-this.rect.x, 0);
        }

        this.ctx.drawImage(this.img, this.rect.clipX, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, 
            this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);

        this.ctx.restore();

        //this.ctx.drawImage(this.img, this.rect.clipX, this.rect.clipY,)
    }
}
