package main

import (
	"encoding/json"
)

type Habit struct {
	// need to start with an uppercase letter to export it
	Id       uint   `json:"id"`
	Name     string `json:"name"`
	Unit     string `json:"unit"`
	Pomodoro bool   `json:"pomodoro"`
	Why      string `json:"why"`
}

// create a new Habit
func NewHabit(Id uint, Name string, Unit string, Pomodoro bool, Why string) *Habit {
	return &Habit{Id: Id, Name: Name, Unit: Unit, Pomodoro: Pomodoro, Why: Why}
}

/* ******
 * mocks
 * ******/
// TODO: move to separate mock file when DB is implemented

type Habits struct {
	habits []*Habit
}

// mock database
func NewHabits() *Habits {
	return &Habits{habits: []*Habit{
		{Id: 1, Name: "yoga", Unit: "hours", Pomodoro: false, Why: "I want to do yoga so I can be more relaxed"},
		{Id: 2, Name: "meditation", Unit: "15 minutes", Pomodoro: false, Why: "I want to meditate so I can be more present"},
		{Id: 3, Name: "hydration", Unit: "litres", Pomodoro: false, Why: "I want to be hydrated so I can feel better"},
	},
	}
}

// AddHabit adds a habit to a Habits instance.
// It returns true on successful completion.
// Receives a JSON Habit object
func (h *Habits) AddHabit(req []byte) bool {
	var habit Habit
	json.Unmarshal(req, &habit)
	h.habits = append(h.habits, &habit)
	return true
}

// GetHabits retrieves the list of Habits from a Habits instance.
func (h Habits) GetHabits() []*Habit {
	return h.habits
}
