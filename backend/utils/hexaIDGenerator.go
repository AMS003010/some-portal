package utils

import (
	"context"
	"crypto/rand"
	"math/big"
	"regexp"

	"github.com/achyuthcodes30/backend/models"
	db "github.com/achyuthcodes30/backend/sheets"
)

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

var charsetRegex = regexp.MustCompile("^[a-zA-Z0-9]+$")

func HexaIDGenerator() (string, error) {

	bytes := make([]byte, 6)
	for i := range bytes {
		num, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		if err != nil {
			return "", err
		}
		bytes[i] = charset[num.Int64()]
	}

	id := string(bytes)
	isIDUnique, err := ifIdUnique((id))
	if err != nil || !charsetRegex.MatchString(id) || !isIDUnique {
		return HexaIDGenerator()

	}
	return id, nil
}

func ifIdUnique(id string) (bool, error) {
	var output []models.PublicationinSheet
	err := db.Store.Select(&output).Where("ID=?", id).Exec(context.Background())
	if err != nil {
		return false, err
	}

	if len(output) > 0 {
		return false, nil
	}
	return true, nil
}
