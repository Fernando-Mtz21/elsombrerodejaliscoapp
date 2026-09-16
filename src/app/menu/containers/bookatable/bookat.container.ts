import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookat',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './bookat.container.html',
  styleUrls: ['./bookat.container.css']
})
export class bookatContainer implements OnInit {

  constructor(
  ) {}

  ngOnInit(): void {

  }
}