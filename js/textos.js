import { settings } from "./main.js";

// ============================================================================
export class Textos {

    constructor(idTxt, left, top, size, color) {

        this.idTxt = idTxt;
        this.x = left;
        this.y = top;
        this.size = size;
        this.color = color;

        this.ctx = settings.ctx;
    }

    dibuja(dxdy) {

        this.x += dxdy[0];
        this.y += dxdy[1];

        this.ctx.save();
        this.ctx.font = this.size.toString() + 'px seriff';
        this.ctx.fillStyle = this.color;

        const colision = settings.objeto.jugador.col_item;

        if (this.size === 40 && colision) {
            const x = settings.objeto.jugador.rect.x - settings.constante.bsx * 4;
            const y = settings.objeto.jugador.rect.y - settings.constante.bsy;

            this.ctx.fillText(this.idTxt, x, y);
        }

        this.ctx.fillText(this.idTxt, this.x, this.y);

        this.ctx.restore();
    }
}
