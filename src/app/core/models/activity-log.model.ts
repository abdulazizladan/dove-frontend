export interface ActivityLog {
    id: string;
    user_id: string;
    action_type: string;
    timestamp: Date;
    details: string;
}
