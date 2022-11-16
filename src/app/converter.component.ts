import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from './HttpService';

@Component({
  selector: 'converter-comp',
  templateUrl: './converter.component.html',
  styleUrls: ['./app.component.css']
})

export class ConverterComponent {
  title = 'ConverterComponent';
  mainAmount:string = "amount-1";


  constructor(private httpService: HttpService){}

  convert (amount: number, from: string, to: string) :void
  {
    try{
     this.httpService.getRates(amount, from).subscribe((result)=> 
     {
      const resultjs= JSON.parse(result)
      const rates = resultjs["rates"];
      result=rates[to];
      
      if (this.mainAmount == "amount-1")
      {
        (document.getElementById("amount-2") as HTMLInputElement).value = result;
        
    console.log('converted')
      }
      else if (this.mainAmount == "amount-2"){
       (document.getElementById("amount-1") as HTMLInputElement).value = result;
       
    console.log('converted')
      }

      (document.getElementById("i_to") as HTMLInputElement).innerText = result;
      (document.getElementById("i_from") as HTMLInputElement).innerText = amount.toString();
      (document.getElementById("c_from") as HTMLInputElement).innerText = from;
      (document.getElementById("c_to") as HTMLInputElement).innerText = to;
    }
      );
     }
    
    catch{
      console.log("failed")
    }
  }

  changedCurrency() :void{
    console.log("changed currency")
    let amount = Number((document.getElementById(this.mainAmount) as HTMLInputElement).value);

    if (amount <0 )
    {
      amount = amount * (-1)
    }

    switch(this.mainAmount){
      case "amount-1": {
        let from = (document.getElementById("from") as HTMLInputElement).value;
        let to = (document.getElementById("to") as HTMLInputElement).value;
        this.convert(amount, from, to)
        break; 
      }
      case "amount-2":{
        let from = (document.getElementById("to") as HTMLInputElement).value;
        let to = (document.getElementById("from") as HTMLInputElement).value;
        this.convert(amount, from, to)
        break; 
      }
    }
  }
  onInput(tag: string){
    console.log('input')
    this.mainAmount = tag;
    this.changedCurrency();
  }
}