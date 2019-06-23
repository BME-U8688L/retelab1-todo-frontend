import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todoList.component';
import { TodoService } from './services/todo.service';
import { TodoComponent } from './components/todo.component';

@NgModule({
	declarations: [
		AppComponent,
		TodoListComponent,
		TodoComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule
	],
	providers: [
		TodoService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
