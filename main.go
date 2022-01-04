package main

import (
	"embed"
	_ "embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed frontend/build
var assets embed.FS

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
		Bind: []interface{}{
			NewMySQLConnection(),
		},
	})
	if err != nil {
		log.Fatalf("error running Wails: %v", err)
	}
}
