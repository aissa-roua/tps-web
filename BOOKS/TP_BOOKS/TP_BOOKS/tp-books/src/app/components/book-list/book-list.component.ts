import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnChanges {
  @Input() books: Book[] = [];
  @Input() categories: string[] = [];
  @Output() editBook = new EventEmitter<Book>();
  @Output() deleteBook = new EventEmitter<number>();

  filteredBooks: Book[] = [];
  searchQuery: string = '';
  filterCategory: string = '';
  filterAvailability: string = '';
  sortBy: string = 'title';

  ngOnInit() {
    this.updateFilteredBooks();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['books']) {
      this.updateFilteredBooks();
    }
  }

  updateFilteredBooks() {
    let result = [...this.books];

    // Filtrer par recherche
    if (this.searchQuery.trim()) {
      result = result.filter(
        book =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Filtrer par catégorie
    if (this.filterCategory) {
      result = result.filter(book => book.category === this.filterCategory);
    }

    // Filtrer par disponibilité
    if (this.filterAvailability !== '') {
      const isAvailable = this.filterAvailability === 'true';
      result = result.filter(book => book.isAvailable === isAvailable);
    }

    // Trier
    result.sort((a, b) => {
      if (this.sortBy === 'category') {
        return a.category.localeCompare(b.category);
      } else if (this.sortBy === 'availability') {
        return b.isAvailable === a.isAvailable ? 0 : b.isAvailable ? 1 : -1;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    this.filteredBooks = result;
  }

  onEdit(book: Book) {
    this.editBook.emit(book);
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      this.deleteBook.emit(id);
    }
  }

  getTotalStock(): number {
    return this.books.reduce((sum, book) => sum + (book.stock || 0), 0);
  }

  getAvailableCount(): number {
    return this.books.filter(book => book.isAvailable).length;
  }

  getUnavailableCount(): number {
    return this.books.filter(book => !book.isAvailable).length;
  }

  onSearchChange() {
    this.updateFilteredBooks();
  }

  onFilterChange() {
    this.updateFilteredBooks();
  }

  onSortChange() {
    this.updateFilteredBooks();
  }

  resetFilters() {
    this.searchQuery = '';
    this.filterCategory = '';
    this.filterAvailability = '';
    this.sortBy = 'title';
    this.updateFilteredBooks();
  }
}
