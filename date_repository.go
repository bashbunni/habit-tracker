package main

import (
	"fmt"
	"log"
)

type DateRepository interface {
	GetAllDates(uint) []Date
	AddDate(Date) error
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

func (s MySQLRepository) AddDate(date Date) error {
	insert := fmt.Sprintf("INSERT INTO date(date_id, date_count, habit_id) VALUES (%s, %d, %d)", date.ID, date.Count, date.HabitID)
	_, err := s.DB.Exec(insert)
	return err
}

func (s MySQLRepository) AddCount(date Date) error {
	_, err := s.DB.Exec("UPDATE date SET date_count = ? WHERE date_id = ? AND habit_id = ?", date.Count, date.ID, date.HabitID)
	return err
}
