import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  barriers: any[] = [];

  // Define URLs
  localApiUrl = 'http://localhost:5001/api/barriers'; // Local URL
  liveApiUrl = 'https://json-barrier-server.onrender.com/api/barriers'; // Live URL (Render)

  // Toggle to use live or local data
  useLiveData = false; // Set to true to use live data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchBarriers();
  }

  fetchBarriers(): void {
    // Choose the URL based on useLiveData value
    const apiUrl = this.useLiveData ? this.liveApiUrl : this.localApiUrl;
    
    this.http.get<any[]>(apiUrl).subscribe(data => {
      this.barriers = data;
      console.log('Data fetched from:', apiUrl); // Confirm the data source
    });
  }
}
