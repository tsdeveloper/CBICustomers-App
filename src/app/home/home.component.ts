import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../features/account/register/register.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RegisterComponent, CommonModule]
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor() {
    console.log(`ngOnInit ${this.registerMode}`)

   }

  ngOnInit() {
    console.log(`ngOnInit ${this.registerMode}`)
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
