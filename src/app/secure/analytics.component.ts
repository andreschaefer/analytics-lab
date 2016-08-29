import {Component} from "@angular/core";
import {LoggedInCallback, UserLoginService} from "../service/cognito.service";
import {Router} from "@angular/router";
import {DynamoDBService} from "../service/aws.service";


export class Analytics {
  public ip:string;
  public name:string;
}

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: '/app/template/secure/analytics.html'
})
export class AnalyticsComponent implements LoggedInCallback {

  public logdata:Array<Analytics> = [];

  constructor(public router:Router) {
    UserLoginService.isAuthenticated(this);
    console.log("in AnalyticsComponent");
  }

  isLoggedIn(message:string, isLoggedIn:boolean) {
    if (!isLoggedIn) {
      this.router.navigate(['/home/login']);
    } else {
      console.log("scanning DDB");
      DynamoDBService.getAnalytics(this.logdata);
    }
  }

}
