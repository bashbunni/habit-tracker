package main

import (
	_ "embed"
	"fmt"

	"github.com/wailsapp/wails"
)

func main() {
	fmt.Print(GetHabits())
	fmt.Println(EditHabit(Habit{ID: 2, Name: "hydration", Unit: "litres", Pomodoro: false, Why: "I want to drink more water so I can feel better"}))
	fmt.Println(DeleteHabit(2))
	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "habit_tracker",
		Colour: "#131313",
	})
	app.Bind(NewHabits())
	app.Bind(NewHabit)
	app.Run()
}
