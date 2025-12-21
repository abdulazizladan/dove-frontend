import { Department } from './organization.model';

export interface Test {
    id: string;
    name: string;
    price: number;
    departmentId: string;
    department?: Department;
    description?: string;
}
