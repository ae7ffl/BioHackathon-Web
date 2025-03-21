import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  
  menuVisible: boolean = true;

  currentYear: number = new Date().getFullYear();

  private onScroll = () => {
    console.log('Scroll detected'); 
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

  onMouseMove(event: MouseEvent): void {
    const menu = document.getElementById('menu');
    if (menu) {
      if (event.clientY <= 50) { 
        menu.style.height = '100px';
        menu.style.visibility = 'visible';
      } else {
        menu.style.height = '0';
        menu.style.visibility = 'hidden';
      }
    }
  }


}
