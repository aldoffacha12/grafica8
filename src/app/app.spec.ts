import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App integracion', () => {
  it('deberia arrancar con la matriz identidad', () => {
    const app = TestBed.runInInjectionContext(() => new App());
    expect(app.matrizActual.map((n) => n + 0)).toEqual([1, 0, 0, 1, 0, 0]);
  });

  it('traslacion deberia actualizar la matriz', () => {
    const app = TestBed.runInInjectionContext(() => new App());
    app.onCambio({ tipo: 'traslacion', tx: 10, ty: 20 });
    expect(app.matrizActual.map((n) => n + 0)).toEqual([1, 0, 0, 1, 10, 20]);
  });

  it('escala deberia actualizar la matriz', () => {
    const app = TestBed.runInInjectionContext(() => new App());
    app.onCambio({ tipo: 'escala', sx: 2, sy: 2 });
    expect(app.matrizActual.map((n) => n + 0)).toEqual([2, 0, 0, 2, 0, 0]);
  });

  it('reflejo horizontal deberia negar la escala x', () => {
    const app = TestBed.runInInjectionContext(() => new App());
    app.onCambio({ tipo: 'reflejo', eje: 'x' });
    expect(app.matrizActual.map((n) => n + 0)).toEqual([-1, 0, 0, 1, 0, 0]);
  });
});