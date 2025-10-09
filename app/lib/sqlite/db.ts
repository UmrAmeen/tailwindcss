import Database from "better-sqlite3";
const db: Database = new Database("C:\\Users\\user\\products.db");
//  const db = new Database("C:\\database\\product.db");
db.pragma("journal_mode = WAL");

export default db;
