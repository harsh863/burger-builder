export interface DeliveryDetail{
    name: string;
    email: string;
    contact_number: string;
    delivery_method: string;
    address: {
        street: string;
        zip: string;
        country: string;
    };
}