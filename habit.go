package main

type Habit struct {
	// need to start with an uppercase letter to export it
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Unit     string `json:"unit"`
	Pomodoro bool   `json:"pomodoro"`
	Why      string `json:"why"`
}

// create a new Habit
func NewHabit(ID uint, Name string, Unit string, Pomodoro bool, Why string) Habit {
	return Habit{ID: ID, Name: Name, Unit: Unit, Pomodoro: Pomodoro, Why: Why}
}
