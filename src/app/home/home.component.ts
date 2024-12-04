import { AccountService } from './../_services/account.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, OnDestroy, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  registerMode = false;
 visibleButton: boolean = true;
  @Input() test?: string;
  accountService = inject(AccountService)

  ngOnInit() {
    // Subscribe to the BehaviorSubject to get the latest value
    this.accountService.visibleCancelRegister$.subscribe((value) => {
      this.visibleButton = value;
    });

    console.log(`visibleButton ${this.visibleButton}`)
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {

    this.registerMode = event;
  }


}
