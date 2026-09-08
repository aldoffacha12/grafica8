import { Component, inject } from '@angular/core';
import { Controles } from './controles/controles';
import { Figura } from './figura/figura';
import { RouterOutlet } from '@angular/router';
import { TransformService } from './transform';

interface EventoControl {
  tipo: string;
  tx?: number;
  ty?: number;
  sx?: number;
  sy?: number;
  angulo?: number;
  eje?: 'x' | 'y';
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Controles, Figura],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private transformService = inject(TransformService);

  matrizActual: number[] = [1, 0, 0, 1, 0, 0];

  onCambio(evento: EventoControl): void {
    switch (evento.tipo) {
      case 'traslacion':
        this.transformService.actualizar({ tipo: 'trasladar', eje: 'x', valor: evento.tx });
        this.transformService.actualizar({ tipo: 'trasladar', eje: 'y', valor: evento.ty });
        break;
      case 'escala':
        this.transformService.actualizar({ tipo: 'escalar', eje: 'x', valor: evento.sx });
        this.transformService.actualizar({ tipo: 'escalar', eje: 'y', valor: evento.sy });
        break;
      case 'rotacion':
        this.transformService.actualizar({ tipo: 'rotar', valor: evento.angulo });
        break;
      case 'reflejo':
        this.transformService.actualizar(
          evento.eje === 'y' ? { tipo: 'reflejarY' } : { tipo: 'reflejarX' }
        );
        break;
    }
    this.matrizActual = Array.from(this.transformService.matriz());
  }
}