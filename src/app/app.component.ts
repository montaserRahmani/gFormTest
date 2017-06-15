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
  inputs : any;
  constructor(private http : Http){
  }

  ngOnInit() {
  	//initilize the inputs array for later use
  	this.inputs = Array.from(document.getElementsByTagName('input'));
  	//check stored answers
  	this.checkStoredAnswers();
  	//check for user entries every 10 sec
  	setInterval(() => {
  		this.checkAnswers();
  	}, 10000)
  }

  checkEvent(event){
  	console.log(event);
  }
  handleRadio(event){
  	console.log(event);
  	let radio = event.srcElement;
  	let radioArray = radio.parentElement.parentElement.parentElement.parentElement.parentElement.children; 
  	let inputElem = radio.parentElement.parentElement.parentElement.parentElement
  	.parentElement.parentElement.parentElement.parentElement.children[1];
  	let dataValue = radio.parentElement.parentElement.getAttribute('data-value');
  	if(inputElem){
	  	if(inputElem.value !== ''){
	  		for (var i = 1; i < radioArray.length; ++i) {
		  		let flag = false;
		  		if(parseInt(dataValue) === i){
		  			flag = true;
		  		}
		  		radioArray[i].children[1].children[0].setAttribute('aria-checked', flag.toString());
	  		}
	  	} else {
	  		radio.parentElement.parentElement.setAttribute('aria-checked', 'true');
	  	}	
  		inputElem.value = dataValue;
  	}
  }

  checkStoredAnswers(){
  	let headers = new Headers({'Content-Type': 'application/json'});
  	this.http.get("/api/answers", headers)
  	.toPromise()
  	.then((res)=>{
  		let data = res.json();
  		if(data && data.answers){
  			this.answers = JSON.parse(data.answers);
  			this.fillAnswers();
  		}
  	});
  }

  checkAnswers(){
  	this.answers = {};
  	var inputs = this.inputs;
  	if(inputs[0].value !== ''){
  		for(var i in inputs){
  			if(inputs[i].value !== '')
  			this.answers[inputs[i].name] = inputs[i].value;
  		}
  	}
  	this.storeAnswers();
  }

  storeAnswers(){
  	let headers = new Headers({'Content-Type': 'application/json'});
  	this.http.post("/api/answers", {answers : JSON.stringify(this.answers) }, headers)
  	.toPromise()
  	.then((data)=>{
  		console.log(data);
  	});
  }

  fillAnswers(){
  	//fill all answers for testing, it will be for the stored ones
  	var inputs = this.inputs;
  		for(var i in inputs){
			if(this.answers[inputs[i].name]){
				if(inputs[i].type === 'hidden' && inputs[i].name.includes("entry.")){
					inputs[i].parentElement.children[0].children[0].children[0]
					.children[this.answers[inputs[i].name]]
					.children[1].children[0].setAttribute('aria-checked', 'true');
				}
  				inputs[i].value = this.answers[inputs[i].name];
  			}
  		}
  }

  validateForm(){
  	var inputs = this.inputs;
  	var errCount = 0;
 	  	for(var i in inputs){
			if(inputs[i].value === ''){
				if(inputs[i].type === 'hidden'){
					inputs[i].parentElement.parentElement.className
					 = inputs[i].parentElement.parentElement.className + " HasError";
				} else if(inputs[i].type === 'text'){
					console.log(inputs[i].parentElement.parentElement.parentElement.parentElement
					.parentElement.parentElement.className);
					inputs[i].parentElement.parentElement.parentElement.parentElement
					.parentElement.parentElement.className = inputs[i].parentElement
					.parentElement.parentElement.parentElement
					.parentElement.parentElement.className + " HasError";
				}
				errCount += 1;
  				// inputs[i].value = this.answers[inputs[i].name];
  			}
  		}
  	if(errCount < 1){
  		this.sendResponse();
  	} else {
  		alert("يوجد اسئلة لم يتم الاجابة عليها \n You didn't answer all required questions");
  		window.scrollTo(0,0);
  	}
  }


  // fillDumbAnswers(){
  // 	//fill all answers for testing it will be for the stored ones
  // 	var inputs = this.inputs;
  // 		for(var i in inputs){
  // 			if(inputs[i].name.includes('entry.')){
  // 				this.answers[inputs[i].name] = '3';
  // 				// inputs[i].value = '1';		
  // 			} else if(inputs[i].name){
  // 				this.answers[inputs[i].name] = inputs[i].value;
  // 			}
  // 		}
  // }


  sendResponse(){
  	console.log(JSON.stringify(this.answers));
  	let headers = new Headers({'Content-Type': 'application/json'});
  	this.http.post("/api/sendRes", { answers : this.answers}, headers)
  	.toPromise()
  	.then((res)=>{
  		let data = res.json();
  		console.log(data);
  		if(data.added){
  			alert("تم ارسال الاجابات \n Your answers have been submitted");
  		} else {
  			alert("لم يتم الارسال يرجى المحالة مرة اخرى \n Sending answer failed please try again");
  		}
  	})
  }


}
