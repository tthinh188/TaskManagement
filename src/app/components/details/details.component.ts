import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription  } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { Quote } from 'src/app/module';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id!: number;
  routeSub!: Subscription;
  quote!: Quote;

  constructor(private activatedRoute: ActivatedRoute, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {this.id = params['id']})
    this.appService.getQuote(this.id).subscribe(
      res => {
        this.quote = res;
      },
      err => {
        console.log(err);
      },
    )
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

}
