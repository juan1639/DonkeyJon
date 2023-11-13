import { settings } from "./main.js";

// ============================================================================
export class Jugador {

    constructor(left, top, width, height) {

        this.ctx = settings.ctx;
        this.img = settings.imagenes.ssheet_jugador;
        this.img.src = './img/Ssheet_jugador.png';

        this.ssheet = {
            quieto: [0, 0, 0, 0, true],
            andar: [0, 110, 80, 110, false],
            agachado: [240, 0, 240, 0, false],
            escalera: [400, 0, 480, 0, false],
            saltar: [80, 0, 160, 0, false]
        }

        this.rect = {
            x: left,
            y: top,
            ancho: width,
            alto: height,
            clipX: 0,
            clipY: 0,
            clipAncho: 80,
            clipAlto: 110
        }

        this.move = {
            acelX: 0.0,
            velX: 6,
            velY: -20,
            flip: false,
            anima: 0
        }

        // (Poniendo los 4 atributos = 0 ... sería una colision estricta rectangular)
        this.correcciones = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: Math.floor(this.rect.ancho / 3),
            obj2_ver: 0,
        }

        this.intervalo_anima = setInterval(() => {
            this.move.anima = this.move.anima === 0 ? this.move.anima = 2 : this.move.anima = 0;
        }, 99);
    }

    dibuja() {

        const dxdy = this.actualiza();

        // -----------------------------------------------------------
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

        return dxdy;
    }

    selecc_ssheetAccion() {

        const i = this.move.anima;

        if (this.ssheet.quieto[4]) {
            return [this.ssheet.quieto[i], this.ssheet.quieto[i + 1]]; 

        } else if (this.ssheet.andar[4]) {
            return [this.ssheet.andar[i], this.ssheet.andar[i + 1]];

        } else if (this.ssheet.agachado[4]) {
            return [this.ssheet.agachado[i], this.ssheet.agachado[i + 1]];

        } else if (this.ssheet.escalera[4]) {
            return [this.ssheet.escalera[i], this.ssheet.escalera[i + 1]];

        } else if (this.ssheet.saltar[4]) {
            return [this.ssheet.saltar[i], this.ssheet.saltar[i + 1]];
        }

        return [0, 0];
    }

    actualiza() {

        let dx = 0;
        let dy = 0;

        dx = this.leer_teclado(dx);

        //this.move.velY += settings.constante.GRAVEDAD;
        //dy += this.move.velY;

        dx = this.check_limitesHorizontales(dx);

        //this.rect.x += dx;
        //this.rect.y += dy;

        return [-dx, -dy];
    }

    check_limitesHorizontales(dx) {

        const scroll_iz = settings.objeto.scroll[0];
        const scroll_de = settings.objeto.scroll[2];
        const top = this.move.velX * 2;

        if (scroll_iz.x - dx > 0) dx = scroll_iz.x;
        if (scroll_de.x + dx < top && !this.move.flip) dx = scroll_de.x;

        return dx;
    }

    leer_teclado(dx) {

        if (settings.controles.tecla_iz) {
            this.move.flip = true;
            this.ssheet.quieto[4] = false;
            this.ssheet.andar[4] = true;
            dx = -(this.move.velX);

        } else if (settings.controles.tecla_de) {
            this.move.flip = false;
            this.ssheet.quieto[4] = false;
            this.ssheet.andar[4] = true;
            dx = this.move.velX;

        } else {
            this.ssheet.andar[4] = false;
            this.ssheet.quieto[4] = true;
        }

        return dx;
    }
}
