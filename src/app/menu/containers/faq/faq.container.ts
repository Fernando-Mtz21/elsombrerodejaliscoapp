import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { MenuService } from '@services/menu.service';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './faq.container.html',
  styleUrls: ['./faq.container.css']
})
export class FaqContainer implements OnInit {

  faqs: any[] = [];
  loading = false;

  constructor(
    private menuService: MenuService,
    private spinnerService: SpinnerService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    this.loading = true;
    this.spinnerService.show();

    this.menuService.getFaqs().subscribe({
      next: (faqs: any[]) => {
        this.faqs = faqs || [];
        console.log('Faqs:', this.faqs);
      },

      error: (err) => {
        console.error('Error al obtener FAQs:', err);
      },

      complete: () => {
        this.loading = false;
        this.spinnerService.hide();
        this.cd.detectChanges();
      }
    });
  }
}