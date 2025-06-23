import { ObjectId } from 'mongodb';

export default class BookModel {
  constructor(
    public title: string,
    public author: string,
    public pageCount: number,
    public id?: ObjectId
  ) {}
}
