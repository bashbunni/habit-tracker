package main

type Date struct {
	ID      string `json:"date"`
	Count   uint   `json:"count"`
	HabitID uint   `json:"habit_id"`
}

func NewDate(ID string, Count uint, HabitID uint) Date {
	return Date{ID: ID, Count: Count, HabitID: HabitID}
}
