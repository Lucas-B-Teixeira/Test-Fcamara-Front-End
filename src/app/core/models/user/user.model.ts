export interface UserInterface{
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
}