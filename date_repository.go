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
		err = results.Scan(&date.ID, &date.Date, &date.Count, &date.HabitID)
		if err != nil {
			log.Fatal(err)
		}
		dates = append(dates, date)
	}
	return dates
}

// GetTodaysCountForHabit gets a Date instance for today's entry on a given habit.
func (s MySQLRepository) GetTodaysCountForHabit(habitID uint) Date {
	today := time.Now().UTC().Format("2006-01-02")
	var date Date
	err := s.DB.QueryRow("SELECT * FROM date WHERE date_date = ? AND habit_id = ?", today, habitID).Scan(&date.ID, &date.Date, &date.Count, &date.HabitID)
	if err != nil {
		if err != sql.ErrNoRows {
			// real error
			log.Fatal(err)
		}
	}
	return date
}

func (s MySQLRepository) TodayExists(habitID uint) bool {
	today := s.GetTodaysCountForHabit(habitID)
	if today.Date == "" {
		return false
	}
	return true

}

func (s MySQLRepository) AddDate(date Date) error {
	fmt.Println(date.Date)
	insert := fmt.Sprintf("INSERT INTO date(date_date, date_count, habit_id) VALUES ('%s', %d, %d)", date.Date, date.Count, date.HabitID)
	fmt.Println(insert)
	_, err := s.DB.Exec(insert)
	return err
}

func (s MySQLRepository) AddCount(date Date) error {
	today := s.GetTodaysCountForHabit(date.HabitID)
	if s.TodayExists(date.HabitID) {
		updateCount := fmt.Sprintf("UPDATE date SET date_count = %d WHERE date_date = '%s' AND habit_id = %d", today.Count+1, date.Date, date.HabitID)
		_, err := s.DB.Exec(updateCount)
		return err
	} else {
		return s.AddDate(date)
	}
}

func (s MySQLRepository) AddCountFromJSON(req []byte) error {
	return s.AddCount(JSONToDate(req))
}
