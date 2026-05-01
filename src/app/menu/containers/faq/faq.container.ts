import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './faq.container.html',
  styleUrl: './faq.container.css'
})
export class FaqContainer {
constructor(private router:Router ){

}
  protected goBack(): void {
    this.router.navigate(['/']);
  }
}

