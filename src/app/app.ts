import { Component } from '@angular/core';
import { Figura } from './figura/figura';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Figura],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly matrizHardcodeada: number[] = [2, 0, 0, 1.5, 150, 120];
}