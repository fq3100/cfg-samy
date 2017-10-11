import { Injectable } from '@angular/core';
import { Sensor } from './sensor';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SensorService {
    private sensorenUrl = '/api/sensoren';

  constructor(private http: Http) { }

    // get("/api/sensoren")
    getSensoren(): Promise<void | Sensor[]> {
      return this.http.get(this.sensorenUrl)
                 .toPromise()
                 .then(response => response.json() as Sensor[])
                 .catch(this.handleError);
    }

    // post("/api/sensoren")
    createSensor(newSensor: Sensor): Promise<void | Sensor> {
      return this.http.post(this.sensorenUrl, newSensor)
                 .toPromise()
                 .then(response => response.json() as Sensor)
                 .catch(this.handleError);
    }

    // get("/api/sensoren/:id") endpoint not used by Angular app

    // delete("/api/sensoren/:id")
    deleteSensor(delSensorId: String): Promise<void | String> {
      return this.http.delete(this.sensorenUrl + '/' + delSensorId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/sensoren/:id")
    updateSensor(putSensor: Sensor): Promise<void | Sensor> {
      var putUrl = this.sensorenUrl + '/' + putSensor._id;
      return this.http.put(putUrl, putSensor)
                 .toPromise()
                 .then(response => response.json() as Sensor)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }

}