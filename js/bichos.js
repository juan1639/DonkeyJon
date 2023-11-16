import { settings } from "./main.js";
import { checkColision } from "./functions.js";

// ============================================================================
export class Bichos {

    constructor() {

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = './img/Ssheet_platD.png';

        this.ancho = settings.constante.bsx * 2;
        this.alto = settings.constante.bsy;

        this.ssheet = {
            andando: [270, 320, 270, 580, true],
        }

        this.rect = {
            x: 4 * settings.constante.bsx,
            // y: settings.array_plataformas[0][0] - this.alto,
            y: settings.resolucion[1] - settings.constante.bsy * 8,
            ancho: this.ancho,
            alto: this.alto,
            clipX: 270,
            clipY: 320,
            clipAncho: 112,
            clipAlto:72
        }

        this.move = {
            acelX: 0.0,
            velX: 4,
            velY: 0,
            flip: true,
            anima: 0
        }

        // --------------------------------------------------------------------------
        // Correcciones en las colisiones
        // (Poniendo los 4 atributos = 0 ... sería una colision estricta rectangular)
        // --------------------------------------------------------------------------
        this.correcciones = {
            obj1_hor: 0,
            obj1_ver: 0,
            // obj2_hor: Math.floor(this.rect.ancho / 3),
            obj2_hor: Math.floor(this.ancho / 2),
            obj2_ver: 0
        }

        const nivel = settings.ini_suelo;
        const gap = settings.gap;

        this.array_enque_nivelPlataforma = [
            nivel - gap * 5 - this.alto,
            nivel - gap * 4 - this.alto,
            nivel - gap * 3 - this.alto,
            nivel - gap * 2 - this.alto,
            nivel - gap * 1 - this.alto,
            nivel - this.alto
        ];

        this.intervalo_anima = setInterval(() => {
            this.move.anima = this.move.anima === 0 ? this.move.anima = 2 : this.move.anima = 0;
        }, 99);

        console.log(this.rect.x, this.rect.y);
    }

    dibuja(dxdy) {

        this.actualiza(dxdy);

        this.ctx.save();

        if (this.move.flip) {
            this.ctx.translate(this.rect.x + this.rect.ancho, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-this.rect.x, 0);
        }

        const clipXY = this.selecc_ssheetAccion();
        this.rect.clipX = clipXY[0];
        this.rect.clipY = clipXY[1];

        this.ctx.drawImage(this.img, this.rect.clipX, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, 
            this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);

        this.ctx.restore();

        //this.ctx.drawImage(this.img, this.rect.clipX, this.rect.clipY,)
    }

    selecc_ssheetAccion() {

        const i = this.move.anima;

        if (this.ssheet.andando[4]) {
            return [this.ssheet.andando[i], this.ssheet.andando[i + 1]];
        }

        return [0, 0];
    }

    actualiza(dxdy) {

        let dy = 0;

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        this.rect.x += this.move.velX;

        this.move.velY += settings.constante.GRAVEDAD;
        dy += this.move.velY;

        dy = this.check_colisionPlataformas(dy);

        this.rect.y += dy;
        
        //if (this.rect.y === this.array_enque_nivelPlataforma[5]) console.log('ultima');
        //if (this.rect.y === this.array_enque_nivelPlataforma[4]) console.log('anteultima');
    }

    check_colisionPlataformas(dy) {

        for (let plataf of settings.objeto.plataforma) {

            if (checkColision(plataf, this, this.correcciones, 0)) {

                //console.log('colision');
                this.move.velY = 0;
                //dy = this.rect.y + this.rect.alto - plataf.rect.y;
                dy = 0;
            }
        }

        return dy;
    }
}
