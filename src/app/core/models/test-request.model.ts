export enum RequestStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export enum TestType {
    BLOOD_TEST = 'BLOOD_TEST',
    URINE_TEST = 'URINE_TEST',
    X_RAY = 'X_RAY',
    MRI = 'MRI'
}

export interface TestRequest {
    id: string;
    patientId: string;
    patientName: string; // Denormalized for display convenience
    testType: TestType;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    status: RequestStatus;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
