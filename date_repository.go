package main

import (
	"database/sql"
	"fmt"
	"log"
	"time"
)

type DateRepository interface {
	GetAllDates(uint) []Date
	GetTodaysDate() Date
	AddDate(Date) error
	AddCount(Date) error
}

// GetAllDates gets all dates for a given habit.
func (s MySQLRepository) GetAllDates(habit_id uint) []Date {
	results, err := s.DB.Query("SELECT * FROM date WHERE habit_id = ?", habit_id)
	if err != nil {
		log.Fatal(err)
	}
	defer results.Close()
	var dates []Date
	for results.Next() {
		var date Date
		err = results.Scan(&date.ID, &date.Count, &date.HabitID)
		if err != nil {
			log.Fatal(err)
		}
		dates = append(dates, date)
	}
	return dates
}

// GetAllDates gets all dates for a given habit.
func (s MySQLRepository) GetTodaysDate() Date {
	today := time.Now().UTC().Format("2006-01-02")
	var date Date
	err := s.DB.QueryRow("SELECT * FROM date WHERE date_id = ?", today).Scan(&date.ID, &date.Count, &date.HabitID)
	if err != nil {
		if err != sql.ErrNoRows {
			// real error
			log.Fatal(err)
		}
	}
	return date
}

func (s MySQLRepository) TodayExists() bool {
	today := s.GetTodaysDate()
	if today.ID == "" {
		return false
	}
	return true

}

func (s MySQLRepository) AddDate(date Date) error {
	fmt.Println(date.ID)
	insert := fmt.Sprintf("INSERT INTO date(date_id, date_count, habit_id) VALUES ('%s', %d, %d)", date.ID, date.Count, date.HabitID)
	fmt.Println(insert)
	_, err := s.DB.Exec(insert)
	return err
}

func (s MySQLRepository) AddCount(date Date) error {
	if s.TodayExists() {
		// TODO: make this increment the count instead of overwrite
		updateCount := fmt.Sprintf("UPDATE date SET date_count = %d WHERE date_id = '%s' AND habit_id = %d", date.Count, date.ID, date.HabitID)
		_, err := s.DB.Exec(updateCount)
		return err
	} else {
		return s.AddDate(date)
	}
}

func (s MySQLRepository) AddCountFromJSON(req []byte) error {
	return s.AddCount(JSONToDate(req))
}
