export class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly dateOfBirth: Date;
    readonly email: string;
    readonly password: string;
    readonly nbInvitation: number;
    readonly inviteCode: string;
    readonly verified: boolean;
}