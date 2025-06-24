interface Book {
  _id?: string;
  title: string;
  author: string;
  pageCount: number;
  pagesPerDayGoal?: number;
}

export default Book;