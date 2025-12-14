import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-staff-layout',
  standalone: false,
  templateUrl: './staff-layout.html',
  styleUrl: './staff-layout.scss',
})
export class StaffLayout {
  private authService = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 800px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout();
  }
}
