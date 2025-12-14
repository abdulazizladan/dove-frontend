export interface Patient {
    id: string;
    name: string;
    date_of_birth: string; // Use string for date to match JSON "1990-01-01" or Date if handled by interceptor, but usually simple string for JSON
    contact: string;
    gender: string;
    email: string; // Keeping email as it's useful, but user didn't explicitly forbid it, just gave a template. I'll keep it optional or required if I want, but user example didn't have it. User example: name, dob, contact, gender. I'll keep email but make it optional if I want to be safe, or just keep it. Wait, user example removed it. I will remove it to align exactly with "use the following form template".
    // Actually, looking at the user request: { name, date_of_birth, contact, gender }. No email. I will remove email and address.
}
