export class Point{

    constructor(
        public lat: number,
        public lng: number
        ){}
    
}

export class Points{

    constructor(
        public points: Point[]
        ){}
    
}