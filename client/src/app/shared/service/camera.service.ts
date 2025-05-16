import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Camera } from '../../shared/model/camera.model';
import { CamerasResponse } from '../../shared/model/cameras-response.model';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private readonly baseUrl = 'https://orchid.ipconfigure.com/service';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of all available cameras from the Orchid API.
   *
   * @returns Observable<Camera[]> - an array of camera objects
   */
  getCameras(): Observable<Camera[]> {
    return this.http
      .get<CamerasResponse>(`${this.baseUrl}/cameras`)
      .pipe(map((response) => response.cameras));
  }

  /**
   * Fetches a single still frame as a Blob for a given stream ID.
   * Used to generate an object URL for display in an <img> tag.
   *
   * @param streamId - the ID of the stream to request the frame from
   * @returns Observable<Blob> - binary image data
   */
  getFrameBlob(streamId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/streams/${streamId}/frame`, {
      responseType: 'blob',
    });
  }
}
