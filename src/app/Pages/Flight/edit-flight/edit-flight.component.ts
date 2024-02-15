import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Flight } from '../../../Models/flight';

@Component({
  selector: 'app-edit-flight',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-flight.component.html',
  styleUrl: './edit-flight.component.css'
})
export class EditFlightComponent {
  flightNumber?: number = 0;
  flight: Flight;
  errMsg: string = '';
  isFlightExist: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient, private router: Router,private activatedroute:ActivatedRoute) {
    this.flight = new Flight();
    this.activatedroute.params.subscribe(p=>this.flightNumber=p['flightNumber']);
    this.search();
  }
  search() {
    this.http
      .get<Flight>(
        'http://localhost:5187/api/Flight/GetFlightById/'+ this.flightNumber,this.httpOptions
      )
      .subscribe((response) => {
        console.log(response);
        if (response != null) {
          this.flight = response;
          this.isFlightExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid Flight Id';
          this.isFlightExist = false;
        }
      });
  }
  edit() {
    this.flightNumber = this.flight.flightNumber;
    this.http
  .put('http://localhost:5187/api/Flight/UpdateFlight',this.flight,this.httpOptions)
  .subscribe((response) => {
    console.log(response);
    this.router.navigate(['get-all-Flight'], { skipLocationChange: true });
    });
    
  }
}
