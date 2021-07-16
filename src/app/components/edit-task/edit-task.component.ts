import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Quote } from 'src/app/module';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  error!: string;
  quote!: Quote;
  editing: boolean = true;

  @Input() fetchAllQuotes: any;
  @Input() quotes!: Array<Quote>;
  @Output() quotesChange: EventEmitter<Array<Quote>> = new EventEmitter();

  constructor(private appService: AppService) { }

  ngOnInit(): void {

  }

  handleEdit(form: NgForm): void {
    if (form.valid) {
      this.quote = {
        ... this.quote,
        QuoteType: form.value.QuoteType,
        Contact: form.value.Contact,
        Task: form.value.Task,
        DueDate: new Date(form.value.DueDate).toISOString().slice(0, 19),
        TaskType: form.value.TaskType,
      }
      this.appService.updateQuote(this.quote)
        .subscribe(res => {
          this.appService.getAllQuote()
            .subscribe(res => {
              this.quotes = res;
            },
              err => {
                console.log(err);
              }, () => {
                this.quotesChange.emit(this.quotes);
              });
        }, err => {
          console.log(err);
        }, () => {
          this.editing = false;
          this.error = '';
        });

    } else {
      this.error = 'Please fill the required fields'
    }
  }

  closeEditBox(): void {
    this.editing = false;
  }

  goToEdit(ID: number): void {
    this.appService.getQuote(ID).subscribe(q => {
      this.quote = q;
      this.editing = true;
    }, err => {
      console.log(err)
    })
  }


}
