import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../../Models/flight';

@Component({
  selector: 'app-get-allflights',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './get-allflights.component.html',
  styleUrl: './get-allflights.component.css'
})
export class GetALLFLightsComponent {
  flights: any[] = []
  userRole:string=""
  Airline:string=""
  isEligible: boolean = false
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient, private router: Router) {
    this.getAllFlights();
  }
  ngOnInit() {
    this.getAllFlights();
  this.userRole = localStorage.getItem("userRole") ?? "User"
  this.isEligible = this.userRole == "Admin" ?? false
  }
  getAllFlights() {
    this.http.get<Flight[]>('http://localhost:5187/api/Flight/GetAllFlights', {
      headers: this.httpOptions.headers,
    }).subscribe((response) => {
      if (response != null && response.length > 0) {
        this.flights = response;
        console.log(this.flights);
      }
    })
}
searchFlightByName() {
  this.http.get<Flight[]>(`http://localhost:5187/api/Flight/GetFlightByName?search=${this.Airline}`)
    .subscribe(
      (response) => {
        if (response.length > 0) {
          this.flights = response;
        } else {
          alert('No flights found for the given title.');
        }
      },
      (error) => {
        console.error('Error fetching flights:', error);
        alert('No results');
      }
    );
  }
  delete(Flight: Flight) {
    const flightnumber = Flight.flightNumber;
    this.http
      .delete('http://localhost:5187/api/Flight/DeleteFlight/'+flightnumber, this.httpOptions)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['get-all-Flight'], { skipLocationChange: true });
        this.getAllFlights();
         
      });
    
  }
  EditFlight(flightNumber: any) {
    console.log(flightNumber)
    this.router.navigateByUrl(`/admin-dashboard/edit-flight/${flightNumber}`);
  }
  
  
}
