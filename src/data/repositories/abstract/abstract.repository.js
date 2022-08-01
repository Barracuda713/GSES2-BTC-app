import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../config/config.js';

class Abstract {
  constructor(collectionName) {
    this.dbContext = db.get(collectionName);
    this.collectionName = collectionName;
  }
  
  generateId() {
    return uuidv4();
  }

  getAll() {
    return this.dbContext.value();
  }

  getOne(search) {
    return this.dbContext.find(search).value();
  }

  create(data) {
    data.id = this.generateId();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const list = this.dbContext.push(data).write();
    return list.find(it => it.id === data.id);
  }

  update(id, data) {
    data.updatedAt = new Date();
    return this.dbContext.find({ id }).assign(data).write();
  }

  delete(id) {
    return this.dbContext.remove({ id }).write();
  }
}

export { Abstract };
