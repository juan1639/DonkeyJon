import { settings } from "./main.js";

// ============================================================================
export class Pajaros {

    constructor(id, posIniY) {

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = './img/bird64x72.png';

        this.id = id;

        this.ancho = settings.constante.bsx;
        this.alto = settings.constante.bsy;

        this.max_recorrido = settings.resolucion[0] * 4;
        this.recorrido = 0;

        this.max_recorrY = settings.constante.bsy * 3;
        this.recorrY = 0;

        const rx = settings.resolucion[0];
        const r = settings.resolucion[1];

        this.array_posIni = [
            [
                -Math.floor(Math.random()* rx),
                posIniY + Math.floor(Math.random()* r),
                3, 0, true
            ],
            [
                rx + Math.floor(Math.random()* rx),
                posIniY + Math.floor(Math.random()* r),
                -3, 0, false
            ],
            [
                -Math.floor(Math.random()* rx),
                posIniY + Math.floor(Math.random()* r),
                4, 1, true
            ],
            [
                Math.floor(Math.random()* rx) + this.ancho * 4,
                posIniY + Math.floor(Math.random()* r),
                -4, 1, false
            ],
            [
                -Math.floor(Math.random()* rx),
                posIniY + Math.floor(Math.random()* r),
                5, 1, true
            ],
            [
                rx + Math.floor(Math.random()* rx),
                posIniY + Math.floor(Math.random()* r),
                -5, 1, false
            ]
        ];

        const posXY = this.selecc_posInicial();

        this.rect = {
            x: posXY[0],
            y: posXY[1],
            ancho: this.ancho * 2,
            alto: this.alto * 2,
            clipX: 0,
            clipY: 0,
            clipAncho: 64,
            clipAlto:72
        }

        this.move = {
            activo: true,
            acelX: 0.0,
            velX: posXY[2],
            velY: posXY[3],
            flip: posXY[4],
            anima: 0
        }

        // --------------------------------------------------------------------------
        // Correcciones en las colisiones
        // (Poniendo los 4 atributos = 0 ... sería una colision estricta rectangular)
        // --------------------------------------------------------------------------
        this.correcciones = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: 0,
            obj2_ver: 0
        }

        this.intervalo_anima = setInterval(() => {

            this.move.anima ++;
            if (this.move.anima > 20) this.move.anima = 0;
        }, 99);

        console.log('ene_pajaro:', this.rect.x, this.rect.y, this.move.velY);
    }

    dibuja(dxdy) {

        this.actualiza(dxdy);

        this.ctx.save();

        if (this.move.flip) {
            this.ctx.translate(this.rect.x + this.rect.ancho, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-this.rect.x, 0);
        }

        this.rect.clipX = this.selecc_ssheetAnima();

        this.ctx.drawImage(this.img, this.rect.clipX, 0, this.rect.clipAncho, this.rect.clipAlto, 
            this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);

        this.ctx.restore();

        //this.ctx.drawImage(this.img, this.rect.clipX, this.rect.clipY,)
    }

    selecc_ssheetAnima() {
        return this.move.anima * this.rect.clipAncho;
    }

    actualiza(dxdy) {

        let dy = 0;

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        if (!this.move.activo) return;

        // -------------------------------------------
        this.rect.x += this.move.velX;
        this.recorrido += Math.abs(this.move.velX);

        this.rect.y += this.move.velY;
        this.recorrY ++;

        this.check_cambioY(this.recorrY);
        this.check_cambioDireccion(this.recorrido);
    }

    check_cambioDireccion(recorrido) {

        if (recorrido >= this.max_recorrido) {

            this.recorrido = 0;
            this.move.velX = -this.move.velX;
            this.move.flip = this.move.flip ? this.move.flip = false : this.move.flip = true;
        }
    }

    check_cambioY(recorrido) {

        if (recorrido >= this.max_recorrY) {

            this.recorrY = 0;
            this.move.velY = -this.move.velY;
        }
    }

    selecc_posInicial() {
        const nro_rnd = Math.floor(Math.random() * this.array_posIni.length);

        return this.array_posIni[nro_rnd];
    }
}
