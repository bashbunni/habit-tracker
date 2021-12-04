package main

import (
	"encoding/json"
	"log"
)

func JSONToHabit(req []byte) Habit {
	var h Habit
	err := json.Unmarshal([]byte(req), &h)
	if err != nil {
		log.Fatal(err)
	}
	return h
}

func HabitToJSON(habit Habit) ([]byte, error) {
	return json.Marshal(habit)
}
