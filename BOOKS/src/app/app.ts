import { Component } from '@angular/core';
import { BookContainerComponent } from './components/book-container/book-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
