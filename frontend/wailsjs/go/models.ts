/* Do not change, this code is generated from Golang structs */

export {};

export class Date {
    id: string;
    date: string;
    count: number;
    habit_id: number;

    static createFrom(source: any = {}) {
        return new Date(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.id = source["id"];
        this.date = source["date"];
        this.count = source["count"];
        this.habit_id = source["habit_id"];
    }
}

export class Habit {
    id: number;
    name: string;
    unit: string;
    pomodoro: boolean;
    why: string;

    static createFrom(source: any = {}) {
        return new Habit(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.id = source["id"];
        this.name = source["name"];
        this.unit = source["unit"];
        this.pomodoro = source["pomodoro"];
        this.why = source["why"];
    }
}




