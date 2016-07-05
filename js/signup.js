AWS.config.region = 'us-east-1'; // Region
 AWS.config.credentials = new AWS.CognitoIdentityCredentials({
     IdentityPoolId: 'us-east-1:c1393255-7158-4e27-b5fc-adab135968ec' // your identity pool id here
 });

 AWSCognito.config.region = 'us-east-1';
 AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
     IdentityPoolId: 'us-east-1:c1393255-7158-4e27-b5fc-adab135968ec' // your identity pool id here
 });

 var poolData = { UserPoolId : 'us-east-1_TcoKGbf7n',
     ClientId : '3t839l0grg7js56oeill69fvbg'
 };
 var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

 var attributeList = [];

 var dataEmail = {
     Name : 'praj',
     Value : 'praj@mydomain.com'
 };
 var dataPhoneNumber = {
     Name : 'phone_number',
     Value : '+61424979112'
 };
 var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
 var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

 attributeList.push(attributeEmail);
 attributeList.push(attributePhoneNumber);

 userPool.signUp('username', 'JamesBond_007', attributeList, null, function(err, result){
     if (err) {
         console.log(err);
         return;
     }
     cognitoUser = result.user;


     console.log('user name is ' + cognitoUser.getUsername());
 });
