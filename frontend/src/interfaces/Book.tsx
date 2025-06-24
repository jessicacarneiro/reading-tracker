interface Book {
  _id?: string;
  title: string;
  author: string;
  pageCount: number;
  pagesPerDayGoal?: number;
  daysToFinish?: number;
}

export default Book;