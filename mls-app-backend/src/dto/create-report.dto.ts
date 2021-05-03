export class CreateReportDto {

    readonly latitude: number;
    readonly longitude: number;
    readonly idUser: string;
    readonly crimeType: string;
    readonly description: string;
    readonly date: Date;

}