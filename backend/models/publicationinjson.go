package models

import "time"

type PublicationInJSON struct {
	ID                      string    `json:"ID" sheets:"ID"`
	FacultyName             string    `json:"FacultyName" sheets:"Name of the faculties in PES University (Currently)"`
	StartDate               time.Time `json:"StartDate" sheets:"Publication / Conference Start Date"`
	EndDate                 time.Time `json:"EndDate" sheets:"End Date"`
	Types                   []string  `json:"Types" sheets:"Publication Type(Journal/Conference/ Book Chapter)"`
	Title                   string    `json:"Title" sheets:"Title of the Paper/Book/Book chapter"`
	ConferenceOrJournalName string    `json:"ConferenceOrJournalName" sheets:"Journal Name/Book /Conference"`
	Status                  string    `json:"Status" sheets:"Status"`
	TotalAuthors            int       `json:"TotalAuthors" sheets:"Total Authors"`
	AuthorNames             []string  `json:"AuthorNames" sheets:"Authors"`
	IsCapstone              string    `json:"IsCapstone" sheets:"Capstone/ Non Capstone"`
	Links                   []string  `json:"Links" sheets:"DOI/ link of the paper (Applicable for Journal Paper and Book Chapter)"`
	ImpactFactor            string    `json:"ImpactFactor" sheets:"Impact Factor"`
	ScopusIndexation        string    `json:"ScopusIndexation" sheets:"Q1/Q2/Q3/Q4/Scopus /WOS Indexed/Not Applicable"`
}
