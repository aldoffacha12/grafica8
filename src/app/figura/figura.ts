import { Component, Input, OnChanges } from '@angular/core';
import { CoreShapeComponent, StageComponent } from 'ng2-konva';
import { mat4, vec3 } from 'gl-matrix';
import type { StageConfig } from 'konva/lib/Stage';
import type { LineConfig } from 'konva/lib/shapes/Line';

const stageAncho = 620;
const stageAlto = 500;

@Component({
  selector: 'app-figura',
  imports: [StageComponent, CoreShapeComponent],
  templateUrl: './figura.html',
  styleUrl: './figura.css',
})
export class Figura implements OnChanges {
  @Input() matriz: number[] = [1, 0, 0, 1, 0, 0];

  stageConfig: StageConfig = { width: stageAncho, height: stageAlto };

  caras: LineConfig[] = [];

  private readonly carasIndices: number[][] = [
    [0, 1, 2, 3],
    [7, 6, 5, 4],
    [0, 3, 7, 4],
    [1, 5, 6, 2],
    [3, 2, 6, 7],
    [0, 1, 5, 4],
  ];

  private readonly coloresCaras: string[] = [
    'rgba(225, 70, 70, 0.95)',
    'rgba(150, 40, 40, 0.95)',
    'rgba(120, 30, 30, 0.9)',
    'rgba(205, 95, 85, 0.9)',
    'rgba(245, 135, 120, 0.95)',
    'rgba(100, 25, 25, 0.9)',
  ];

  ngOnChanges(): void {
    this.caras = this.dibujarCubo();
  }

  private dibujarCubo(): LineConfig[] {
    const [a, b, c, d, tx, ty] = this.matriz;

    const escalaX = a * d - b * c < 0 ? -Math.hypot(a, b) : Math.hypot(a, b);
    const escalaY = Math.hypot(c, d);
    const angulo = Math.atan2(b, a);

    const modelo = mat4.create();
    mat4.translate(modelo, modelo, [tx, ty, 0]);
    mat4.rotateZ(modelo, modelo, angulo);
    mat4.rotateY(modelo, modelo, 0.45);
    mat4.rotateX(modelo, modelo, 0.2);
    mat4.scale(modelo, modelo, [escalaX, escalaY, 1]);

    const proyectados: vec3[] = [];
    for (const vertice of this.vertices()) {
      proyectados.push(
        vec3.transformMat4(
          vec3.create(),
          vec3.fromValues(vertice[0], vertice[1], vertice[2]),
          modelo
        )
      );
    }

    const [ox, oy] = this.acomodar(proyectados);

    return this.carasIndices
      .map((indices, i) => ({
        indices,
        color: this.coloresCaras[i],
        profundidad: this.profundidadMedia(indices, proyectados),
      }))
      .sort((f1, f2) => f2.profundidad - f1.profundidad)
      .map(({ indices, color }) => {
        const points: number[] = [];
        for (const indice of indices) {
          points.push(proyectados[indice][0] + ox, proyectados[indice][1] + oy);
        }
        return {
          points,
          closed: true,
          fill: color,
          stroke: '#2b2b2b',
          strokeWidth: 1.5,
          lineJoin: 'round',
        } as LineConfig;
      });
  }

  private vertices(): number[][] {
    const mitad = { x: 45, y: 45, z: 45 };
    const { x, y, z } = mitad;
    return [
      [-x, -y, z],
      [x, -y, z],
      [x, y, z],
      [-x, y, z],
      [-x, -y, -z],
      [x, -y, -z],
      [x, y, -z],
      [-x, y, -z],
    ];
  }

  private acomodar(proyectados: vec3[]): [number, number] {
    const cx = stageAncho / 2;
    const cy = stageAlto / 2;
    const bbox = this.calcularBbox(proyectados);

    const dx = Math.min(
      Math.max(0, -(bbox.minX + cx)),
      Math.max(0, stageAncho - (bbox.maxX + cx))
    );
    const dy = Math.min(
      Math.max(0, -(bbox.minY + cy)),
      Math.max(0, stageAlto - (bbox.maxY + cy))
    );

    return [cx + dx, cy + dy];
  }

  private profundidadMedia(indices: number[], proyectados: vec3[]): number {
    let z = 0;
    for (const indice of indices) {
      z += proyectados[indice][2];
    }
    return z / indices.length;
  }

  private calcularBbox(proyectados: vec3[]): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  } {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const p of proyectados) {
      minX = Math.min(minX, p[0]);
      maxX = Math.max(maxX, p[0]);
      minY = Math.min(minY, p[1]);
      maxY = Math.max(maxY, p[1]);
    }
    return { minX, minY, maxX, maxY };
  }
}