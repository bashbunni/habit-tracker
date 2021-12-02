package main

import (
	"log"
	"fmt"
)

type HabitRepository interface {
	GetHabits() []Habit
	AddHabit(Habit) error
}

func GetHabits() []Habit {
	db := DBConnect()
	defer db.Close()
	results, err := db.Query("SELECT * FROM habit")
	if err != nil {
		log.Fatal(err)
	}
	var habits []Habit
	for results.Next() {
		var habit Habit
		err = results.Scan(&habit.ID, &habit.Name, &habit.Unit, &habit.Pomodoro, &habit.Why)
		habits = append(habits, habit)
		if err != nil {
			log.Fatal(err)
		}
	}
	return habits
}

func AddHabit(habit Habit) error {
	db := DBConnect()
	defer db.Close()
	insert := fmt.Sprintf("INSERT INTO habit(habit_id, habit_name, habit_unit, habit_pomodoro, habit_why) VALUES (%d, %s, %s, %v, %s)", habit.ID, habit.Name, habit.Unit, habit.Pomodoro, habit.Why)
	_, err := db.Exec(insert)
	return err
}
