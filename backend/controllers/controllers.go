package controllers

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/achyuthcodes30/backend/db"
	"github.com/achyuthcodes30/backend/models"
	"github.com/gin-gonic/gin"
)

func AddPublication(c *gin.Context) {
	var publication models.Publication
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

	stmt, err := db.DB.Prepare("INSERT INTO publications(faculty_name, start_date, end_date, types, title, conference_name, status, total_authors, author_names, is_capstone, links, impact_factor, scopus_indexation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(
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
		if strings.Contains(err.Error(), "UNIQUE constraint failed") {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Publication with this title already exists"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Publication added successfully"})
}

func GetPublication(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid publication ID"})
		return
	}

	var publication models.Publication
	var typesStr, authorNamesStr, linksStr string
	err = db.DB.QueryRow("SELECT * FROM publications WHERE id = ?", id).Scan(
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

/* func GetAllPublicationsNew(c *gin.Context) {
	query := "SELECT * FROM publications"
	var wg sync.WaitGroup
	publicationChan := make(chan models.Publication)

	wg.Add(1)

	go func() {
		fmt.Println("running query")
		defer wg.Done()
		rows, err := db.DB.Query(query)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		for rows.Next() {
			var publication models.Publication
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
			publicationChan <- publication
			fmt.Println("Channle populated!")
		}
		if err := rows.Err(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}()

	go func() {
		wg.Wait()              // Wait for all goroutines to complete before closing the channel
		close(publicationChan) // Close the channel once all data is sent
	}()

	var publications []models.Publication
	fmt.Println("Query done!")
	for publication := range publicationChan {
		publications = append(publications, publication)
	}

	c.JSON(http.StatusOK, publications)
} */

func GetAllPublications(c *gin.Context) {
	startTimeStr := c.Query("starttime")
	endTimeStr := c.Query("endtime")
	typeFilter := c.Query("type")
	facultyNameFilter := c.Query("facultyname")
	statusFilter := c.Query("status")
	isCapstoneFilter := c.Query("is_capstone")

	page, err := strconv.Atoi(c.DefaultQuery("page", "1"))
	if err != nil || page < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page number"})
		return
	}
	pageSize, err := strconv.Atoi(c.DefaultQuery("pageSize", "10"))
	if err != nil || pageSize < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pageSize"})
		return
	}
	offset := (page - 1) * pageSize

	startTime, err := time.Parse("2006-01-02T15:04:05Z", startTimeStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start time format"})
		return
	}

	endTime, err := time.Parse("2006-01-02T15:04:05Z", endTimeStr)
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

	query += " LIMIT ? OFFSET ?"
	queryParams = append(queryParams, pageSize, offset)

	var wg sync.WaitGroup
	publicationChan := make(chan models.Publication)

	wg.Add(1)

	go func() {

		defer wg.Done()
		rows, err := db.DB.Query(query, queryParams...)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		for rows.Next() {
			var publication models.Publication
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
			publicationChan <- publication
		}
		if err := rows.Err(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}()

	go func() {
		wg.Wait()
		close(publicationChan)
	}()

	var publications []models.Publication

	for publication := range publicationChan {
		publications = append(publications, publication)
	}

	c.JSON(http.StatusOK, publications)
}

func EditPublication(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid publication ID"})
		return
	}

	var publication models.Publication
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

	stmt, err := db.DB.Prepare("UPDATE publications SET faculty_name=?, start_date=?, end_date=?, types=?, title=?, conference_name=?, status=?, total_authors=?, author_names=?, is_capstone=?, links=?, impact_factor=?, scopus_indexation=? WHERE id=?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(
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
		id,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Publication updated successfully"})
}

func DeletePublication(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid publication ID"})
		return
	}

	stmt, err := db.DB.Prepare("DELETE FROM publications WHERE id=?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Publication deleted successfully"})
}
