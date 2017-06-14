import { Component } from '@angular/core';
import { Http , Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  answers : any = {};
  constructor(private http : Http){
  }

  ngOnInit() {
  	//timeout for test only
  	setTimeout(() => {
  		this.checkAnswers();
  	}, 5000)
  	// setTimeout(() => {
  	// 	this.fillAnswers();
  	// }, 10000)
  	this.fillAnswers();
  }

  handleRadio(event){
  	// console.log(event);
  	let radio = event.srcElement;
  	let radioArray = radio.parentElement.parentElement.parentElement.parentElement.parentElement.children; 
  	let inputElem = radio.parentElement.parentElement.parentElement.parentElement
  	.parentElement.parentElement.parentElement.parentElement.children[1];
  	let dataValue = radio.parentElement.parentElement.getAttribute('data-value');
  	if(inputElem.value !== ''){
  		for (var i = 1; i < radioArray.length; ++i) {
	  		let flag = false;
	  		if(parseInt(dataValue) === i){
	  			flag = true;
	  		}
	  		console.log(flag);
	  		radioArray[i].children[1].children[0].setAttribute('aria-checked', flag.toString());
  		}
  	} else {
  		radio.parentElement.parentElement.setAttribute('aria-checked', 'true');
  	}
  	inputElem.value = dataValue;
  }

  inputChange(event){
  	var input = event.srcElement;
  	var radioArray = input.parentElement.children[0].children[0].children[0];
    console.log("input =====", input);
    console.log("radioArray ====", radioArray);
  	for (var i = 1; i < radioArray.length; ++i) {
  		let flag = false;
  		if(parseInt(input.value) === i){
  			flag = true;
  		}
  		radioArray[i].children[1].children[0].setAttribute('aria-checked', flag.toString());
  	}
  	

  }

  checkAnswers(){
  	var inputs = Array.from(document.getElementsByTagName('input'));
  	// if(inputs[0].value !== ''){
  		for(var i in inputs){
  			if(inputs[i].value !== '' && inputs[i].getAttribute("type") == "text")
  			this.answers[inputs[i].name] = inputs[i].value;
  		}
  	// }
  	let headers = new Headers({'Content-Type': 'application/json'});
  	this.http.post("/api/answers", {answers : JSON.stringify(this.answers) }, headers)
  	.toPromise()
  	.then((data)=>{
  		console.log(data);
  	});
  	console.log(this.answers);
  }

  fillAnswers(){
  	//fill all answers for testing it will be for the stored ones
  	var inputs = Array.from(document.getElementsByTagName('input'));
  		for(var i in inputs){
  			if(inputs[i].type === 'text'){
  				this.answers[inputs[i].name] = '1';
  				// inputs[i].value = '1';		
  			} else {
  				this.answers[inputs[i].name] = inputs[i].value;
  			}
  		}
  }

  sendResponse(){
  	console.log(JSON.stringify(this.answers));
  	let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'});
  	this.http.post("https://docs.google.com/forms/d/e/1FAIpQLSem9S-AbCmHrhkT8NbwCDMVyFQRc_SiUY6a0pOaOJLpzGgL0g/formResponse", this.answers, headers)
  	.toPromise()
  	.then((data)=>{
  		console.log(data);
  	})
  }
}
