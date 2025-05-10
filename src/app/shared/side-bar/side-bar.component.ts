import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  imports: [
    CommonModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit, OnDestroy{

  selectedItem!: 
  'dashboard' |
  'users' | 
  'address';

  private destroy$ = new Subject<void>(); 
  
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.setSelectedItemBasedOnUrl(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)  
    ).subscribe((event) => {
      const navigationEndEvent = event as NavigationEnd;
      const currentUrl = navigationEndEvent.urlAfterRedirects;
    
      this.setSelectedItemBasedOnUrl(currentUrl);
    });
  }

    
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectItem(item: any){
    this.selectedItem = item
  }

  private setSelectedItemBasedOnUrl(url: string): void {
    switch (true) {
      case url.includes('dashboard'):
        this.selectedItem = 'dashboard';
        break;
      case url.includes('users'):
        this.selectedItem = 'users';
        break;
      case url.includes('address'):
        this.selectedItem = 'address';
        break;
      default:
        this.selectedItem = 'dashboard';
    }
  }


}
