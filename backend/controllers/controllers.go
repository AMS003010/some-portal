package controllers

import (
	"context"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	db "github.com/achyuthcodes30/backend/sheets"

	"github.com/achyuthcodes30/backend/models"
	"github.com/achyuthcodes30/backend/utils"
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

	capstone := ""
	if publication.IsCapstone == 1 {
		capstone = "CAPSTONE"
	} else {
		capstone = "NON CAPSTONE"
	}
	id, err := utils.HexaIDGenerator()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	isRecordUnique, err := utils.IsRecordUnique(publication.Title)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if !isRecordUnique {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Publication with this title already exists"})
		return
	}

	var wg sync.WaitGroup

	wg.Add(1)

	go func() {
		defer wg.Done()

		err := db.Store.Insert(
			models.PublicationinSheet{
				ID:                      id,
				FacultyName:             publication.FacultyName,
				StartDate:               publication.StartDate.Format("2006-01-02"),
				EndDate:                 publication.EndDate.Format("2006-01-02"),
				Types:                   typesStr,
				Title:                   publication.Title,
				ConferenceOrJournalName: publication.ConferenceOrJournalName,
				Status:                  publication.Status,
				TotalAuthors:            publication.TotalAuthors,
				AuthorNames:             authorsStr,
				IsCapstone:              capstone,
				Links:                   linksStr,
				ImpactFactor:            publication.ImpactFactor,
				ScopusIndexation:        publication.ScopusIndexation,
			},
		).Exec(context.Background())

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, gin.H{"message": "Publication added successfully"})
	}()

	wg.Wait()

}

func GetPublication(c *gin.Context) {
	id := c.Param("id")
	if len(id) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please enter a valid ID"})
	}

	var wg sync.WaitGroup
	publicationChan := make(chan models.PublicationinSheet)
	wg.Add(1)
	go func() {

		defer wg.Done()
		var foundPublication []models.PublicationinSheet

		err := db.Store.Select(&foundPublication).Where("ID = ?", id).Exec(context.Background())
		//err := db.Store.Select(&publication).Exec(context.Background())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		publicationChan <- foundPublication[0]

	}()
	go func() {
		defer close(publicationChan)
		wg.Wait()
	}()

	var publication models.PublicationInJSON

	for pub := range publicationChan {
		Types := strings.Split(pub.Types, ",")
		AuthorNames := strings.Split(pub.AuthorNames, ",")
		Links := strings.Split(pub.Links, ",")

		startDate, err := time.Parse("2006-01-02", pub.StartDate)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}
		endDate, err := time.Parse("2006-01-02", pub.EndDate)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		publication = models.PublicationInJSON{
			ID:                      pub.ID,
			FacultyName:             pub.FacultyName,
			StartDate:               startDate,
			EndDate:                 endDate,
			Types:                   Types,
			Title:                   pub.Title,
			ConferenceOrJournalName: pub.ConferenceOrJournalName,
			Status:                  pub.Status,
			TotalAuthors:            pub.TotalAuthors,
			AuthorNames:             AuthorNames,
			IsCapstone:              pub.IsCapstone,
			Links:                   Links,
			ImpactFactor:            pub.ImpactFactor,
			ScopusIndexation:        pub.ScopusIndexation,
		}

		c.JSON(http.StatusOK, publication)
	}
}

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

	startTime, err := time.Parse("2006-01-02", startTimeStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	endTime, err := time.Parse("2006-01-02", endTimeStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	/*startTimeFormatted := startTime.Format("2006-01-02")
	endTimeFormatted := endTime.Format("2006-01-02") */

	query := ""
	var queryParams []interface{}

	//queryParams = append(queryParams, startTimeFormatted, endTimeFormatted, startTimeFormatted, endTimeFormatted)

	if typeFilter != "" {
		if len(query) == 0 {
			query = "Publication Type(Journal/Conference/ Book Chapter) LIKE ?"
		} else {
			query += " AND Publication Type(Journal/Conference/ Book Chapter) LIKE ?"
		}
		queryParams = append(queryParams, "%"+typeFilter+"%")
	}

	if facultyNameFilter != "" {
		if len(query) == 0 {
			query = "Name of the faculties in PES University (Currently) = ?"
		} else {
			query += " AND Name of the faculties in PES University (Currently) = ?"
		}
		queryParams = append(queryParams, facultyNameFilter)
	}
	if statusFilter != "" {
		if len(query) == 0 {
			query = "STATUS=?"
		} else {
			query += " AND Status=?"
		}
		queryParams = append(queryParams, statusFilter)
	}

	if isCapstoneFilter != "" {
		capstone := ""
		if isCapstoneFilter == "1" {
			capstone = "CAPSTONE"
		} else {
			capstone = "NON CAPSTONE"
		}
		if len(query) == 0 {
			query = "Capstone/ Non Capstone = ?"
		} else {
			query += " AND Capstone/ Non Capstone = ?"
		}
		queryParams = append(queryParams, capstone)
	}

	var wg sync.WaitGroup
	publicationChan := make(chan []models.PublicationinSheet)

	wg.Add(1)

	go func() {

		defer wg.Done()
		var publication []models.PublicationinSheet

		err := db.Store.Select(&publication).Where(query, queryParams...).Limit(uint64(pageSize)).Offset(uint64(offset)).Exec(context.Background())
		//err := db.Store.Select(&publication).Exec(context.Background())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		allPublications := utils.DateFilter(publication, startTime, endTime)

		publicationChan <- allPublications
	}()

	go func() {
		defer close(publicationChan)
		wg.Wait()
	}()

	var publications []models.PublicationInJSON

	for allpublications := range publicationChan {
		for _, publication := range allpublications {
			Types := strings.Split(publication.Types, ",")
			AuthorNames := strings.Split(publication.AuthorNames, ",")
			Links := strings.Split(publication.Links, ",")

			startDate, err := time.Parse("2006-01-02", publication.StartDate)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err})
				return
			}
			endDate, err := time.Parse("2006-01-02", publication.EndDate)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err})
				return
			}

			publications = append(publications, models.PublicationInJSON{
				ID:                      publication.ID,
				FacultyName:             publication.FacultyName,
				StartDate:               startDate,
				EndDate:                 endDate,
				Types:                   Types,
				Title:                   publication.Title,
				ConferenceOrJournalName: publication.ConferenceOrJournalName,
				Status:                  publication.Status,
				TotalAuthors:            publication.TotalAuthors,
				AuthorNames:             AuthorNames,
				IsCapstone:              publication.IsCapstone,
				Links:                   Links,
				ImpactFactor:            publication.ImpactFactor,
				ScopusIndexation:        publication.ScopusIndexation,
			})
		}
	}

	c.JSON(http.StatusOK, publications)
}

