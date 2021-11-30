package main

type Habit struct {
	id       uint
	name     string
	unit     string
	pomodoro bool
	why      string
}

func NewHabit(id uint, name string, unit string, pomodoro bool, why string) *Habit {
	return &Habit{}
}

func GetHabits() []Habit {
	var habits = []Habit{
		Habit{id: 1, name: "yoga", unit: "hours", pomodoro: false, why: "I want to do yoga so I can be more relaxed"},
		Habit{id: 2, name: "meditation", unit: "15 minutes", pomodoro: false, why: "I want to meditate so I can be more present"},
		Habit{id: 3, name: "hydration", unit: "litres", pomodoro: false, why: "I want to be hydrated so I can feel better"},
	}
	return habits
}
