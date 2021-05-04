import { Injectable } from '@nestjs/common';
import {Client, DirectionsResponse, LatLng} from "@googlemaps/google-maps-services-js";
import { google } from 'googleapis';
import { DirectionsResponseData } from '@googlemaps/google-maps-services-js/dist/directions';

@Injectable()
export class GooglePathfinderService {

    constructor(){}

    client = new Client();

    async findPath(): Promise<DirectionsResponse> {

        let from: LatLng = "34.1424067, -117.9220029";
        let to: LatLng = { lat: 33.8036452, lng: -118.3626552 };

        const res = await this.client.directions(
            {
            params: {
                origin: from ,
                destination: to,
                key: "AIzaSyAFQ3wsPaN6KPpjqgcoRpAct4aG5c8VMj0",
                }
            });
        if (res) {
            return res;
        }
        return undefined;
    }

    async findPath2(startLat:String, startLong:String, endLat:String, endLong:String): Promise<DirectionsResponse> {
        
        let from: LatLng = startLat + ", " + startLong;
        let to: LatLng = endLat + ", " + endLong;

        const res = await this.client.directions(
            {
            params: {
                origin: from ,
                destination: to,
                key: "AIzaSyAFQ3wsPaN6KPpjqgcoRpAct4aG5c8VMj0",
                }
            });
        if (res) {
            return res;
        }
        return undefined;
    }

    getCoordinatesList(jsonTest: DirectionsResponseData): any {
        var jsonToString = JSON.stringify(jsonTest);
        var objectValue = JSON.parse(jsonToString);
        var tableauCoordonnee: string[]=[];
        var i = 0;
        var endLocation = objectValue['routes'][0]['legs'][0]["end_location"];
        var startLocation = objectValue['routes'][0]['legs'][0]["start_location"];
        tableauCoordonnee.push(startLocation);

        while(objectValue['routes'][0]['legs'][0]['steps'][i]['end_location']['lat']!=endLocation['lat'])
        {
            tableauCoordonnee.push(objectValue['routes'][0]['legs'][0]['steps'][i]['end_location'])
            i++;
        }
        tableauCoordonnee.push(endLocation);
          console.table(tableauCoordonnee)
        return tableauCoordonnee;
    }

}
