package main

import (
	_ "embed"

	"github.com/wailsapp/wails"
)

func main() {
	/*
		TODO: move to testing
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
	err := wails.Run(&options.App{
		Title:  "habit_tracker",
		Width:  1024,
		Height: 768,
		Assets: assets,
		Colour: "#131313",
		Bind: []interface{}{
			// TODO: can only bind structs
			MySQLConnection,
			Habit,
			Date,
		},
	})
}
