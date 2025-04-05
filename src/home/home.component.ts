import { Component, OnInit, OnDestroy, HostListener, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  isDiscoverVisible: WritableSignal<boolean> = signal(true);

  private animationFinished = false;

  currentYear: number = new Date().getFullYear();

  public onScroll = () => {
    console.log('Scroll detected'); 
    const menu = document.getElementById('menu') as HTMLElement | null;
    if (menu) {
      this.updateNavbarVisibility(undefined, window.scrollY); // Usar la nueva función
      if (window.scrollY > 100) {
        // visibilidad controlada por UpdateNavbar
      } else {
        this.isDiscoverVisible.set(false);
        console.log('isDiscoverVisible', this.isDiscoverVisible()); 
      }
    }
  };

  private toggleDiscoverSection = () => {
    const discoverSection = document.getElementById('discover') as HTMLElement | null;
    if (discoverSection) {
      if (window.scrollY > 100 && discoverSection.style.height !== '0px') {
        discoverSection.style.height = '0px';
      } else if (window.scrollY <= 100 && discoverSection.style.height !== 'auto') {
        discoverSection.style.height = '100vh';
      }
    }
  }

  ngOnInit(): void {
    // Simular el fin de la animación después de 1 segundo
    setTimeout(() => {
    this.animationFinished = true;
    console.log('Animation finished');
    this.updateNavbarVisibility(); // después de la animación
    }, 500); // Ajusta este tiempo según la duración de tu animación (1s en el CSS)  

    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('scroll', this.toggleDiscoverSection);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('scroll', this.toggleDiscoverSection);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const menu = document.getElementById('menu');
    console.log("event.clientY", event.clientY);
    this.updateNavbarVisibility(event.clientY); // Usar la nueva función
  }

  @HostListener('window:scroll')
  makeDiscoverSectionVisible() {
    if (window.scrollY < 100) {
      this.isDiscoverVisible.set(true);
      const hideDiscover = document.getElementById('hide-discover-btn') as HTMLInputElement | null;
      if (hideDiscover) {
        hideDiscover.checked = true; // Check the checkbox if scrolling back up
      }
    }
  }

  // Nueva función para combinar las condiciones de ratón y scroll
  private updateNavbarVisibility(clientY?: number, scrollY: number = window.scrollY): void {
    const menu = document.getElementById('menu') as HTMLElement | null;
    if (!menu) return;

    if (!this.animationFinished) {
      menu.style.height = '0';
      menu.style.visibility = 'hidden';
      return;
    }

    const isMouseAtTop = clientY !== undefined && clientY <= 100;
    if (isMouseAtTop) {
      menu.style.height = '100px';
      menu.style.visibility = 'visible';
    } else {
      menu.style.height = '0';
      menu.style.visibility = 'hidden';
    }
  }
}
