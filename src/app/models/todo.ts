import { Priority } from './priority';

export class Todo {
    id: number;
    taskname: string;
    performdate: Date;
    category: string;
    priority: Priority;
    isdone: boolean;

    constructor() {
        this.id = -1;
        this.taskname = "";
        this.performdate = new Date();
        this.category = "Other";
        this.priority = Priority.LOW;
        this.isdone = false;
    }
}