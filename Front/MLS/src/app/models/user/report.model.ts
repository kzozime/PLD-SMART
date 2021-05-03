export class Report{

    constructor(
        public latitude: number,
        public longitude: number,
        public idUser: string,
        public crimeType: string,
        public description: string,
        public date: Date,
        ){}
    
}