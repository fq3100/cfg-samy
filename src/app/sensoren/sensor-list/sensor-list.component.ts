import { Component, OnInit } from '@angular/core';
import { Sensor } from '../sensor';
import { SensorService } from '../sensor.service';
import { SensorDetailsComponent } from '../sensor-details/sensor-details.component';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css'],
  providers: [SensorService]
})

export class SensorListComponent implements OnInit {

  sensoren: Sensor[]
  selectedSensor: Sensor

  constructor(private sensorService: SensorService) { }

  ngOnInit() {
     this.sensorService
      .getSensoren()
      .then((sensoren: Sensor[]) => {
        this.sensoren = sensoren.map((sensor) => {
          if (!sensor.messungen) {
            sensor.messungen = {
              datum: '',
              wert: ''
            }
          }
          return sensor;
        });
      });
}

  private getIndexOfSensor = (sensorId: String) => {
    return this.sensoren.findIndex((sensor) => {
      return sensor._id === sensorId;
    });
  }

  selectSensor(sensor: Sensor) {
    this.selectedSensor = sensor
  }

  createNewSensor() {
    var sensor: Sensor = {
      _id:'',
      betrieb: '',
      standort: '',
      kuehlart: '',
      messungen: {
       datum: '',
       wert: ''
      }
    };

    // By default, a newly-created sensor will have the selected state.
    this.selectSensor(sensor);
  }

  deleteSensor = (sensorId: String) => {
    var idx = this.getIndexOfSensor(sensorId);
    if (idx !== -1) {
      this.sensoren.splice(idx, 1);
      this.selectSensor(null);
    }
    return this.sensoren;
  }

  addSensor = (sensor: Sensor) => {
    this.sensoren.push(sensor);
    this.selectSensor(sensor);
    return this.sensoren;
  }

  updateSensor = (sensor: Sensor) => {
    var idx = this.getIndexOfSensor(sensor._id);
    if (idx !== -1) {
      this.sensoren[idx] = sensor;
      this.selectSensor(sensor);
    }
    return this.sensoren;
  }
}