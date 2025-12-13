import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { BookFormComponent } from '../book-form/book-form.component';
import { BookListComponent } from '../book-list/book-list.component';

@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [CommonModule, BookFormComponent, BookListComponent],
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.css'
})
export class BookContainerComponent implements OnInit {
  books: Book[] = [];
  categories: string[] = ['Roman', 'Science', 'Histoire', 'Informatique', 'Art', 'Autres'];
  selectedBook: Book | null = null;
  nextId: number = 1;

  ngOnInit() {
    // Initialiser avec des données
    this.books = [
      new Book(
        1,
        'Le Seigneur des Anneaux',
        'J.R.R. Tolkien',
        'publisher1@example.com',
        '71234567',
        '1954-07-29',
        'Roman',
        true,
        5
      ),
      new Book(
        2,
        'L\'Univers en une Coquille de Noix',
        'Stephen Hawking',
        'publisher2@example.com',
        '72345678',
        '2001-05-15',
        'Science',
        true,
        3
      ),
      new Book(
        3,
        'La Seconde Guerre Mondiale',
        'Winston Churchill',
        'publisher3@example.com',
        '73456789',
        '1948-09-09',
        'Histoire',
        false,
        0
      )
    ];
    this.nextId = this.books.length + 1;
  }

  onAddBook(book: Book) {
    if (this.selectedBook) {
      // Mode UPDATE
      const index = this.books.findIndex(b => b.id === this.selectedBook!.id);
      if (index !== -1) {
        this.books[index] = { ...book, id: this.selectedBook.id };
      }
      this.selectedBook = null;
    } else {
      // Mode CREATE
      book.id = this.nextId++;
      this.books.push(book);
    }
  }

  onEditBook(book: Book) {
    this.selectedBook = { ...book };
  }

  onDeleteBook(id: number) {
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  onCancelEdit() {
    this.selectedBook = null;
  }
}
