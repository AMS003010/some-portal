package db

import (
	"fmt"

	freedb "github.com/FreeLeh/GoFreeDB"
	"github.com/FreeLeh/GoFreeDB/google/auth"
)

var Store *freedb.GoogleSheetRowStore

func InitSheet() {

	// If using Google OAuth2 Flow.
	authenticator, err := auth.NewServiceFromFile(
		"servicetoken.json",
		freedb.FreeDBGoogleAuthScopes,
		auth.ServiceConfig{},
	)
	if err != nil {
		fmt.Println("Error accessing sheet", err)
		return
	}

	Store = freedb.NewGoogleSheetRowStore(
		authenticator,
		"1vZhaSf48C5KAxEox4M5DTtpzM2Vk8mldfhx0xIGdekE",
		"Sheet1",
		freedb.GoogleSheetRowStoreConfig{Columns: []string{
			"ID",
			"Name of the faculties in PES University (Currently)",
			"Publication / Conference Start Date",
			"End Date",
			"Publication Type(Journal/Conference/ Book Chapter)",
			"Title of the Paper/Book/Book chapter",
			"Journal Name/Book /Conference",
			"Status",
			"Total Authors",
			"Q1/Q2/Q3/Q4/Scopus /WOS Indexed/Not Applicable",
			"Impact Factor",
			"DOI/ link of the paper (Applicable for Journal Paper and Book Chapter)",
			"Capstone/ Non Capstone",
			"Authors",
		}},
	)

}
