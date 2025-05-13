import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-pi-estimator',
  imports: [CommonModule, RouterModule],
  templateUrl: './pi-estimator.component.html',
})
export class PiEstimatorComponent {
  estimate: number = 0;
  error: number = 0;

  constructor() {
    this.calculatePi();
  }

  private calculatePi(): void {
    const x = 1;
    let piOver4 = 0;

    for (let i = 1; i <= 39; i += 2) {
      const left = Math.pow(-1, (i - 1) / 2);
      const right = Math.pow(x, i) / i;
      piOver4 += left * right;
    }

    this.estimate = piOver4 * 4;
    this.error = Math.abs(Math.PI - this.estimate);
  }
}
