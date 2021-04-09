import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Convertisseur';
  taux: number = 1.1;
  valueToConvert: number = 1;
  usdResult!: string;
  base: string = '€';
  

  baseValues: {name: string, value: string}[] = [
    {
      name: "€",
      value: "€"
    },
    {
      name: "$",
      value: "$"
    }
  ];

  ngOnInit() {
    setInterval(() => {
      var change = Math.random() * (0.05 +  0.05) - 0.05;
      this.taux = this.roundToTwoDigits(this.taux + change);
      this.convert(this.base)
    }, 3000)
  }


  convert(base: string | undefined) {
    if(this.valueToConvert !== undefined) {
      switch(base) {
        case "€":
        default:
          this.usdResult = this.roundToTwoDigits(this.valueToConvert * this.taux) + '$';      
          break;
        case "$":
          this.usdResult = this.roundToTwoDigits(this.valueToConvert / this.taux) + '€';
          break; 
      }
    }
  }

  /**
   * @param value : number
   */
  roundToTwoDigits(value: number) { return Math.round((value + Number.EPSILON) * 100) / 100; }

  /**
   * @param base 
   */
  onBaseChange(base: { name: string, value: string; }) {
    let baseFinded = this.baseValues.find((b) => {
      return b.value === base.value
    })
    this.convert(baseFinded?.value)
  }
}
/* 
lookin a way to convert this javascript files to typescript files.
*/
