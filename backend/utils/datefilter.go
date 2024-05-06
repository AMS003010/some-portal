package utils

import (
	"sort"
	"time"

	"github.com/achyuthcodes30/backend/models"
)

func DateFilter(publications []models.PublicationinSheet, startTime, endTime time.Time) []models.PublicationinSheet {
	var filteredPublications []models.PublicationinSheet

	for _, pub := range publications {
		pubStart, err := time.Parse("2006-01-02", pub.StartDate)
		if err != nil {
			// Handle parsing error
			continue
		}

		pubEnd, err := time.Parse("2006-01-02", pub.EndDate)
		if err != nil {
			// Handle parsing error
			continue
		}

		if (pubStart.Equal(startTime) || pubStart.After(startTime)) && (pubEnd.Equal(endTime) || pubEnd.Before(endTime)) {
			filteredPublications = append(filteredPublications, pub)
		}

	}

	sort.Slice(filteredPublications, func(i, j int) bool {
		return filteredPublications[i].StartDate > filteredPublications[j].StartDate
	})
	return filteredPublications
}