func EditPublication(c *gin.Context) {
	id := c.Param("id")
	if len(id) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please enter a valid ID"})
	}

	var publication models.Publication
	if err := c.ShouldBindJSON(&publication); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	typesStr := strings.Join(publication.Types, ",")
	authorsStr := strings.Join(publication.AuthorNames, ",")
	linksStr := strings.Join(publication.Links, ",")

	capstone := ""
	if publication.IsCapstone == 1 {
		capstone = "CAPSTONE"
	} else {
		capstone = "NON CAPSTONE"
	}

	var wg sync.WaitGroup

	wg.Add(1)

	go func() {
		defer wg.Done()
		err := db.Store.Update(
			map[string]interface{}{
				"Name of the faculties in PES University (Currently)": publication.FacultyName,
				"Publication / Conference Start Date":                 publication.StartDate.Format("2006-01-02"),
				"End Date":                                            publication.EndDate.Format("2006-01-02"),
				"Publication Type(Journal/Conference/ Book Chapter)":  typesStr,
				"Title of the Paper/Book/Book chapter":                publication.Title,
				"Journal Name/Book /Conference":                       publication.ConferenceOrJournalName,
				"Status":                                              publication.Status,
				"Total Authors":                                       publication.TotalAuthors,
				"Authors":                                             authorsStr,
				"Capstone/ Non Capstone":                              capstone,
				"DOI/ link of the paper (Applicable for Journal Paper and Book Chapter)": linksStr,
				"Impact Factor": publication.ImpactFactor,
				"Q1/Q2/Q3/Q4/Scopus /WOS Indexed/Not Applicable": publication.ScopusIndexation,
			}).Where("ID = ?", id).Exec(context.Background())

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Publication updated successfully"})
	}()
	/*
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	*/

	wg.Wait()
}

