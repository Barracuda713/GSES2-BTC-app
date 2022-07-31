import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';

import { DbTableName } from '../../common/enums/enums.js';

const adapter = new FileSync('database.json');
const db = low(adapter);

const initDb = async () => {
  const defaultDb = {};
  for (let tableName in DbTableName) {
    defaultDb[DbTableName[tableName]] = [];
  }

  db.defaults(defaultDb).write();
};

export { db, initDb };
