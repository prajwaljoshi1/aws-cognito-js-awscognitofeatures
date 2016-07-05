
$('document').ready(function(e){

 setupCognito();

 listenFormSubmitEvent();

})


var setupCognito = function(){
  AWS.config.region = 'us-east-1'; // Region
   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
       IdentityPoolId: 'us-east-1:c1393255-7158-4e27-b5fc-adab135968ec' // your identity pool id here
   });

   AWSCognito.config.region = 'us-east-1';
   AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
       IdentityPoolId: 'us-east-1:c1393255-7158-4e27-b5fc-adab135968ec' // your identity pool id here
   });
}





var listenFormSubmitEvent  = function(){

  $('#form-login').on('submit', function (e) {
    e.preventDefault();
    var username = $('#input-email').val();
    var password = $('#input-password').val();
    if(!username || !password) {
      showError("Username or Password empty");
    }else{
        login(username, password);
    }

 });
}


var showError = function(message){
  $( "#error-message" ).text(message)
  $('#login-error').show().removeClass("out").addClass("in");
  setTimeout(function(){
    $("#login-error").removeClass('in').addClass("out");
  },1200)


    $('#error-close').on('click', function(e) {
      $(this).parent().hide();
    });
}


var login = function(username, password){

  $("#signing-in-dialog").modal('show');

  var authenticationData = {
       Username : username,
       Password : password,
   };

  var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  var poolData = { UserPoolId : 'us-east-1_7faCQqmMc',
      ClientId : '3t839l0grg7js56oeill69fvbg'
  };
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  var userData = {
      Username : 'username',
      Pool : userPool
  };


  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);


  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        $("#signing-in-dialog").modal("hide");
        console.log("GREEN");

         cognitoUser.getUserAttributes(function(err, result) {
                 if (err) {
                     alert(err);
                     return;
                 }
                 console.log("GREENER");
                  for (i = 0; i < result.length; i++) {
                      if(result[i].getName() === 'custom:kabanalink'){
                        window.location = result[i].getValue();
                      }
                  }
             });
      },

      onFailure: function(err) {
        $("#signing-in-dialog").modal("hide");
        showError(err.message);

      },

  });

}







//         var attributeList = [];
//         var attribute = {
//           Name : 'custom:kabanalink',
//           Value : 'https://www.google.com/'
//         };
//         var attribute = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute);
//         attributeList.push(attribute);
//
//         cognitoUser.updateAttributes(attributeList, function(err, result) {
//           if (err) {
//             alert(err);
//         return;
//       }
//     console.log('call result: ' + result);
// });
