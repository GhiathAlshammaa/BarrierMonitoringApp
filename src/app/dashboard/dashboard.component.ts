import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment.prod';

declare const google: any;  // Treat google as a globally defined variable

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  map: any;
  selectedBarrier: any;

  readonly googleMapsApiUrl = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=marker,controls,geometry,places&callback=initMap`;
  barriers: any[] = [];
  localApiUrl = 'http://localhost:5000/api/barriers';
  liveApiUrl = 'https://json-barrier-server.onrender.com/api/barriers';
  useLiveData = false;

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
            scaledSize: new google.maps.Size(32, 32) // Adjust size if needed
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
  getIconUrl(status: string): string {
    let iconUrl = '';
    switch (status) {
      case 'Good':
        iconUrl = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
        break;
      case 'Needs Maintenance':
        iconUrl = 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        break;
      case 'Damaged':
        iconUrl = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
        break;
      default:
        iconUrl = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';  // Default icon
    }
    console.log(`Status: ${status}, Icon URL: ${iconUrl}`); // Log to verify
    return iconUrl;
  }
  
  
  

  // setMarkers(): void {
  //   if (this.map && this.barriers.length > 0) {
  //     this.barriers.forEach(barrier => {
  //       const marker = new google.maps.Marker({
  //         position: { lat: barrier.latitude, lng: barrier.longitude },
  //         map: this.map,
  //         title: barrier.name
  //       });

  //       marker.addListener('click', () => {
  //         this.selectedBarrier = barrier;
  //       });
  //     });
  //   }
  // }
}
