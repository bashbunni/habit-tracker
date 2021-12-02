package main

import (
	_ "embed"
	"fmt"
	"github.com/wailsapp/wails"
)

func main() {
	fmt.Print(GetHabits())
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
