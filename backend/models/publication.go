package models

import "time"

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
