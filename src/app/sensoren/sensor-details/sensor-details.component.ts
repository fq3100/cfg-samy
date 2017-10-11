import { Component, Input } from '@angular/core';
import { Sensor } from '../sensor';
import { SensorService } from '../sensor.service';

@Component({
  selector: 'sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.css']
})

export class SensorDetailsComponent {
  @Input()
  sensor: Sensor;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private sensorService: SensorService) {}

  createSensor(sensor: Sensor) {
    this.sensorService.createSensor(sensor).then((newSensor: Sensor) => {
      this.createHandler(newSensor);
    });
  }

  updateSensor(sensor: Sensor): void {
    this.sensorService.updateSensor(sensor).then((updatedSensor: Sensor) => {
      this.updateHandler(updatedSensor);
    });
  }

  deleteSensor(sensorId: String): void {
    this.sensorService.deleteSensor(sensorId).then((deletedSensorId: String) => {
      this.deleteHandler(deletedSensorId);
    });
  }
}