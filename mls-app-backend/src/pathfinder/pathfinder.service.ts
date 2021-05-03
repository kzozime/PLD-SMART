import { Injectable } from '@nestjs/common';
/*import { PathFinder } from 'geojson-path-finder';
import * as network from 'export'*/

@Injectable()
export class PathfinderService {
    pathFinder = 0 //new PathFinder(network);
    start = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [45.782691, 4.876669]
        }
    };

    finish = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [45.769949, 4.873955]
        }
    };

    findPath(): any{
        //return this.pathFinder.findPath(this.start, this.finish);
    }
}

