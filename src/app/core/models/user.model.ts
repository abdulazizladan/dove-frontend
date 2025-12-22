export enum UserRole {
    ADMIN = 'admin',
    STAFF = 'staff',
    DOCTOR = 'doctor',
    RECEPTIONIST = 'receptionist'
}

export interface User {
    id: string;
    // username: string; // Removed as per new JSON structure not having it implicitly, but let's check. JSON doesn't show username.
    first_name: string | null;
    last_name: string | null;
    email: string;
    role: UserRole;
    isActive: boolean;
    created_at: string;
    updated_at: string;
    password?: string;
    designationId?: string;
    status: 'active' | 'suspended';
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}
