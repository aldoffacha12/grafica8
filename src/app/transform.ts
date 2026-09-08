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

  // Matriz redondeada a 2 decimales, lista para mostrar en pantalla
  matrizTexto = computed(() => {
    return Array.from(this._matriz()).map((n) => Math.round(n * 100) / 100);
  });

  actualizar(evento: EventoTransformacion): void {
    switch (evento.tipo) {
      case 'trasladar':
        if (evento.eje === 'x') this.tx = evento.valor ?? this.tx;
        if (evento.eje === 'y') this.ty = evento.valor ?? this.ty;
        break;

      case 'rotar':
        this.angulo = evento.valor ?? this.angulo;
        break;

      case 'escalar':
        if (evento.eje === 'x') this.sx = this.aplicarSigno(evento.valor ?? Math.abs(this.sx), this.sx);
        if (evento.eje === 'y') this.sy = this.aplicarSigno(evento.valor ?? Math.abs(this.sy), this.sy);
        break;

      case 'reflejarX':
        this.sx = -this.sx;
        break;

      case 'reflejarY':
        this.sy = -this.sy;
        break;

      case 'reset':
        this.tx = 0; this.ty = 0; this.sx = 1; this.sy = 1; this.angulo = 0;
        break;
    }
    this.recalcularMatriz();
  }

  // Mantiene el signo actual (por si ya estaba reflejado) al setear una nueva escala
  private aplicarSigno(magnitud: number, actual: number): number {
    const signo = actual < 0 ? -1 : 1;
    return Math.abs(magnitud) * signo;
  }

  private recalcularMatriz(): void {
    const m = mat2d.create();
    mat2d.translate(m, m, [this.tx, this.ty]);
    mat2d.rotate(m, m, (this.angulo * Math.PI) / 180); // grados -> radianes
    mat2d.scale(m, m, [this.sx, this.sy]);
    this._matriz.set(m);
  }
}