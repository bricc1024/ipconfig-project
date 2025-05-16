import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/service/auth.service';
import { CameraService } from '../../shared/service/camera.service';
import { Camera } from '../../shared/model/camera.model';
import { switchMap } from 'rxjs';
import { timer, Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-camera-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './camera-view.component.html',
})
export class CameraViewComponent implements OnInit, OnDestroy {
  cameras: Camera[] = [];
  imageUrls: string[] = [];
  frameErrors: boolean[] = [];
  refreshSub: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private cameraService: CameraService
  ) {}

  /**
   * On component init:
   * - Log in to the Orchid API
   * - Fetch the list of cameras
   * - Load initial still frames
   * - Begin a 5-second refresh loop for each frame
   */
  ngOnInit(): void {
    this.authService
      .login()
      .pipe(switchMap(() => this.cameraService.getCameras()))
      .subscribe({
        next: (cameras) => {
          this.cameras = cameras;

          cameras.forEach((cam, index) => {
            if (cam.primaryStream?.id) {
              this.loadFrame(cam.primaryStream.id, index);
            } else {
              // Mark error if stream ID is missing
              this.frameErrors[index] = true;
            }
          });

          // Start refresh loop
          this.refreshSub = timer(5000, 5000).subscribe(() => {
            this.cameras.forEach((cam, index) => {
              if (cam.primaryStream?.id) {
                this.loadFrame(cam.primaryStream.id, index);
              } else {
                this.frameErrors[index] = true;
              }
            });
          });
        },
        error: (err) => console.error('Failed to load cameras:', err),
      });
  }

  /**
   * Cleanup:
   * - Unsubscribe from the refresh timer
   * - Revoke all object URLs to release memory
   */
  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();

    this.imageUrls.forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });
  }

  /**
   * Loads a still frame image for a given stream.
   * - Fetches the frame as a Blob
   * - Revokes the previous object URL (if any)
   * - Creates a new object URL and stores it
   * - Updates the error state accordingly
   */
  loadFrame(streamId: number, index: number): void {
    this.cameraService.getFrameBlob(streamId).subscribe({
      next: (blob) => {
        // Revoke old URL if it exists
        if (this.imageUrls[index]) {
          URL.revokeObjectURL(this.imageUrls[index]);
        }

        // Create new URL and store it
        const objectUrl = URL.createObjectURL(blob);
        this.imageUrls[index] = objectUrl;
        this.frameErrors[index] = false;
      },
      error: (err) => {
        console.error(`Failed to load frame for stream ${streamId}`, err);
        this.frameErrors[index] = true;
      },
    });
  }
}
