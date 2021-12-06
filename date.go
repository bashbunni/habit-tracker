package main

import (
	"encoding/json"
	"fmt"
	"log"
)

type Date struct {
	ID      string `json:"id"`
	Date    string `json:"date"`
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

func NewDate(Today string, Count uint, HabitID uint) Date {
	return Date{Date: Today, Count: Count, HabitID: HabitID}
}
