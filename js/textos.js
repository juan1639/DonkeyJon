import { settings } from "./main.js";

// ============================================================================
export class Textos {

    constructor(idTxt, left, top, size) {

        this.idTxt = idTxt;
        this.x = left;
        this.y = top;
        this.size = size;

        this.ctx = settings.ctx;
    }

    dibuja(dxdy) {

        this.x += dxdy[0];
        this.y += dxdy[1];

        this.ctx.font = this.size.toString() + 'px seriff';
        this.ctx.fillStyle = 'rgb(240, 240, 170)';

        this.ctx.fillText(this.idTxt, this.x, this.y);
    }
}
