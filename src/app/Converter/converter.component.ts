import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forwardRefWithAs } from '@headlessui/react/dist/utils/render';
import { HttpService } from '../Api/HttpService';

@Component({
  selector: 'converter-comp',
  templateUrl: './converter.component.html'
})

export class ConverterComponent {
  title = 'ConverterComponent';
  mainAmount:string = "amount-1";

  "amount1"= new FormControl(0)
  "amount2"= new FormControl(0)

  "currency1"= new FormControl('')
  "currency2"= new FormControl('')
  
"amountFrom"= new FormControl(1)
"amountTo"= new FormControl(2)
"currencyFrom"= new FormControl('')
"currencyTo"= new FormControl('')
  
  constructor(private httpService: HttpService){}

  convert (amount: number, from: string, to: string) :void
  {
    try{
     this.httpService.getRates(amount, from).subscribe((result)=> 
     {
      const resultjs= JSON.parse(result)
      const rates = resultjs["rates"];
      result=rates[to];
      const nresult = Number(result)
      if (this.mainAmount == "amount-1")
      {
        this['amount2'].setValue(nresult);
        
    console.log('converted')
      }
      else if (this.mainAmount == "amount-2"){
        this['amount1'].setValue(nresult);
       
    console.log('converted')
      }

      this.amountTo.setValue(nresult);
      this.amountFrom.setValue(amount);
      this.currencyFrom.setValue(from);
      this.currencyTo.setValue(to);
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