func DeletePublication(c *gin.Context) {
	id := c.Param("id")
	if len(id) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please enter a valid ID"})
	}
	var wg sync.WaitGroup

	wg.Add(1)
	go func() {
		var pub []models.PublicationinSheet
		defer wg.Done()
		err := db.Store.Select(&pub).Where("ID=?", id).Exec(context.Background())
		if len(pub) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Publication with this ID does not exist"})
			return
		}
		err = db.Store.Delete().Where("ID=?", id).Exec(context.Background())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Publication deleted successfully"})
	}()

	wg.Wait()

}

func GetAllPublicationsTogether(c *gin.Context) {
	startTimeStr := c.Query("starttime")
	endTimeStr := c.Query("endtime")
	typeFilter := c.Query("type")
	facultyNameFilter := c.Query("facultyname")
	statusFilter := c.Query("status")
	isCapstoneFilter := c.Query("is_capstone")

	startTime, err := time.Parse("2006-01-02", startTimeStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	endTime, err := time.Parse("2006-01-02", endTimeStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	query := ""
	var queryParams []interface{}

	if typeFilter != "" {
		if len(query) == 0 {
			query = "Publication Type(Journal/Conference/ Book Chapter) LIKE ?"
		} else {
			query += " AND Publication Type(Journal/Conference/ Book Chapter) LIKE ?"
		}
		queryParams = append(queryParams, "%"+typeFilter+"%")
	}

	if facultyNameFilter != "" {
		if len(query) == 0 {
			query = "Name of the faculties in PES University (Currently) = ?"
		} else {
			query += " AND Name of the faculties in PES University (Currently) = ?"
		}
		queryParams = append(queryParams, facultyNameFilter)
	}
	if statusFilter != "" {
		if len(query) == 0 {
			query = "STATUS=?"
		} else {
			query += " AND Status=?"
		}
		queryParams = append(queryParams, statusFilter)
	}

	if isCapstoneFilter != "" {
		capstone := ""
		if isCapstoneFilter == "1" {
			capstone = "CAPSTONE"
		} else {
			capstone = "NON CAPSTONE"
		}
		if len(query) == 0 {
			query = "Capstone/ Non Capstone = ?"
		} else {
			query += " AND Capstone/ Non Capstone = ?"
		}
		queryParams = append(queryParams, capstone)
	}

	var wg sync.WaitGroup
	publicationChan := make(chan []models.PublicationinSheet)

	wg.Add(1)

	go func() {
		defer wg.Done()
		var publication []models.PublicationinSheet

		err := db.Store.Select(&publication).Where(query, queryParams...).Exec(context.Background())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		allPublications := utils.DateFilter(publication, startTime, endTime)
		publicationChan <- allPublications
	}()

	go func() {
		defer close(publicationChan)
		wg.Wait()
	}()

	var publications []models.PublicationInJSON

	for allPublications := range publicationChan {
		for _, publication := range allPublications {
			Types := strings.Split(publication.Types, ",")
			AuthorNames := strings.Split(publication.AuthorNames, ",")
			Links := strings.Split(publication.Links, ",")

			startDate, err := time.Parse("2006-01-02", publication.StartDate)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err})
				return
			}
			endDate, err := time.Parse("2006-01-02", publication.EndDate)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err})
				return
			}

			publications = append(publications, models.PublicationInJSON{
				ID:                      publication.ID,
				FacultyName:             publication.FacultyName,
				StartDate:               startDate,
				EndDate:                 endDate,
				Types:                   Types,
				Title:                   publication.Title,
				ConferenceOrJournalName: publication.ConferenceOrJournalName,
				Status:                  publication.Status,
				TotalAuthors:            publication.TotalAuthors,
				AuthorNames:             AuthorNames,
				IsCapstone:              publication.IsCapstone,
				Links:                   Links,
				ImpactFactor:            publication.ImpactFactor,
				ScopusIndexation:        publication.ScopusIndexation,
			})
		}
	}

	c.JSON(http.StatusOK, publications)
}
