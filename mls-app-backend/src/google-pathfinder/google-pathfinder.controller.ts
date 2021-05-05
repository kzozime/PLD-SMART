import { BadRequestException, Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { CreatePointDto } from 'src/dto/create-point.dto';
import { GooglePathfinderService } from 'src/google-pathfinder/google-pathfinder.service';

@Controller('googlepathfinder')
export class GooglePathfinderController {
    constructor(private googlePathFinder: GooglePathfinderService){}

    @Get()
    async findPath(): Promise<any>{
        const path = await this.googlePathFinder.findPath();

        if(!path) {
            throw new BadRequestException('coordonnées non-valides');
        }

        return this.googlePathFinder.getCoordinatesList(path.data);
    }

    @Post()
    async pathfinder(@Body() points:CreatePointDto[]): Promise<any> {

        var tab: String[] = [];
        var jsonToString = JSON.stringify(points);
        var objectValue = JSON.parse(jsonToString);
        let index = 0;
        console.log("debut du post");
        try {

            tab.push(objectValue["points"][0]);

            while (objectValue["points"][index + 1] !== undefined) {
                console.log(index);
                const path = await this.googlePathFinder.findPath2(objectValue["points"][index], objectValue["points"][index + 1]);
                tab = tab.concat( this.googlePathFinder.getCoordinatesList(path.data) );
                index ++;
                if(!path) {
                    throw new BadRequestException('coordonnées non-valides');
                }
            }
            console.table(tab);
            return tab;

        } catch (error) {
            throw new UnauthorizedException();
        }
       

        
    }
}
