import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { CoreShapeComponent, StageComponent } from 'ng2-konva';
import Konva from 'konva';
import type { StageConfig } from 'konva/lib/Stage';
import type { RectConfig } from 'konva/lib/shapes/Rect';

@Component({
  selector: 'app-figura',
  imports: [StageComponent, CoreShapeComponent],
  templateUrl: './figura.html',
  styleUrl: './figura.css',
})
export class Figura implements OnChanges, AfterViewInit {
  @Input() matriz: number[] = [1, 0, 0, 1, 0, 0];

  stageConfig: StageConfig = { width: 620, height: 500 };
  rectConfig: RectConfig = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    offsetX: 50,
    offsetY: 50,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 2,
  };

  @ViewChild(CoreShapeComponent) koFigura!: CoreShapeComponent;

  ngOnChanges(): void {
    this.aplicarMatriz();
  }

  ngAfterViewInit(): void {
    this.aplicarMatriz();
  }

  private aplicarMatriz(): void {
    const nodo = this.koFigura?.getNode();
    if (!nodo) {
      return;
    }

    const transform = new Konva.Transform(this.matriz);
    const descompuesta = transform.decompose();

    const [ancho, alto] = [
      this.rectConfig.width! * descompuesta.scaleX,
      this.rectConfig.height! * descompuesta.scaleY,
    ];

    const cx = this.stageConfig.width! / 2;
    const cy = this.stageConfig.height! / 2;

    const x = this.acotar(cx + descompuesta.x, ancho / 2, this.stageConfig.width! - ancho / 2);
    const y = this.acotar(cy + descompuesta.y, alto / 2, this.stageConfig.height! - alto / 2);

    nodo.setAttrs({
      x,
      y,
      scaleX: descompuesta.scaleX,
      scaleY: descompuesta.scaleY,
      rotation: descompuesta.rotation,
    });
    nodo.getLayer()?.batchDraw();
  }

  private acotar(valor: number, minimo: number, maximo: number): number {
    return Math.min(Math.max(valor, minimo), Math.max(maximo, minimo));
  }
}