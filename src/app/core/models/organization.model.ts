export interface Designation {
    id: string;
    name: string;
}

export interface Department {
    id: string;
    name: string;
    designations: Designation[];
}

export interface Organization {
    id: string;
    name: string;
    address: string;
    departments: Department[];
}
