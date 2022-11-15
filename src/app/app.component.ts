import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-converter';
  mainAmount:string = "amount-1";
  USDrate:number=0;
  EURrate:number=0;

  async  ngOnInit():Promise<void>{
    const responce = await fetch('https://api.exchangerate.host/latest?places=3&base=UAH')
    const data = await responce.json();
    var result = data["rates"];
    this.USDrate = result["USD"];
    this.EURrate = result["EUR"];
  }

  Convert (amount: number, from: string, to: string) :void
  {
    
    try{
      fetch('https://api.exchangerate.host/latest?places=3&base=' + from + '&amount=' + amount)
        .then((res) => res.json())
        .then( res=> res["rates"])
        .then((res)=>res[to])
        .then((Converted) => {
          if (this.mainAmount == "amount-1")
          {
            (document.getElementById("amount-2") as HTMLInputElement).value = Converted;
          }
          else if (this.mainAmount == "amount-2"){
           (document.getElementById("amount-1") as HTMLInputElement).value = Converted;
          }
          (document.getElementById("i_to") as HTMLInputElement).innerText = Converted;
          (document.getElementById("i_from") as HTMLInputElement).innerText = amount.toString();
          (document.getElementById("c_from") as HTMLInputElement).innerText = from;
           (document.getElementById("c_to") as HTMLInputElement).innerText = to;
        })
    }
    catch{
      console.log("failed")
    }
  }

  ChangedCurrency() :void{
    var amount = Number((document.getElementById(this.mainAmount) as HTMLInputElement).value);
    if (amount <0 )
    {
      amount = amount * (-1)
    }
    if(this.mainAmount == "amount-1")
    {
      var from = (document.getElementById("from") as HTMLInputElement).value;
      var to = (document.getElementById("to") as HTMLInputElement).value;
      console.log(1)
      this.Convert(amount, from, to)
    }
    
    else if(this.mainAmount == "amount-2")
    {
      var from = (document.getElementById("to") as HTMLInputElement).value;
      console.log("from = " + from)
      var to = (document.getElementById("from") as HTMLInputElement).value;
      console.log("to = " + to)
      this.Convert(amount, from, to)
    }
  }
  OnInput(tag: string){
    this.mainAmount = tag;
    this.ChangedCurrency();
  }
}