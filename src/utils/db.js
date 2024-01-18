import * as SQLite from 'expo-sqlite';

// open or create DB
const db = SQLite.openDatabase('musicCollection.db');

export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY,
          vinyl BOOLEAN NOT NULL DEFAULT 0,
          cassette BOOLEAN NOT NULL DEFAULT 0,
          cd BOOLEAN NOT NULL DEFAULT 0,
          digital BOOLEAN NOT NULL DEFAULT 0
        )
      `);

      tx.executeSql('SELECT * FROM settings WHERE id=1', null,
        (txObj, resultSet) => {
          if (resultSet.rows._array.length < 1) {
            tx.executeSql(`INSERT INTO settings (id, vinyl, cassette, cd, digital) VALUES (1, 0, 0, 0, 0)`);
          }
        },
        (txObj, error) => console.log(error)
      );

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS artists (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(255) NOT NULL,
          deezer_id INTEGER
        )
      `);

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS albums (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          deezer_id INTEGER,
          artist_id INTEGER NOT NULL,
          title VARCHAR(255) NOT NULL,
          year VARCHAR(4),
          cover TEXT,
          format TEXT,
          FOREIGN KEY(artist_id) REFERENCES artists(id)
        )
      `, [], resolve, (_, error) => reject(error));
    });
  });
};

export default db;

/*
{
    artist: 'Queen',
    album: 'A Night at the Opera',
    year: '1976',
    cover: 'https://m.media-amazon.com/images/I/71nxRqKGA8L._UF894,1000_QL80_.jpg',
    formats: {
      vinyl: 'owned',
      cd: 'owned',
      digital: 'none',
    }
  },
  */