import sqlite3 from 'sqlite3'
import {open, Database} from 'sqlite'
import path from 'path'

// absolute path to db
const dbPath = path.resolve(__dirname, '..', 'databases', 'events.db')

// define a type for the db connection
let db: Database | null = null

// init db connection
export async function initializeDatabase(): Promise<void> {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        })
    } catch (err) {
        console.error("Error initializing database:", err)
        throw err
    }
}

export function getDatabase(): Database {
    if (!db) {
        throw new Error('Database does not exist. Call initializeDatabase() first')
    }
    return db
}