import { Test } from './test.model';
import { Patient } from './patient.model';
import { TestResult } from '../../features/staff/components/test-request-result/test-request-result.model';

export enum RequestStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export interface TestRequest {
    id: string;
    patientId: string;
    patientName?: string; // Optional as it might not be in response
    patient?: Patient; // Added this relation
    test?: Test; // Nested object from response
    testId?: string; // Optional for creation payload
    priority?: 'LOW' | 'MEDIUM' | 'HIGH'; // Made optional as it's missing in JSON example
    status: RequestStatus; // JSON says "Pending" (capitalized), need to verify enum compatibility
    discount?: number;
    discount_reason?: string;
    outstanding_balance?: number;
    payments?: any[]; // Placeholder for payments array
    result?: TestResult; // Test result if available
    notes?: string;
    created_at: string; // Use string for ISO dates from JSON
    updated_at: string;
}
