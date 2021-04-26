export class CreateUserDto {
    readonly id: string
    readonly firstName: string;
    readonly lastName: string;
    readonly dateOfBirth: Date;
    readonly email: string;
    readonly password: string;
}