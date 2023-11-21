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
        this.accion_realizada = false;

        const size = this.elegir_sizeElemento(this.anchoTile, this.altoTile);
        const ancho = size[0];
        const alto = size[1];

        this.rect = {
            x: left,
            y: top - alto,
            ancho: ancho,
            anchoBucle: cuantos,
            alto: alto
        }
        
        if (this.id.slice(0, 12) === './img/lockYe') this.rect.x += Math.floor(this.anchoTile / 5);

        this.anima = false;

        setInterval(() => {
            this.anima = this.anima ? this.anima = false : this.anima = true;
        }, 99);
    }

    dibuja(dxdy) {

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        let img = this.img;
        img.src = this.elegirImg();

        const ancho = this.rect.ancho;
        const alto = this.rect.alto;

        for (let i = 0; i < this.rect.anchoBucle; i ++) {
            this.ctx.drawImage(img, this.rect.x + i * ancho, this.rect.y, ancho, alto);
        }
    }

    elegir_sizeElemento() {

        if (this.id.slice(0, 14) === './img/Letrero_') {
            return [this.anchoTile * 4, this.altoTile * 3];

        } else if (this.id.slice(0, 12) === './img/signAr') {
            return [this.anchoTile, this.altoTile * 2];
            
        } else if (this.id.slice(0, 15) === './img/switchRed') {
            return [this.anchoTile, this.altoTile];

        } else if (this.id.slice(0, 12) === './img/flagYe') {
            return [this.anchoTile * 2, this.altoTile * 3];

        } else if (this.id.slice(0, 12) === './img/lockYe') {
            return [this.anchoTile * 2, this.altoTile * 2];
        }

        return [this.anchoTile * 2, this.altoTile * 4];
    }

    elegirImg() {

        if (this.id.slice(0, 12) === './img/flagYe') {

            if (this.anima) {
                return './img/flagYellow1.png';
            } else {
                return './img/flagYellow2.png';
            }
        }

        if (this.id.slice(0, 15) === './img/switchRed') {
            
            if (this.accion_realizada) {
                return './img/switchRed_right.png';
            } else {
                return './img/switchRed_mid.png';
            }
        }

        if (this.id.slice(0, 12) === './img/lockYe') {
            
            if (settings.objeto.llave.accion_realizada) {
                return './img/signExit.png';
            } else {
                return './img/lockYellow.png';
            }
        }

        return this.img.src;
    }
}

// ============================================================================
export class DecorativosOffGame {

    constructor(id, left, top, width, height) {

        this.anchoTile = settings.constante.bsx;
        this.altoTile = settings.constante.bsy;
        this.id = id;

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = this.id;
        
        left -= width / 2;
        top -= height / 1.7;

        this.rect = {
            x: Math.floor(left),
            y: Math.floor(top),
            ancho: width,
            alto: height
        }
    }

    dibuja(dxdy) {

        this.rect.x += dxdy[0];
        this.rect.y += dxdy[1];

        if (settings.estado.preJuego) {
            this.ctx.drawImage(this.img, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
        }
    }
}
