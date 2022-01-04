interface go {
  "main": {
    "MySQLRepository": {
		AddCount(arg1:Date):Promise<Error>
		AddCountFromJSON(arg1:Array<number>):Promise<Error>
		AddDate(arg1:Date):Promise<Error>
		AddHabit(arg1:Habit):Promise<Error>
		AddHabitFromJSON(arg1:Array<number>):Promise<Error>
		DeleteHabit(arg1:number):Promise<boolean>
		EditHabit(arg1:Habit):Promise<Error>
		EditHabitFromJSON(arg1:Array<number>):Promise<Error>
		GetAllDates(arg1:number):Promise<Array<Date>>
		GetAllHabits():Promise<Array<Habit>>
		GetHabit(arg1:number):Promise<Habit>
		GetTodaysCountForHabit(arg1:number):Promise<Date>
		TodayExists(arg1:number):Promise<boolean>
    },
  }

}

declare global {
	interface Window {
		go: go;
	}
}
