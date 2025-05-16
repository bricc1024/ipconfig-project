import { TestBed } from '@angular/core/testing';
import { CameraService } from './camera.service';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Camera } from '../../shared/model/camera.model';
import { CamerasResponse } from '../../shared/model/cameras-response.model';

describe('CameraService', () => {
  let service: CameraService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CameraService,
      ],
    });

    service = TestBed.inject(CameraService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch cameras and return camera array', () => {
    const mockCameras: Camera[] = [
      {
        id: 1,
        name: 'Cam 1',
        active: true,
        primaryStream: { id: 1001, href: '', status: {} },
      },
      {
        id: 2,
        name: 'Cam 2',
        active: true,
        primaryStream: { id: 1002, href: '', status: {} },
      },
    ];

    const mockResponse: CamerasResponse = {
      href: '/service/cameras',
      cameras: mockCameras,
    };

    service.getCameras().subscribe((cameras) => {
      expect(cameras.length).toBe(2);
      expect(cameras).toEqual(mockCameras);
    });

    const req = httpMock.expectOne(
      'https://orchid.ipconfigure.com/service/cameras'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch a camera frame blob', () => {
    const dummyBlob = new Blob(['fake image data'], { type: 'image/jpeg' });
    const streamId = 123;

    service.getFrameBlob(streamId).subscribe((blob) => {
      expect(blob).toBeTruthy();
      expect(blob.size).toBe(dummyBlob.size);
      expect(blob.type).toBe('image/jpeg');
    });

    const req = httpMock.expectOne(
      'https://orchid.ipconfigure.com/service/streams/123/frame'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(dummyBlob);
  });
});
