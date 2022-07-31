import { Low, JSONFile } from 'lowdb';

import { DbTableName } from '../../common/enums/enums.js';

const adapter = new JSONFile('database.json');
const db = new Low(adapter);

const initDb = async () => {
  const defaultDb = {};
  for (let tableName in DbTableName) {
    defaultDb[DbTableName[tableName]] = [];
  }

  await db.read();
  db.data = db.data || defaultDb;
  await db.write();
};

export { db, initDb };
