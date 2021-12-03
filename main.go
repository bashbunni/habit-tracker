package main

import (
	_ "embed"

	"github.com/wailsapp/wails"
)

func main() {
	/*
		mysql := NewMySQLConnection()
		sample := Habit{2, "hydration", "litres", false, "I want to be healthier"}
		sampleJson, err := json.Marshal(sample)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%s", sampleJson)
		err = mysql.AddHabitFromJSON(sampleJson)
		if err != nil {
			log.Fatal(err)
		}
	*/
	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "habit_tracker",
		Colour: "#131313",
	})
	app.Bind(NewMySQLConnection())
	app.Bind(NewHabit)
	app.Bind(JSONToHabit)
	app.Run()
}
