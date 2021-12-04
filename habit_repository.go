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

// TODO: check types work with frontend to return useful things; might need to make them pointers

type MySQLHabitRepository struct {
	DB *sql.DB
}

func NewMySQLConnection() *MySQLHabitRepository {
	s := MySQLHabitRepository{DB: DBConnect()}
	return &s
}

// GetHabits retrieves the list of Habits.
func (s MySQLHabitRepository) GetAllHabits() []Habit {
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
func (s MySQLHabitRepository) GetHabit(id uint) Habit {
	var result Habit
	err := s.DB.QueryRow("SELECT * FROM habit WHERE habit_id = ?", id).Scan(&result.ID, &result.Name, &result.Unit, &result.Pomodoro, &result.Why)
	if err != nil {
		log.Fatal(err)
	}
	return result

}

func (s *MySQLHabitRepository) AddHabitFromJSON(req []byte) error {
	return s.AddHabit(JSONToHabit(req))
}

// AddHabit add a new habit to the database
func (s MySQLHabitRepository) AddHabit(habit Habit) error {
	fmt.Println(habit)

	insert := fmt.Sprintf("INSERT INTO habit(habit_id, habit_name, habit_unit, habit_pomodoro, habit_why) VALUES ('%d', '%s', '%s', '%v', '%s')", habit.ID, habit.Name, habit.Unit, habit.Pomodoro, habit.Why)
	_, err := s.DB.Exec(insert)
	return err
}

func (s MySQLHabitRepository) EditHabitFromJSON(req []byte) error {
	return s.EditHabit(JSONToHabit(req))
}

func (s MySQLHabitRepository) EditHabit(habit Habit) error {
	_, err := s.DB.Exec("UPDATE habit SET habit_id = ?, habit_name = ?, habit_unit = ?, habit_pomodoro = ?, habit_why = ? WHERE habit_id = ?", habit.ID, habit.Name, habit.Unit, habit.Pomodoro, habit.Why, habit.ID)
	return err
}

func (s MySQLHabitRepository) DeleteHabit(id uint) bool {
	_, err := s.DB.Exec("DELETE FROM habit WHERE habit_id = ?", id)
	if err != nil {
		log.Fatal(err)
	}
	return true
}
