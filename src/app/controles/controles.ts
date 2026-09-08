import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controles',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './controles.html',
  styleUrl: './controles.css'
})
export class Controles {

  tx = 0;
  ty = 0;
  escala = 1;
  rotacion = 0;

  @Output() cambio = new EventEmitter<any>();

  emitirTraslacion() {
    this.cambio.emit({
      tipo: 'traslacion',
      tx: this.tx,
      ty: this.ty
    });
  }

  emitirEscala() {
    this.cambio.emit({
      tipo: 'escala',
      sx: this.escala,
      sy: this.escala
    });
  }

  emitirRotacion() {
    this.cambio.emit({
      tipo: 'rotacion',
      angulo: this.rotacion
    });
  }

  reflejoHorizontal() {
    this.cambio.emit({
      tipo: 'reflejo',
      eje: 'x'
    });
  }

  reflejoVertical() {
    this.cambio.emit({
      tipo: 'reflejo',
      eje: 'y'
    });
  }

}