import { lanzar_fireWorks } from "./functions.js";
import { settings } from "./main.js";

// ============================================================================
export class FireWorks {

    constructor(id, left, top, vel_x, vel_y) {

        this.ctx = settings.ctx;

        this.id = id;
        this.duracion = 60;

        this.rect = {
            x: left,
            y: top,
            ancho: 1,
            alto: 1,
            size: 1
        }

        this.move = {
            activo: true,
            velX: vel_x / 25,
            velY: vel_y / 20
        }
    }

    dibuja(dxdy) {

        if (this.duracion > 0) {

            this.duracion --;

            if (this.duracion === 0 && this.id === 1 && settings.estado.nivelSuperado) lanzar_fireWorks();

            const rgb = Math.floor(Math.random()* 200) + 55;

            this.rect.x += dxdy[0];
            this.rect.y += dxdy[1];

            this.rect.x += this.move.velX;
            this.rect.y += this.move.velY;

            this.rect.size = Math.floor((99 - this.duracion) / 25);

            this.ctx.fillStyle = 'rgb(255,' + rgb.toString() + ',9)';
            this.ctx.fillRect(this.rect.x, this.rect.y, this.rect.size, this.rect.size);
        }
    }
}
