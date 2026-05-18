export enum Status {
  Read = "Read",
  ReRead = "Re-read",
  DNF = "DNF",
  CurrentlyReading = "Currently reading",
  ReturnedUnread = "Returned Unread",
  WantToRead = "Want to read"
}

export enum Format {
  Print = "Print",
  PDF = "PDF",
  Ebook = "Ebook",
  AudioBook = "AudioBook"
}

export class Book {
  title: string;
  author: string;
  pages: number;
  status: Status;
  price: number;
  pagesRead: number;
  format: Format;
  suggestedBy: string;
  finished: boolean;

  constructor(data: Omit<Book, "finished">) {
    this.title = data.title;
    this.author = data.author;
    this.pages = data.pages;
    this.status = data.status;
    this.price = data.price;
    this.pagesRead = data.pagesRead;
    this.format = data.format;
    this.suggestedBy = data.suggestedBy;

    this.finished = this.pagesRead >= this.pages;
  }

  currentlyAt(): number {
    if (!this.pages) return 0;
    return Math.round((this.pagesRead / this.pages) * 100);
  }

  deleteBook() {
    console.log("Book marked for deletion");
  }
}