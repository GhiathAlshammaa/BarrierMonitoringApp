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
  readonly googleMapsApiUrl = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=marker&callback=initMap`;
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
      center: { lat: 48.2082, lng: 16.3738 },
      zoom: 10,
      zoomControl: true,
      streetViewControl: true,
      mapTypeControl: true,
      rotateControl: true,
      fullscreenControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ['roadmap', 'satellite'],
      },
    };

    this.map = new google.maps.Map(mapContainer, mapOptions);
    this.setMarkers();
  }

  setMarkers(): void {
    if (this.map && this.barriers.length > 0) {
      this.barriers.forEach(barrier => {
        new google.maps.Marker({
          position: { lat: barrier.latitude, lng: barrier.longitude },
          map: this.map,
          title: barrier.name
        });
      });
    }
  }
}
