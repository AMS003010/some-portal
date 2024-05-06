package models

import "time"

type Publication struct {
	ID                      string    `json:"ID" db:"ID"`
	FacultyName             string    `json:"FacultyName" db:"Name of the faculties in PES University (Currently)"`
	StartDate               time.Time `json:"StartDate" db:"Publication / Conference Start Date"`
	EndDate                 time.Time `json:"EndDate" db:"End Date"`
	Types                   []string  `json:"Types" db:"Publication Type(Journal/Conference/ Book Chapter)"`
	Title                   string    `json:"Title" db:"Title of the Paper/Book/Book chapter"`
	ConferenceOrJournalName string    `json:"ConferenceOrJournalName" db:"Journal Name/Book /Conference"`
	Status                  string    `json:"Status" db:"Status"`
	TotalAuthors            int       `json:"TotalAuthors" db:"Total Authors"`
	AuthorNames             []string  `json:"AuthorNames" db:"Authors"`
	IsCapstone              int       `json:"IsCapstone" db:"Capstone/ Non Capstone"`
	Links                   []string  `json:"Links" db:"DOI/ link of the paper (Applicable for Journal Paper and Book Chapter)"`
	ImpactFactor            string    `json:"ImpactFactor" db:"Impact Factor"`
	ScopusIndexation        string    `json:"ScopusIndexation" db:"Q1/Q2/Q3/Q4/Scopus /WOS Indexed/Not Applicable"`
}
