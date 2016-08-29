
http://lab-analytics.s3-website-eu-west-1.amazonaws.com/

Cognito Quickstart
===================================================

# What does this app do?
![QuickStart Angular2 Cognito App](/aws/cognito-quickstart-app-overview.png?raw=true)

# Tech Stack
## Required Tools
* [aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* [npm](https://www.npmjs.com/)
* [bower](https://bower.io/)
* [angular-cli](https://github.com/angular/angular-cli)

## Frameworks
* [AWS JavaScript SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/browser-intro.html)
* [Angular 2](https://angular.io/docs/ts/latest/quickstart.html) [(Ionic)](http://ionicframework.com/docs/v2/getting-started/installation/)
* [TypeScript](https://www.typescriptlang.org/docs/tutorial.html)
* [Bootstrap](http://getbootstrap.com/)

# AWS Setup
To create some of the AWS resources that are required for this app to run, 
run the ```aws/createResources.sh``` file included under the aws directory. 

You will need to create the user pool manually through the console. Afterwards, you'll need to update the identity
pool with the relevant user pool information under Authentication Providers. Also, you'll need to assign the correct
roles to the identity pool. 

# Getting the code
```
# Clone it from github
git clone --depth 1 git@github.com:awslabs/aws-cognito-angular2-quickstart.git
```
```
# Install the NPM and Bower packages
npm install
bower install
```
```
# Run the app in dev mode
npm start
```
```
# Build the project and sync the output with the S3 bucket
ng build; cd dist; aws s3 sync . s3://budilov-cognito/
```
```
# Test it out
curl –I http://budilov-cognito.s3-website-us-east-1.amazonaws.com/
```

# Necessary changes
As is, the code has default configuration, pointing to the developer's region. You 
will need to change the pool id, region, and dynamodb table id. You can find these
configurations in ```aws.service.ts``` and ```cognito.service.ts```
