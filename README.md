# Dove Frontend Application

Dove is a modern Angular application designed for managing organizational structures, patient records, and laboratory operations. It is built with a modular architecture enabling scalability and maintainability.

## 🛠 Technical Stack

- **Framework**: Angular 20
- **State Management**: @ngrx/signals (SignalStore)
- **UI Component Library**: Angular Material
- **CSS Preprocessor**: SCSS
- **Authentication**: JWT (JSON Web Tokens) with `jwt-decode` for role-based access control.
- **Environment Management**: Environment files for configuration (e.g., API Base URL).

## 🏗 Architecture & Directory Structure

The application follows a feature-based modular architecture located in `src/app/features`.

### Core Directory (`src/app/core`)
Contains singleton services, models, guards, and interceptors.
- **AuthService**: Handles login, logout, and token management.
- **Interceptors**: `JwtInterceptor` attaches the bearer token to outgoing requests.
- **Guards**: `AuthGuard` and `RoleGuard` (planned) protect routes.

### Features Directory (`src/app/features`)
Contains lazy-loaded feature modules.
- **Auth**: Login and registration logic.
- **Admin**: Dashboard and management tools for administrators.
- **Staff**: Operational tools for staff members.

### Shared Directory (`src/app/shared`)
Contains reusable UI components, pipes, and directives used across multiple features.

## 🔐 Authentication & Security

- **Login Flow**: Users authenticate via email/password.
- **Token Handling**:
  - The backend returns an `access_token`.
  - The frontend decodes this token using `jwt-decode` to extract user details (ID, Email, Role).
  - The token is stored in local storage using `ngx-webstorage`.
- **Role-Based Redirect**: Upon successful login, users are automatically redirected to their respective dashboards (`/admin` or `/staff`) based on the `role` claim in the JWT.

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

```bash
npm install
```

### Running the Application

```bash
ng serve
```
Navigate to `http://localhost:4200/`.

### strict CommonJS Warning
We use `jwt-decode` which is a CommonJS dependency. This is explicitly allowed in `angular.json` to suppress build warnings.

## 🧪 Testing

### Unit Tests
```bash
ng test
```

### End-to-End Tests
(Configuration TBD)

## 📦 Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
