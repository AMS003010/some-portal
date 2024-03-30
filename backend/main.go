package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

type Publication struct {
	ID                         int
	FacultyName                string
	StartDate                  time.Time
	EndDate                    time.Time
	Types                      []string
	Title                      string
	Conference_Or_Journal_Name string
	Status                     string
	TotalAuthors               int
	AuthorNames                []string
	IsCapstone                 int
	Links                      []string
	ImpactFactor               float64
	ScopusIndexation           int
}

var db *sql.DB

func main() {
	var err error
	db, err = sql.Open("sqlite3", "publications.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	createTable()
	fmt.Println("Successfully connected to DB!")
	r := gin.Default()

	r.POST("/publication", addPublication)
	r.GET("/publication/:id", getPublication)
	r.GET("/publications", getAllPublications)

	if err := r.Run("127.0.0.1:5000"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
	fmt.Println("Running server at port 5000!")
}

func createTable() {
	query := `
	CREATE TABLE IF NOT EXISTS publications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
	_, err := db.Exec(query)
	if err != nil {
		log.Fatal("Error creating table: ", err)
	}
}

func addPublication(c *gin.Context) {
	var publication Publication
	if err := c.ShouldBindJSON(&publication); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	typesStr := strings.Join(publication.Types, ",")
	authorsStr := strings.Join(publication.AuthorNames, ",")
	linksStr := strings.Join(publication.Links, ",")

	capstone := 0
	if publication.IsCapstone == 1 {
		capstone = 1
	}

	stmt, err := db.Prepare("INSERT INTO publications(faculty_name, start_date, end_date, types, title, conference_name, status, total_authors, author_names, is_capstone, links, impact_factor, scopus_indexation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer stmt.Close()

	res, err := stmt.Exec(
		publication.FacultyName,
		publication.StartDate.Format("2006-01-02 15:04:05"),
		publication.EndDate.Format("2006-01-02 15:04:05"),
		typesStr,
		publication.Title,
		publication.Conference_Or_Journal_Name,
		publication.Status,
		publication.TotalAuthors,
		authorsStr,
		capstone,
		linksStr,
		publication.ImpactFactor,
		publication.ScopusIndexation,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if rowsAffected == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No rows were affected"})
		log.Println("No rows were affected by the SQL statement")
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Publication added successfully"})
}

func getPublication(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid publication ID"})
		return
	}

	var publication Publication
	var typesStr, authorNamesStr, linksStr string
	err = db.QueryRow("SELECT * FROM publications WHERE id = ?", id).Scan(
		&publication.ID,
		&publication.FacultyName,
		&publication.StartDate,
		&publication.EndDate,
		&typesStr,
		&publication.Title,
		&publication.Conference_Or_Journal_Name,
		&publication.Status,
		&publication.TotalAuthors,
		&authorNamesStr,
		&publication.IsCapstone,
		&linksStr,
		&publication.ImpactFactor,
		&publication.ScopusIndexation,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Publication not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		log.Fatal((err))
		return
	}
	publication.Types = strings.Split(typesStr, ",")
	publication.AuthorNames = strings.Split(authorNamesStr, ",")
	publication.Links = strings.Split(linksStr, ",")
	c.JSON(http.StatusOK, publication)
}

func getAllPublications(c *gin.Context) {
	startTimeStr := c.Query("starttime")
	endTimeStr := c.Query("endtime")
	typeFilter := c.Query("type")
	facultyNameFilter := c.Query("facultyname")
	statusFilter := c.Query("status")
	isCapstoneFilter := c.Query("is_capstone")

	startTime, err := time.Parse(time.RFC3339, startTimeStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start time format"})
		return
	}

	endTime, err := time.Parse(time.RFC3339, endTimeStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid end time format"})
		return
	}

	startTimeFormatted := startTime.Format("2006-01-02 15:04:05")
	endTimeFormatted := endTime.Format("2006-01-02 15:04:05")

	query := "SELECT * FROM publications WHERE (start_date BETWEEN ? AND ? OR end_date BETWEEN ? AND ?)"
	var queryParams []interface{}
	queryParams = append(queryParams, startTimeFormatted, endTimeFormatted, startTimeFormatted, endTimeFormatted)
	if typeFilter != "" {
		query += " AND types LIKE ?"
		queryParams = append(queryParams, "%"+typeFilter+"%")
	}

	if facultyNameFilter != "" {
		query += " AND faculty_name = ?"
		queryParams = append(queryParams, facultyNameFilter)
	}
	if statusFilter != "" {
		query += " AND status = ?"
		queryParams = append(queryParams, statusFilter)
	}

	if isCapstoneFilter != "" {
		capstone, err := strconv.Atoi(isCapstoneFilter)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid is_capstone filter value"})
			return
		}
		query += " AND is_capstone = ?"
		queryParams = append(queryParams, capstone)
	}

	rows, err := db.Query(query, queryParams...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var publications []Publication
	for rows.Next() {
		var publication Publication
		var typesStr, authorNamesStr, linksStr string
		err := rows.Scan(
			&publication.ID,
			&publication.FacultyName,
			&publication.StartDate,
			&publication.EndDate,
			&typesStr,
			&publication.Title,
			&publication.Conference_Or_Journal_Name,
			&publication.Status,
			&publication.TotalAuthors,
			&authorNamesStr,
			&publication.IsCapstone,
			&linksStr,
			&publication.ImpactFactor,
			&publication.ScopusIndexation,
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		publication.Types = strings.Split(typesStr, ",")
		publication.AuthorNames = strings.Split(authorNamesStr, ",")
		publication.Links = strings.Split(linksStr, ",")
		publications = append(publications, publication)
	}
	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, publications)
}
