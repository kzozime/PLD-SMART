export class CreateReportDto {

    readonly longitude: number;
    readonly latitude: number;
    readonly idUser: string;
    readonly crimeType: string;
    readonly description: string;
    readonly date: Date;

}