import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
	@Input()
	public todo: Todo;

	@Output()
	public edited = new EventEmitter<Todo>();

	@Output()
	public checked = new EventEmitter<Todo>();

	public checkboxClicked(event: Event) {
		event.preventDefault();
		this.checked.emit(this.todo);
	}

	public editButtonClicked() {
		this.edited.emit(this.todo);
	}
}
