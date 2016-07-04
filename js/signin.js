console.log("here1");
AWS.config.region = 'us-east-1'; // Region
 AWS.config.credentials = new AWS.CognitoIdentityCredentials({
     IdentityPoolId: 'us-east-1:c1393255-7158-4e27-b5fc-adab135968ec' // your identity pool id here
 });
console.log("here2");
 AWSCognito.config.region = 'us-east-1';
 AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
     IdentityPoolId: 'us-east-1:c1393255-7158-4e27-b5fc-adab135968ec' // your identity pool id here
 });

console.log("here3");
var authenticationData = {
     Username : 'username',
     Password : 'JamesBond_007',
 };

 console.log("here4");
 var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
 var poolData = { UserPoolId : 'us-east-1_7faCQqmMc',
     ClientId : '3t839l0grg7js56oeill69fvbg'
 };
 var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
 var userData = {
     Username : 'username',
     Pool : userPool
 };

 console.log("here5");
 var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

 console.log("here6");
 cognitoUser.authenticateUser(authenticationDetails, {
     onSuccess: function (result) {
       console.log("GREEN");
       console.log(JSON.stringify(result));
        // console.log('access token + ' + result.getAccessToken().getJwtToken());
        cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    alert(err);
                    return;
                }
                for (i = 0; i < result.length; i++) {
                    console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                }
            });
     },

     onFailure: function(err) {
       console.log("RED");
         console.log(err);
     },

 });
