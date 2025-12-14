export interface Hospital {
    id: string;
    name: string;
    address: string;
    phone: string;
    contact_person: string;
    created_at: string;
    updated_at: string;
}

export interface ReferringDoctor {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    hospital?: Hospital;
    hospitalId: string;
    created_at: string;
    updated_at: string;
}
