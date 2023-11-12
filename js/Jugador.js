import { settings } from "./main.js";

// ============================================================================
export class Jugador {

    constructor(left, top) {

        this.ctx = settings.ctx;
        this.img = settings.imagenes.ssheet_jugador;
        this.img.src = './img/Ssheet_jugador.png';

        this.ssheet = {
            quieto: [0, 0, 0, 0, false],
            andar: [0, 110, 80, 110, false],
            agachado: [240, 0, 240, 0, false],
            escalera: [400, 0, 480, 0, true],
            saltar: [80, 0, 160, 0, false]
        }

        this.rect = {
            x: left * settings.constante.bsx,
            y: top * settings.constante.bsy,
            ancho: 80,
            alto: 100,
            clipX: 0,
            clipY: 0,
            clipAncho: 80,
            clipAlto: 110
        }

        this.move = {
            acelX: 0.0,
            velX: 6,
            velY: -20,
            flip: false
        }

        // (Poniendo los 4 atributos = 0 ... sería una colision estricta rectangular)
        this.correcciones = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: Math.floor(this.rect.ancho / 3),
            obj2_ver: 0,
        }
    }

    dibuja() {

        this.ctx.save();

        if (this.move.flip) {
            this.ctx.translate(this.rect.x + this.rect.ancho, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-this.rect.x, 0);
        }

        const clipXY = this.selecc_ssheetAccion();
        this.clipX = clipXY[0];
        this.clipY = clipXY[1];

        this.ctx.drawImage(this.img, this.clipX, this.clipY, this.rect.clipAncho, this.rect.clipAlto, 
            this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);

        this.ctx.restore();

        //this.ctx.drawImage(this.img, this.rect.x, this.rect.y);
        //this.ctx.drawImage(this.img, 0, 0);
    }

    selecc_ssheetAccion() {

        if (this.ssheet.quieto[4]) {
            return [this.ssheet.quieto[0], this.ssheet.quieto[1]]; 

        } else if (this.ssheet.andar[4]) {
            return [this.ssheet.andar[0], this.ssheet.andar[1]];

        } else if (this.ssheet.agachado[4]) {
            return [this.ssheet.agachado[0], this.ssheet.agachado[1]];

        } else if (this.ssheet.escalera[4]) {
            return [this.ssheet.escalera[0], this.ssheet.escalera[1]];

        } else if (this.ssheet.saltar[4]) {
            return [this.ssheet.saltar[0], this.ssheet.saltar[1]];
        }

        return [0, 0];
    }
}
