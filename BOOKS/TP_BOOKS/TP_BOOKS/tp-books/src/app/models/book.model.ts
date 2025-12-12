export class Book {
  id: number;
  title: string;
  author: string;
  publisherEmail: string;
  publisherPhone: string;
  releaseDate: string;
  category: string;
  isAvailable: boolean;
  stock?: number;

  constructor(
    id: number,
    title: string,
    author: string,
    publisherEmail: string,
    publisherPhone: string,
    releaseDate: string,
    category: string,
    isAvailable: boolean,
    stock?: number
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publisherEmail = publisherEmail;
    this.publisherPhone = publisherPhone;
    this.releaseDate = releaseDate;
    this.category = category;
    this.isAvailable = isAvailable;
    this.stock = stock;
  }
}
