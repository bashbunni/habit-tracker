package main

import (
	"database/sql"
	"fmt"
	"log"
)

type HabitRepository interface {
	GetAllHabits() []Habit
	GetHabit(uint) Habit
	AddHabit(Habit) error
	EditHabit(Habit) Habit
	DeleteHabit(uint) bool
}

type MySQLRepository struct {
	DB *sql.DB
}

func NewMySQLConnection() *MySQLRepository {
	s := MySQLRepository{DB: DBConnect()}
	return &s
}

// GetHabits retrieves the list of Habits.
func (s MySQLRepository) GetAllHabits() []Habit {
	results, err := s.DB.Query("SELECT * FROM habit")
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

// GetHabit gets a habit with the given ID.
func (s MySQLRepository) GetHabit(id uint) Habit {
	var result Habit
	err := s.DB.QueryRow("SELECT * FROM habit WHERE habit_id = ?", id).Scan(&result.ID, &result.Name, &result.Unit, &result.Pomodoro, &result.Why)
	if err != nil {
		log.Fatal(err)
	}
	return result
}

// AddHabitFromJSON adds a habit given a JSON value of a habit object
func (s *MySQLRepository) AddHabitFromJSON(req []byte) error {
	return s.AddHabit(JSONToHabit(req))
}

// AddHabit add a new habit to the database
func (s MySQLRepository) AddHabit(habit Habit) error {
	fmt.Println(habit)

	insert := fmt.Sprintf("INSERT INTO habit(habit_id, habit_name, habit_unit, habit_pomodoro, habit_why) VALUES ('%d', '%s', '%s', '%v', '%s')", habit.ID, habit.Name, habit.Unit, habit.Pomodoro, habit.Why)
	_, err := s.DB.Exec(insert)
	return err
}

func (s MySQLRepository) EditHabitFromJSON(req []byte) error {
	return s.EditHabit(JSONToHabit(req))
}

func (s MySQLRepository) EditHabit(habit Habit) error {
	_, err := s.DB.Exec("UPDATE habit SET habit_id = ?, habit_name = ?, habit_unit = ?, habit_pomodoro = ?, habit_why = ? WHERE habit_id = ?", habit.ID, habit.Name, habit.Unit, habit.Pomodoro, habit.Why, habit.ID)
	return err
}

func (s MySQLRepository) DeleteHabit(id uint) bool {
	_, err := s.DB.Exec("DELETE FROM habit WHERE habit_id = ?", id)
	if err != nil {
		log.Fatal(err)
	}
	return true
}
