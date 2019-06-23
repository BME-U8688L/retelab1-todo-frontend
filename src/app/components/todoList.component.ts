import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Priority } from '../models/priority';

declare var $: any;

enum Mode {
	ADD, UPDATE
}

@Component({
	selector: 'app-todo-list',
	templateUrl: './todoList.component.html',
	styleUrls: ['./todoList.component.scss']
})
export class TodoListComponent implements OnInit {

	public todos: Todo[];

	public editedMode: Mode = Mode.ADD;
	public editedTodo: Todo = new Todo();

	constructor(private todoService: TodoService) {

	}

	public ngOnInit(): void {
		this.getTodos();
	}

	private getTodos() {
		this.todos = [];
		this.todoService.getTodos().subscribe((data: Todo[]) => {
			console.log(data);
			this.todos = data;
		});
	}

	public editRequested(todo: Todo) {
		this.editedTodo = todo;
		this.editedMode = Mode.UPDATE;
		$('#todoModal').modal('show');
	}

	public checkRequested(todo: Todo) {
		this.editedTodo = todo;
		this.editedMode = Mode.UPDATE;
		this.editedTodo.isdone = !this.editedTodo.isdone;
		this.saveChanges();
	}

	public saveChanges() {
		if(this.editedMode == Mode.ADD) {
			this.todoService.addTodo(this.editedTodo).subscribe(() => {
				$('#todoModal').modal('hide');
				this.getTodos();
			})
		}
		else if(this.editedMode == Mode.UPDATE) {
			this.todoService.updateTodo(this.editedTodo.id, this.editedTodo).subscribe(() => {
				$('#todoModal').modal('hide');
				this.getTodos();
			})
		}
		else {
			throw new Error();
		}
	}

	public deleteTodo() {
		if(this.editedMode == Mode.UPDATE) {
			this.todoService.deleteTodo(this.editedTodo.id).subscribe(() => {
				$('#todoModal').modal('hide');
				this.getTodos();
			})
		}
	}

	public addTodo() {
		this.editedTodo = new Todo();
		this.editedMode = Mode.ADD;
		$('#todoModal').modal('show');
	}

	public getColor(todo: Todo) {
		switch(todo.priority) {
			case Priority.HIGH: 
				return ['text-white', 'bg-danger'];
			case Priority.IMPORTANT: 
				return ['text-white', 'bg-warning'];
			case Priority.MEDIUM: 
				return ['text-white', 'bg-secondary'];
			case Priority.LOW: 
				return ['bg-light'];
		}
	}
}
