import { checkColision } from "./functions.js";
import { settings } from "./main.js";

// ============================================================================
export class Boommerang {

    constructor(ruta, left, top, vel_x, vel_y) {

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = ruta;

        this.rect = {
            x: left,
            y: top,
            ancho: 70,
            alto: 32,
            clipX: 0,
            clipY: 0,
            anchoClip: 35,
            altoClip: 16 
        }

        this.move = {
            activo: true,
            velX: vel_x * 7,
            velY: vel_y,
            anima: 0
        }

        this.correcciones_pajaros = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: Math.floor(this.rect.ancho / 7),
            obj2_ver: Math.floor(this.rect.alto / 6)
        }

        setInterval(() => {
            this.move.anima ++;

            if (this.move.anima >= 4) this.move.anima = 0;
        }, 99);
    }

    dibuja(dxdy) {

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        this.rect.x += this.move.velX;
        this.rect.y += this.move.velY;

        this.check_limites();
        this.check_colisionPajaros();

        const clipX = this.move.anima * this.rect.anchoClip;

        this.ctx.drawImage(this.img, clipX, this.rect.clipY, this.rect.anchoClip, this.rect.altoClip,
            this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
    }

    check_limites() {

        const limit_de = settings.resolucion[0];
        const limit_do = settings.resolucion[1];

        if (this.rect.x > limit_de || this.rect.x < -this.rect.ancho || this.rect.y > limit_do || this.rect.y < -this.rect.alto) {
            settings.objeto.boommerang.shift();
        }
    }

    check_colisionPajaros() {

        for (let pajaro of settings.objeto.pajaros) {

            if (checkColision(pajaro, this, this.correcciones_pajaros, 0)) {
                
                console.log('colision Pajaro');

                settings.objeto.boommerang.shift();
                pajaro.abatido = true;
                settings.sonidos.dieThrow1.play();
                settings.sonidos.chips1.play();
            }
        }
    }
}
