import { Component } from '@angular/core';
import { AdvertiserService } from 'src/service/advertiser.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(public advs:AdvertiserService){}
  
}
