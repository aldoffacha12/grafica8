import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
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

  stageConfig: StageConfig = { width: 800, height: 600 };
  rectConfig: RectConfig = {
    x: 100,
    y: 100,
    width: 120,
    height: 80,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 2,
  };

  @ViewChild(CoreShapeComponent) koFigura!: CoreShapeComponent;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['matriz']) {
      this.aplicarMatriz();
    }
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
    nodo.setAttrs(transform.decompose());
    nodo.getLayer()?.batchDraw();
  }
}