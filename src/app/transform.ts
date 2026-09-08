import { Injectable, signal, computed } from '@angular/core';
import { mat2d } from 'gl-matrix';

export interface EventoTransformacion {
  tipo: 'trasladar' | 'rotar' | 'escalar' | 'reflejarX' | 'reflejarY' | 'reset';
  valor?: number;
  eje?: 'x' | 'y';
}

@Injectable({ providedIn: 'root' })
export class TransformService {
  private tx = 0;
  private ty = 0;
  private sx = 1;
  private sy = 1;
  private angulo = 0;

  private _matriz = signal<mat2d>(mat2d.create());
  matriz = this._matriz.asReadonly();

  actualizar(evento: EventoTransformacion): void {
    switch (evento.tipo) {
      case 'trasladar':
        if (evento.eje === 'x') this.tx = evento.valor ?? this.tx;
        if (evento.eje === 'y') this.ty = evento.valor ?? this.ty;
        break;
    }
    this.recalcularMatriz();
  }

  private recalcularMatriz(): void {
    const m = mat2d.create();
    mat2d.translate(m, m, [this.tx, this.ty]);
    this._matriz.set(m);
  }
}