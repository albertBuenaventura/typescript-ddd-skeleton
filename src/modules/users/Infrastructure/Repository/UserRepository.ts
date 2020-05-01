import { Db } from 'mongodb';

export class UserRepository {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }
}
