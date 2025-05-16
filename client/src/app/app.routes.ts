import { Routes } from '@angular/router';
import { LandingPageComponent } from './ui/landing-page/landing-page.component';
import { PiEstimatorComponent } from './ui/pi-estimator/pi-estimator.component';
import { CameraViewComponent } from './ui/camera-view/camera-view.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'pi',
    component: PiEstimatorComponent,
  },
  {
    path: 'cameras',
    component: CameraViewComponent,
  },
];
