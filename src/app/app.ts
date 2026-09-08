import { Component } from '@angular/core';
import { Figura } from './figura/figura';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Figura],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}