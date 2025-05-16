# IPConfigure Coding Assessment

This Angular application is my attempt at completing the IPConfigure JavaScript coding evaluation. It consists of a simple dashboard that links to two standalone components:

1. **Pi Estimator** — Calculates an approximation of Pi using a Taylor series
2. **Camera Viewer** — Authenticates with the Orchid API and displays camera streams with auto-refreshing still images

The application uses Angular 19 with standalone components, is styled with Tailwind CSS, and is fully responsive. Deployment is handled via GitHub Pages.

---

##  Live Demo

Deployed via GitHub Pages:  
https://bricc1024.github.io/ipconfig-project/

---

##  Project Structure

ipconfig-project/  
├── client/  # Angular application source  
│ ├── app/  
│ │ ├── ui/  # Includes dashboard, Pi, and camera-view components  
│ │ └── shared/  # Api interceptor services and models  
├── docs/      # Production build output (GitHub Pages source)  
├── README.md   

---

##  Features

### Dashboard

- Serves as the entry point for the app
- Links to both the Pi Estimator and Camera Viewer
- Clean, minimalist layout

### Pi Estimator

- Calculates Pi using the first 20 terms of a Taylor series approximation
- Computes and displays both the estimated value of Pi and its error
- Includes a Home button to return to the dashboard

### Camera Viewer

- Authenticates with the Orchid API using fixed credentials
- Fetches the list of available cameras
- Extracts the primary stream ID from each camera
- Loads a still frame via `getFrameBlob()` and renders it as a secure object URL
- Refreshes each frame every 5 seconds
- Fully responsive layout using Tailwind’s flexbox grid
- Includes a Home button for returning to the dashboard

---

## Unit Testing

Includes unit tests for:

- `AuthService` — login and session persistence
- `CameraService` — camera and frame requests
- `ApiInterceptor` — auth header injection and exclusions
- `CameraViewComponent` — verifies camera card rendering and DOM output

Run tests with:  ng test

---

## Tech Stack

- `Angular 19`
- `RxJs`
- `TypeScript`
- `Talwind CSS`
- `Heroicons (SVG)`
- `Jasmine + Karma`
- `GitHub Pages`

