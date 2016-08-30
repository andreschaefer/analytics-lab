import {Component} from "@angular/core";
import {LoggedInCallback, UserLoginService} from "../service/cognito.service";
import {Router} from "@angular/router";
import {DynamoDBService} from "../service/aws.service";
import {FlotCmp} from "../shared/flot";

export class Analytics {
  public name: string;
  public cnt: number = 0;
}

export class FlotSeries {
  public label: string;
  public data: any;
}

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: '/app/template/secure/analytics.html',
  directives: [FlotCmp]
})
export class AnalyticsComponent implements LoggedInCallback {

  public logdata: Array<Analytics> = [];
  public perCountry: Array<FlotSeries> = [];
  public perCountryOptions: any = {
    series: {
      pie: {
        show: true,
        label: {
          show: true,
        }
      }
    },
    legend: {
      show: true,
    }
  };
  public perMinute: Array<FlotSeries> = [];
  public perMinuteOptions: any = {
    series: {
      lines: {show: true},
      points: {show: false}
    },
    legend: {
      show: true,
    }
  };

  constructor(public router: Router) {
    UserLoginService.isAuthenticated(this);
    console.log("in AnalyticsComponent");
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
      this.router.navigate(['/home/login']);
    } else {
      var self = this;
      DynamoDBService.getPerCountry(function (analytics: Array<Analytics>) {
        analytics.forEach(function (item: Analytics) {
          self.logdata.push(item);
          var series = new FlotSeries();
          series.label = item.name;
          series.data = [[1, item.cnt]];
          self.perCountry.push(series);
        });
      });

      DynamoDBService.getPerMinute(function (analytics: Array<Analytics>) {
        var series = new FlotSeries();
        series.label = "Hits per minute";
        series.data = [];
        analytics.forEach(function (item: Analytics) {
          series.data.push([Number(item.name), item.cnt])
        });
        self.perMinute.push(series);
      });
    }
  }

}
