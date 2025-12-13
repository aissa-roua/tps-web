import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnChanges {
  @Input() categories: string[] = [];
  @Input() selectedBook: Book | null = null;
  @Output() addBook = new EventEmitter<Book>();
  @Output() cancelEdit = new EventEmitter<void>();

  @ViewChild('bookForm') bookForm!: NgForm;

  book: Book = this.getEmptyBook();
  isEditMode = false;
  showValidationErrors = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedBook'] && this.selectedBook) {
      this.isEditMode = true;
      this.book = { ...this.selectedBook };
      this.showValidationErrors = false;
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.addBook.emit({ ...this.book });
      this.resetForm();
      this.isEditMode = false;
    } else {
      this.showValidationErrors = true;
      this.markFormGroupTouched(form);
    }
  }

  onCancel() {
    this.resetForm();
    this.isEditMode = false;
    this.cancelEdit.emit();
  }

  private resetForm() {
    this.book = this.getEmptyBook();
    this.bookForm?.resetForm();
    this.showValidationErrors = false;
  }

  private getEmptyBook(): Book {
    return new Book(0, '', '', '', '', '', 'Roman', true, 0);
  }

  private markFormGroupTouched(formGroup: NgForm) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Validateurs personnalisés
  isTitleNumberOnly(): boolean {
    return /^\d+$/.test(this.book.title);
  }

  isValidYear(): boolean {
    if (!this.book.releaseDate) return false;
    const year = new Date(this.book.releaseDate).getFullYear();
    return year > 1900;
  }
}
