import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from '../Api/HttpService';
@Component({
  selector: 'header-comp',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  title = 'HeaderComponent';
  USDrate:number=0;
  EURrate:number=0;
  
  constructor(private httpService: HttpService){}

  async ngOnInit():Promise<void>{
    this.httpService.getRates(1, 'UAH').subscribe((result)=> 
    {
     const resultjs= JSON.parse(result)
     const resultInit = resultjs["rates"];
     this.USDrate = resultInit["USD"];
     this.EURrate = resultInit["EUR"];
   }
     );

   
  }
}