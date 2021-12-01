package main

import (
	"encoding/json"
	"fmt"

	"github.com/pkg/errors"
)

type Habit struct {
	// need to start with an uppercase letter to export it
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Unit     string `json:"unit"`
	Pomodoro bool   `json:"pomodoro"`
	Why      string `json:"why"`
}

// create a new Habit
func NewHabit(ID uint, Name string, Unit string, Pomodoro bool, Why string) *Habit {
	return &Habit{ID: ID, Name: Name, Unit: Unit, Pomodoro: Pomodoro, Why: Why}
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
		{ID: 1, Name: "yoga", Unit: "hours", Pomodoro: false, Why: "I want to do yoga so I can be more relaxed"},
		{ID: 2, Name: "meditation", Unit: "15 minutes", Pomodoro: false, Why: "I want to meditate so I can be more present"},
		{ID: 3, Name: "hydration", Unit: "litres", Pomodoro: false, Why: "I want to be hydrated so I can feel better"},
	},
	}
}

func (h Habits) findHabit(id uint) *Habit {
	for i := range h.habits {
		if h.habits[i].ID == id {
			return h.habits[i]
		}
	}
	return nil
}

// AddHabit adds a habit to Habits.
// It returns true on successful completion.
// Receives a JSON Habit object
func (h *Habits) AddHabit(req []byte) bool {
	var habit Habit
	json.Unmarshal(req, &habit)
	h.habits = append(h.habits, &habit)
	return true
}

// EditHabit edits an existing habit in Habits
func (h *Habits) EditHabit(req []byte) (*Habit, error) {
	var changes Habit
	json.Unmarshal(req, &changes)
	target := h.findHabit(changes.ID)
	if target == nil {
		return nil, errors.Errorf("habit with id %d not found", changes.ID)
	}
	*target = changes // TODO: does this work??
	return target, nil
}

// DeleteHabit deletes a habit from Habits by ID.
// It returns the updated Habits
func (h *Habits) DeleteHabit(id uint) []*Habit {
	for i := 0; i < len(h.habits); i++ {
		if h.habits[i].ID == id {
			fmt.Print(h.habits)
			h.habits = append(h.habits[:i], h.habits[i+1:]...)
			fmt.Print(h.habits)
		}
	}
	return h.habits
}

// GetHabits retrieves the list of Habits from a Habits instance.
func (h Habits) GetHabits() []*Habit {
	return h.habits
}
