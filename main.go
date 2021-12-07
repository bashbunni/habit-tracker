package main

import (
	"embed"
	_ "embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
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
	//go:embed frontend/public
	var assets embed.FS

	err := wails.Run(&options.App{
		Width:  1024,
		Height: 768,
		Title:  "habit_tracker",
		Assets: assets,
		Bind: []interface{}{
			NewMySQLConnection(),
			NewHabit,
			NewDate,
			JSONToHabit,
		},
	})
	if err != nil {
		panic(err)
	}
}
