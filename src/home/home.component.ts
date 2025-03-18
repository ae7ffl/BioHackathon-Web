import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  private onScroll = () => {
    console.log('Scroll detected'); // Mensaje de prueba
    const menu = document.getElementById('menu') as HTMLElement | null;
    if (menu) {
      if (window.scrollY > 100) {
        menu.style.height = '100vh';
        menu.style.visibility = 'visible';
      } else {
        menu.style.height = '0';
        menu.style.visibility = 'hidden';
      }
    }
  };

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }
}
