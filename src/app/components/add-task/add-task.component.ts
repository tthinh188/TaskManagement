import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Quote } from 'src/app/module';
import { AppService } from 'src/app/services/app.service';
import { CanLeave } from 'src/app/services/deactivate-guard.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, CanLeave {
  quote!: Quote
  error: string = '';
  constructor(private appService: AppService) { }
  access_token = localStorage.getItem('access_token');

  ngOnInit(): void {
  }

  handleAddTask(form: NgForm): void {
    if (form.valid) {
      this.quote = {
        ... this.quote,
        QuoteType: form.value.QuoteType,
        Contact: form.value.Contact,
        Task: form.value.Task,
        DueDate: new Date(form.value.DueDate).toISOString().slice(0, 19),
        TaskType: form.value.TaskType,
      }

      if (this.access_token) {
        this.appService.addQuote(this.access_token, this.quote)
          .subscribe(res => {
            this.error = '';
            window.location.href = '/';
          }, err => {
            console.log(err)
          });
      }
    }
    else {
      this.error = 'Please fill the required fields'
    }
  }

  canDeactivate() {
    const confirmResult = confirm('Are you sure you want to leave this page ? ');
    if (confirmResult === true) {
      return true;
    } else {
      return false;
    }
  }
}
