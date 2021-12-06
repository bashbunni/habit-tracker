package main

import (
	_ "embed"

	"github.com/wailsapp/wails"
)

func main() {
	/*
		mysql := NewMySQLConnection()
		fmt.Println(mysql.TodayExists())
		sample := Date{"2021-12-04", 2, 1}
		sampleJson, err := json.Marshal(sample)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%s", sampleJson)
		err = mysql.AddCountFromJSON(sampleJson)
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
	app.Bind(NewDate)
	app.Bind(JSONToHabit)
	app.Run()
}
