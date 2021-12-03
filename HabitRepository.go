package main

import (
	"fmt"
	"log"
)

type HabitRepository interface {
	GetHabits() []Habit
	AddHabit(Habit) error
	EditHabit(Habit) Habit
	DeleteHabit(uint) bool
}

func GetHabits() []Habit {
	db := DBConnect()
	defer db.Close()
	results, err := db.Query("SELECT * FROM habit")
	if err != nil {
		log.Fatal(err)
	}
	defer results.Close()
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

func EditHabit(habit Habit) Habit {
	db := DBConnect()
	defer db.Close()
	_, err := db.Exec("UPDATE habit SET habit_id = ?, habit_name = ?, habit_unit = ?, habit_pomodoro = ?, habit_why = ? WHERE habit_id = ?", habit.ID, habit.Name, habit.Unit, habit.Pomodoro, habit.Why, habit.ID)
	if err != nil {
		log.Fatal(err)
	}
	res, err := db.Exec("SELECT * FROM habit WHERE habit_id = ?", habit.ID)
	fmt.Println(res)
	return Habit{}
}

func AddHabit(habit Habit) error {
	db := DBConnect()
	defer db.Close()
	insert := fmt.Sprintf("INSERT INTO habit(habit_id, habit_name, habit_unit, habit_pomodoro, habit_why) VALUES (%d, %s, %s, %v, %s)", habit.ID, habit.Name, habit.Unit, habit.Pomodoro, habit.Why)
	_, err := db.Exec(insert)
	return err
}
