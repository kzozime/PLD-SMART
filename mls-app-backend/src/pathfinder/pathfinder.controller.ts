import { Controller, Get } from '@nestjs/common';
import { PathfinderService } from './pathfinder.service';

@Controller('pathfinder')
export class PathfinderController {
    constructor(private pathFinder: PathfinderService){}

    @Get()
    findPath(){
        return this.pathFinder.findPath();
    }
}
