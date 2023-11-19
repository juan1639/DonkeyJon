import { settings } from "./main.js";
import { Textos } from './textos.js';
import { checkColision } from "./functions.js";

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
            escaleraQuieto: [400, 0, 400, 0, false],
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
            velY: 4,
            velYsalto: -20,
            velYGrav: 0,
            flip: false,
            anima: 0
        }

        this.saltando = false;
        this.direcc_salto = this.move.velX;
        this.potencia_salto = 16;

        this.col_item = false;
        this.col_bicho = false;
        this.col_pajaro = false;
        this.col_bonus = false;

        this.accion_realizada = false;
        this.msg_NOllave = false;

        // --------------------------------------------------------------------------
        // Correcciones en las colisiones
        // (Poniendo los 4 atributos = 0 ... sería una colision estricta rectangular)
        // --------------------------------------------------------------------------
        this.correcciones = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: Math.floor(width / 3),
            obj2_ver: 0
        }

        this.correcciones_escalera = {
            obj1_hor: 0,
            obj1_ver: 10,
            obj2_hor: Math.floor(width / 2),
            obj2_ver: 0
        }

        this.correcciones_items = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: 0,
            obj2_ver: Math.floor(width / 3)
        }

        this.correcciones_bichos = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: Math.floor(width / 8),
            obj2_ver: Math.floor(height / 10)
        }

        this.correcciones_pajaros = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: Math.floor(width / 8),
            obj2_ver: Math.floor(height / 10)
        }

        this.intervalo_anima = setInterval(() => {
            this.move.anima = this.move.anima === 0 ? this.move.anima = 2 : this.move.anima = 0;
        }, 99);
        
        settings.sonidos.jump.volume = settings.volumen.jump;
        settings.sonidos.pacmanDies.volume = settings.volumen.pacmanDies;
        settings.sonidos.eatingGhost.volume = settings.volumen.eatingGhost;
        settings.sonidos.intermision.volume = settings.volumen.intermision;
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
        this.rect.clipX = clipXY[0];
        this.rect.clipY = clipXY[1];

        this.ctx.drawImage(this.img, this.rect.clipX, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, 
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

        let dxdy = [0, 0];
        let dx = dxdy[0];
        let dy = dxdy[1];

        // -----------------------------------------------
        dxdy = this.leer_teclado(dxdy);
        dx = dxdy[0];
        dy = dxdy[1];

        // -----------------------------------------------
        if (!this.ssheet.escalera[4]) {

            this.move.velYGrav -= settings.constante.GRAVEDAD;
            dy += this.move.velYGrav;
        }

        dx = this.check_limitesHorizontales(dx);
        dy = this.check_colisionPlataformas(dy);
        this.col_item = this.check_colisionItems();
        this.check_colisionLlave();
        this.col_bicho = this.check_colisionBichos();
        this.col_pajaro = this.check_colisionPajaros();
        this.col_bonus = this.check_colisionBonus();

        //this.rect.x += dx;
        //this.rect.y += dy;

        return [-dx, dy];
    }

    check_limitesHorizontales(dx) {

        const scroll_iz = settings.objeto.scroll[0];
        const scroll_de = settings.objeto.scroll[3];
        const top = this.move.velX * 2;

        if (scroll_iz.x - dx > 0) dx = scroll_iz.x;
        if (scroll_de.x + dx < top && !this.move.flip) dx = scroll_de.x;

        return dx;
    }

    check_colisionPlataformas(dy) {

        for (let plataf of settings.objeto.plataforma) {

            if (checkColision(plataf, this, this.correcciones, 0)) {

                //console.log('colision');
                const corr = Math.floor(this.rect.alto / 2);

                if (this.move.velYGrav < 0 && this.rect.y + corr < plataf.rect.y) {

                    this.move.velYGrav = 0;
                    //dy = 0;
                    dy = this.rect.y + this.rect.alto - plataf.rect.y;

                    if (this.saltando) this.saltando = false;
                }
            }
        }

        return dy;
    }

    check_colisionEscaleras() {

        for (let escalera of settings.objeto.escalera) {

            if (checkColision(escalera, this, this.correcciones_escalera, 0)) {

                //console.log('colision Escalera');
                const corr = Math.floor(this.rect.alto / 2);
                return true;
            }
        }

        return false;
    }

    check_colisionItems() {

        let superado = settings.estado.nivelSuperado;
        let llave = settings.objeto.llave;

        for (let item of settings.objeto.decorativos) {

            if (checkColision(item, this, this.correcciones_items, 0)) {

                if (item.id === './img/lockYellow.png' && !superado && llave.accion_realizada) {

                    settings.estado.nivelSuperado = true;
                    settings.sonidos.intermision.play();

                } else if (item.id === './img/lockYellow.png' && !superado && !llave.accion_realizada) {

                    this.mostrar_msg();
                }

                if (!item.accion_realizada && this.ssheet.agachado[4] && item.id.slice(0, 15) === './img/switchRed') {
                    item.accion_realizada = true;
                    this.accion_realizada = true;
                    settings.sonidos.eatingGhost.play();
                }
                
                if (item.accion) return true; // msg explicativo accion
            }
        }

        return false;
    }

    check_colisionLlave() {

        const llave = settings.objeto.llave;

        if (checkColision(llave, this, this.correcciones_escalera, 0)) {

            if (!llave.accion_realizada && this.ssheet.agachado[4]) {
                llave.accion_realizada = true;
                settings.sonidos.eatingGhost.play();
                return true;
            }
        }
        
        return false;
    }

    check_colisionBonus() {

        for (let bonus of settings.objeto.bonus) {

            if (checkColision(bonus, this, this.correcciones_pajaros, 0)) {
                this.ctx.fillStyle = 'green';
                this.ctx.fillRect(0, 0, 90, 90);
                
                return true;
            }
        }

        return false;
    }

    check_colisionBichos() {

        for (let bichos of settings.objeto.bichos) {

            if (checkColision(bichos, this, this.correcciones_bichos, 0)) {

                const array_posValidas = this.averiguar_plataformas();
                const pos_bicho = bichos.rect.y + bichos.rect.alto;

                if (array_posValidas.includes(pos_bicho)) {
                    this.ctx.fillStyle = 'red';
                    this.ctx.fillRect(0, 0, 90, 90);

                    return true;
                }
            }
        }

        return false;
    }

    check_colisionPajaros() {

        for (let pajaro of settings.objeto.pajaros) {

            if (checkColision(pajaro, this, this.correcciones_pajaros, 0)) {
                this.ctx.fillStyle = 'blue';
                this.ctx.fillRect(0, 0, 90, 90);
                
                return true;
            }
        }

        return false;
    }

    averiguar_plataformas() {

        const nro_plataformas = settings.array_plataformas[0][6];
        let array_posValidas = [];

        for (let i = 0; i < nro_plataformas; i ++) {
            const plataf = settings.ini_suelo - i * settings.gap;

            array_posValidas.push(plataf);
            array_posValidas.push(plataf - 1);
        }

        return array_posValidas;
    }

    leer_teclado(dxdy) {

        let dx = dxdy[0];
        let dy = dxdy[1];

        if (this.saltando) {
            this.reset_ssheetBooleanos();
            this.ssheet.andar[4] = true;

            return [this.direcc_salto, dy];
        } 
            

        if (settings.controles.tecla_iz || settings.controles.touch_iz) {
            this.move.flip = true;
            this.reset_ssheetBooleanos();
            this.ssheet.andar[4] = true;
            dx = -(this.move.velX);

        } else if (settings.controles.tecla_de || settings.controles.touch_de) {
            this.move.flip = false;
            this.reset_ssheetBooleanos();
            this.ssheet.andar[4] = true;
            dx = this.move.velX;

        } else {
            
            this.reset_ssheetBooleanos();
            this.ssheet.quieto[4] = true;
        }

        if (settings.controles.tecla_up || settings.controles.touch_up) {
        
            if (this.check_colisionEscaleras()) {

                this.reset_ssheetBooleanos();
                this.ssheet.escalera[4] = true;
                dy = this.move.velY;

            } else if (!this.saltando) {

                this.saltando = true;
                this.move.velYGrav = this.potencia_salto;
                this.direcc_salto = this.move.flip === true ? -6 : 6;
                settings.sonidos.jump.play();
            }
        
        } else if (settings.controles.tecla_do || settings.controles.touch_do) {
            this.reset_ssheetBooleanos();
            this.ssheet.agachado[4] = true; 
            //dy = 0;
        }

        return [dx, dy];
    }

    reset_ssheetBooleanos() {
        this.ssheet.quieto[4] = false;
        this.ssheet.andar[4] = false;
        this.ssheet.agachado[4] = false;
        this.ssheet.escalera[4] = false;
        this.ssheet.escaleraQuieto[4] = false;
        this.ssheet.saltar[4] = false;
    }

    mostrar_msg() {

        if (!this.msg_NOllave) {

            this.msg_NOllave = true;
            const x = this.rect.x - settings.constante.bsx * 3;
            const y = this.rect.y - settings.constante.bsy;
            
            settings.objeto.textos.push(new Textos('Debes coger la llave...', x, y, 70, 'red'));
            //console.log(settings.objeto.textos.length);

            setTimeout(() => {
                this.msg_NOllave = false;
                settings.objeto.textos.pop();
            }, 3000);
        }
    }
}
