import { CommonModule } from '@angular/common';
import { environment } from './../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  env = environment.apiUrl;
  title = 'CBICustomers-App';
  emailExist: boolean = false;
  ngOnInit(): void {


  }

}
