import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraViewComponent } from './camera-view.component';
import { AuthService } from '../../shared/service/auth.service';
import { CameraService } from '../../shared/service/camera.service';
import { of } from 'rxjs';
import { Camera } from '../../shared/model/camera.model';
import { provideRouter } from '@angular/router';

// Stub data
const mockCameras: Camera[] = [
  {
    id: 1,
    name: 'Front Door',
    active: true,
    primaryStream: { id: 101, href: '', status: {} },
  },
  {
    id: 2,
    name: 'Back Lot',
    active: true,
    primaryStream: { id: 102, href: '', status: {} },
  },
];

// AuthService stub
class AuthServiceStub {
  login() {
    return of({}); // Just needs to emit something to allow chaining
  }
}

// CameraService stub
class CameraServiceStub {
  getCameras() {
    return of(mockCameras);
  }

  getFrameBlob(streamId: number) {
    return of(new Blob()); // Dummy image blob
  }
}

describe('CameraViewComponent', () => {
  let component: CameraViewComponent;
  let fixture: ComponentFixture<CameraViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraViewComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: CameraService, useClass: CameraServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CameraViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of camera cards', () => {
    const cameraCards = fixture.nativeElement.querySelectorAll(
      'div[class*="max-w-[400px]"]'
    );
    expect(cameraCards.length).toBe(mockCameras.length);
  });

  it('should display camera names and IDs', () => {
    const compiled = fixture.nativeElement;
    mockCameras.forEach((camera) => {
      expect(compiled.textContent).toContain(camera.name);
      expect(compiled.textContent).toContain(`ID: ${camera.id}`);
    });
  });
});
