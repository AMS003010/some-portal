package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	dbURL := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_PORT"),
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB"))

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal(err)
	}
	DB = db
	CreateTable()
	fmt.Println("COnnected to database!")
}

func CreateTable() {
	query := `
	CREATE TABLE IF NOT EXISTS publications (
    id SERIAL PRIMARY KEY,
    faculty_name TEXT,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    types TEXT,
    title TEXT,
    conference_name TEXT,
    status TEXT,
    total_authors INTEGER,
    author_names TEXT,
    is_capstone INTEGER,
    links TEXT,
    impact_factor REAL DEFAULT -1,
    scopus_indexation INTEGER DEFAULT 0,
	UNIQUE(title, conference_name)
);
CREATE INDEX IF NOT EXISTS idx_title ON publications (title);`
	_, err := DB.Exec(query)
	if err != nil {
		log.Fatal("Error creating table: ", err)
	}
}
