import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramSub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //the first declaration is unnecessary since we subscribe to the params changing
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    this.paramSub = this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'],
        this.user.name = params['name']
    }
    );
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe(); //this isn't required, angular will destroy observables for you. this is only required with custom written subscriptions
  }
}
