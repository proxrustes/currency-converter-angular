import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../Api/HttpService';
@Component({
  selector: 'header-comp',
  templateUrl: './header.component.html'
})

export class HeaderComponent {

  "USDrate"= new FormControl(0)
  "EURrate"= new FormControl(0)


  title = 'HeaderComponent';
  
  constructor(private httpService: HttpService){}

  async ngOnInit():Promise<void>{
    this.httpService.getRates(1, 'UAH').subscribe((result)=> 
    {
     const resultjs= JSON.parse(result)
     const resultInit = resultjs["rates"];
     this.EURrate.setValue(resultInit["EUR"]);
     this.USDrate.setValue(resultInit["USD"]);
   }
     );

   
  }
}