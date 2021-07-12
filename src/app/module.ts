export interface Credential {
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Role: string;
}

export interface Quote {
    QuoteID: number;
    QuoteType: string;
    Contact: string;
    Task: string;
    DueDate: string;
    TaskType: string;
}