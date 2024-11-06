import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment.prod';
import { BarrierStatus } from '../barrier-details/barrier-status';

declare const google: any;  

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  map: any;
  selectedBarrier: { 
    name: string; 
    status: BarrierStatus; 
    latitude: number; 
    longitude: number; 
    lastInspectionDate: Date; 
    nextInspectionDate: Date; 
    notes: string;
  } | null = null;
  

  readonly googleMapsApiUrl = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=marker,controls,geometry,places&callback=initMap`;
  barriers: any[] = [];
  localApiUrl = 'http://localhost:5000/api/barriers';
  liveApiUrl = 'https://json-barrier-server.onrender.com/api/barriers';
  useLiveData = true;

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadGoogleMaps();
    this.fetchBarriers();
  }

  fetchBarriers(): void {
    const apiUrl = this.useLiveData ? this.liveApiUrl : this.localApiUrl;
    this.http.get<any[]>(apiUrl).subscribe(data => {
      this.barriers = data;
      console.log("Fetched barriers:", this.barriers); // Log fetched data
      this.setMarkers();
    });
  }
  

  loadGoogleMaps(): void {
    if (!(window as any).google) {
      console.log('Loading Google Maps API...');
      const script = this.renderer.createElement('script');
      script.src = this.googleMapsApiUrl;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps API loaded.');
        this.initializeMap();
      };
      script.onerror = () => console.error('Failed to load Google Maps API.');
      this.renderer.appendChild(document.body, script);
    } else {
      console.log('Google Maps API already loaded.');
      console.log('Google Maps API Version:', google.maps.version);
      this.initializeMap();
    }
  }

  initializeMap(): void {
    const mapContainer = document.getElementById('map') as HTMLElement;
    const mapOptions = {
      center: { lat: 47.5162, lng: 14.5501 },
      zoom: 7,
      zoomControl: true,
      streetViewControl: true,
      mapTypeControl: true,
      fullscreenControl: true,
      controlSize: 32,
    };
  
    this.map = new google.maps.Map(mapContainer, mapOptions);
    console.log("Map initialized:", this.map);
    this.setMarkers();
  }
  
  
  setMarkers(): void {
    if (this.map && this.barriers.length > 0) {
      this.barriers.forEach(barrier => {
        const iconUrl = this.getIconUrl(barrier.status);
        const marker = new google.maps.Marker({
          position: { lat: barrier.latitude, lng: barrier.longitude },
          map: this.map,
          icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(32, 32) 
          },
          title: barrier.name
        });
  
        // Optional: Add click listener to log selected barrier
        marker.addListener('click', () => {
          this.selectedBarrier = barrier;
          console.log("Selected Barrier:", this.selectedBarrier);
        });
      });
      console.log("Markers added with icons based on status.");
    } else {
      console.log("No barriers found or map not initialized.");
    }
  }
  
  // Helper method to get icon URL based on barrier status
  getIconUrl(status: BarrierStatus): string {
    switch (status) {
      case BarrierStatus.Good:
        return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%2300C853" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.6-7.6 1.4 1.4z"/></svg>';
      case BarrierStatus.NeedsMaintenance:
        return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23FFC107" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';
      case BarrierStatus.Damaged:
        return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23D50000" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M18.3 5.71l-1.41-1.41L12 9.59 7.11 4.71 5.7 6.12 10.59 11 5.7 15.88l1.41 1.41L12 12.41l4.88 4.88 1.41-1.41L13.41 11l4.89-4.88z"/></svg>';
      default:
        return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'; // Default Google Maps blue icon
    }
  }
}
