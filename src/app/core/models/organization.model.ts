export interface Designation {
    id: string;
    name: string;
}

export interface Department {
    id: string;
    name: string;
    created_at?: string;
    updated_at?: string;
    // organization: Organization; // Circular reference if Organization contains departments, make optional or specific type
    organizationId?: string;
    designations?: Designation[];
}

export interface Organization {
    id: string;
    name: string;
    address: string;
    departments: Department[];
}
