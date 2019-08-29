import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public userName: String;
	public userEmail: String;
	

  	constructor(
		private _router: Router,
		private _storageService: LocalStorageService
		) { }

  ngOnInit() {
  }

  public login() {
	
	this._router.navigate(['/booking']);
	this._storageService.set('userName', this.userName);

  }

}
