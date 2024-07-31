export type Customer = {
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

export type Seller = {
    FullName: string,
    SellerEmail: string,
    ShopName:string,
    ShopAddress: string,
    GSTNO: string,
    PhotoUrl: string,
    Phone: string,
    City: string,
    State: string,
    Country: string,
    PinCode: string,
    uid?: string,
    DateOfBirth:string
}