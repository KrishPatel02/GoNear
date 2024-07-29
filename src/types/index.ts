export type User = {
    Email: string,
    FullName: string,
    Address: string,
    Phone: string,
    DateOfBirth: string,
    PhotoUrl: string,
    City: string,
    State: string,
    Country: string,
    uid?: string,
    PinCode: string
}

export type Customer = {
    Address: string;
    City: string;
    Country: string;
    DateOfBirth: string;
    Email: string;
    FullName: string;
    Phone: string;
    PhotoUrl: string;
    PinCode: string;
    State: string;
    uid: string;
}