package utils

import (
	"context"

	"github.com/achyuthcodes30/backend/models"
	db "github.com/achyuthcodes30/backend/sheets"
)

func IsRecordUnique(title string) (bool, error) {
	var output []models.PublicationinSheet
	err := db.Store.Select(&output).Where("Title of the Paper/Book/Book chapter=?", title).Exec(context.Background())
	if err != nil {
		return false, err
	}

	if len(output) > 0 {
		return false, nil
	}
	return true, nil
}
