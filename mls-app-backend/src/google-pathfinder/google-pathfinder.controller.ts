import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
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
    async pathfinder(@Body("startLat") startLat:String, @Body("startLong") startLong:String, @Body("endLat")endLat:String, @Body("endLong")endLong:String): Promise<any> {
        const path = await this.googlePathFinder.findPath2(startLat, startLong, endLat, endLong);

        if(!path) {
            throw new BadRequestException('coordonnées non-valides');
        }

        return this.googlePathFinder.getCoordinatesList(path.data);
    }
}
