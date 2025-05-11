export interface UserInterface{
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    addressCount: number; 
    createdAt: string;
}