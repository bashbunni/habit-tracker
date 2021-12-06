package main

import (
	"encoding/json"
	"fmt"
	"log"
)

type Date struct {
	ID      string `json:"date"`
	Count   uint   `json:"count"`
	HabitID uint   `json:"habit_id"`
}

func NewDateFromJSON(req []byte) Date {
	fmt.Println(req)
	var date Date
	err := json.Unmarshal(req, &date)
	if err != nil {
		log.Fatal(err)
	}
	return date
}

func NewDate(ID string, Count uint, HabitID uint) Date {
	return Date{ID: ID, Count: Count, HabitID: HabitID}
}
