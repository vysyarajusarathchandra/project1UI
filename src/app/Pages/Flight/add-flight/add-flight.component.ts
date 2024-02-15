import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight } from '../../../Models/flight';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent {
  Flights:Flight;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http:HttpClient,private router:Router)
  {
  this.Flights=new Flight();
  }AddFlight() {
    console.log(this.Flights);
    const userRole = localStorage.getItem("userRole") ?? "Guest";
    this.http
    .post('http://localhost:5187/api/Flight/AddFlight', this.Flights,this.httpOptions 
      
     
    )
    .subscribe((response) => {
      console.log(response);
    });
  
      if(userRole=="Admin"){
        this.router.navigateByUrl('/admin-dashboard/get-all-Flight');
      }else{
        this.router.navigateByUrl('/user-dashboard/get-all-Flight');
      }

}
}
