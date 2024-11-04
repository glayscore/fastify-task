export interface AuthRequestBody {
    username: string;
    password?: string;
    currentPassword?: string;
    newPassword?: string;
}
