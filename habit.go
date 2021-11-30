package main

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
func (h *Habits) NewHabits() {
	h.habits = []*Habit{
		{Id: 1, Name: "yoga", Unit: "hours", Pomodoro: false, Why: "I want to do yoga so I can be more relaxed"},
		{Id: 2, Name: "meditation", Unit: "15 minutes", Pomodoro: false, Why: "I want to meditate so I can be more present"},
		{Id: 3, Name: "hydration", Unit: "litres", Pomodoro: false, Why: "I want to be hydrated so I can feel better"},
	}
}

// mock add habit to list of habits
// return true if habit is added successfully
func (h Habits) AddHabit(habit *Habit) bool {
	h.habits = append(h.habits, habit)
	return true
}

// mock data for getting habits
func GetHabits() []*Habit {
	var habits = []*Habit{
		{Id: 1, Name: "yoga", Unit: "hours", Pomodoro: false, Why: "I want to do yoga so I can be more relaxed"},
		{Id: 2, Name: "meditation", Unit: "15 minutes", Pomodoro: false, Why: "I want to meditate so I can be more present"},
		{Id: 3, Name: "hydration", Unit: "litres", Pomodoro: false, Why: "I want to be hydrated so I can feel better"},
	}
	return habits
}
