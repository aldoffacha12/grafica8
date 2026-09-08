import { Component } from '@angular/core';
import { Controles } from './controles/controles';

@Component({
  selector: 'app-root',
  imports: [Controles],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}