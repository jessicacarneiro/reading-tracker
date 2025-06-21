import { ObjectId } from "mongodb";

export default class Book {
  constructor(
    public title: string,
    public author: string,
    public pageCount: number,
    public id?: ObjectId
  ) {}
}
