import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../Api/HttpService';
import { Currency } from '../Models/currency';

@Component({
  selector: 'converter-comp',
  templateUrl: './converter.component.html'
})

export class ConverterComponent {
  title = 'ConverterComponent';
  mainAmount:string = "amount1";
  default: string = 'EUR';



currencies = [
  new Currency("EUR", "Euro"),
  new Currency("UAH", "Hryvna"),
  new Currency("VES", "Venezuelan Bolivar"),
  new Currency("USD", "US Dollar")
]

  "amount1"= new FormControl(0, { nonNullable: true })
  "amount2"= new FormControl(0, { nonNullable: true })

    "currency1"= new FormControl('EUR', { nonNullable: true })
    "currency2"= new FormControl('EUR', { nonNullable: true })

    
      
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

      if (this.mainAmount == "amount1")
      {
        this.amount2.setValue(nresult);
      }
      else if (this.mainAmount == "amount2"){
        this['amount1'].setValue(nresult);
       
    console.log('converted 2 '+ this.currency2.value)
      }

    
    }
      );
     }
    
    catch{
      console.log("failed")
    }
  }

  changedCurrency() :void{
    console.log("changed currency")

    switch(this.mainAmount){
      
      case "amount1": {
        let from = this.currency1.value;
        let to = this.currency2.value;

        let amount= this.amount1.value;
        if (amount <0 )
        {
          amount = amount * (-1)
        }

        this.convert(amount, from, to)
        break; 
      }
      case "amount2":{
        let from = this.currency2.value;
        let to = this.currency1.value;

        let amount= this.amount2.value;
        if (amount <0 )
        {
          amount = amount * (-1)
        }
    
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