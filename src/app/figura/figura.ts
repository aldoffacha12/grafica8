import { Component } from '@angular/core';
import { CoreShapeComponent, StageComponent } from 'ng2-konva';
import type { StageConfig } from 'konva/lib/Stage';
import type { RectConfig } from 'konva/lib/shapes/Rect';

@Component({
  selector: 'app-figura',
  imports: [StageComponent, CoreShapeComponent],
  templateUrl: './figura.html',
  styleUrl: './figura.css',
})
export class Figura {
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
}