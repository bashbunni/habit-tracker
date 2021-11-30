package main

import "testing"

func TestGetHabits(t *testing.T) {
  got := GetHabits()
  want := []Habit{
    Habit{id: 1, name: "yoga", unit: "hours", pomodoro: false, why: "I want to do yoga so I can be more relaxed"},
    Habit{id: 2, name: "meditation", unit: "15 minutes", pomodoro: false, why: "I want to meditate so I can be more present"},
    Habit{id: 3, name: "hydration", unit: "litres", pomodoro: false, why: "I want to be hydrated so I can feel better"},
  }

  if got[0] != want[0] {
    t.Logf("got %v, want %v", got[0], want[0]);
  }
}
