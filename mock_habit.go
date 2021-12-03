package main

import (
	"encoding/json"
	"fmt"

	"github.com/pkg/errors"
)

type MockHabitRepository struct {
	habits []*Habit
}

// Initialize mock database with sample data.
func (m MockHabitRepository) NewHabits() *Habits {
	return &Habits{habits: []*Habit{
		{ID: 1, Name: "yoga", Unit: "hours", Pomodoro: false, Why: "I want to do yoga so I can be more relaxed"},
		{ID: 2, Name: "meditation", Unit: "15 minutes", Pomodoro: false, Why: "I want to meditate so I can be more present"},
		{ID: 3, Name: "hydration", Unit: "litres", Pomodoro: false, Why: "I want to be hydrated so I can feel better"},
	},
	}
}

// findHabit finds a habit with a given ID.
func (m MockHabitRepository) findHabit(id uint) *Habit {
	for i := range m.habits {
		if m.habits[i].ID == id {
			return m.habits[i]
		}
	}
	return nil
}

// AddHabit adds a habit to Habits.
// It returns true on successful completion.
// Receives a JSON Habit object
func (m MockHabitRepository) AddHabit(req []byte) bool {
	var habit Habit
	json.Unmarshal(req, &habit)
	m.habits = append(m.habits, &habit)
	return true
}

// EditHabit edits an existing habit in Habits
func (m MockHabitRepository) EditHabit(req []byte) (*Habit, error) {
	var changes Habit
	json.Unmarshal(req, &changes)
	target := m.findHabit(changes.ID)
	if target == nil {
		return nil, errors.Errorf("habit with id %d not found", changes.ID)
	}
	*target = changes
	return target, nil
}

// DeleteHabit deletes a habit from Habits by ID.
// It returns the updated Habits
func (m MockHabitRepository) DeleteHabit(id uint) []*Habit {
	for i := 0; i < len(m.habits); i++ {
		if m.habits[i].ID == id {
			fmt.Print(m.habits)
			m.habits = append(m.habits[:i], m.habits[i+1:]...)
			fmt.Print(m.habits)
		}
	}
	return m.habits
}

// GetHabits retrieves the list of Habits from a Habits instance.
func (m MockHabitRepository) GetHabits() []*Habit {
	return m.habits
}
