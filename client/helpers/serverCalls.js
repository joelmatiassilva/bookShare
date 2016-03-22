
export function asyncSignIn(email, password, callback){
  $.ajax({
    url: '/api/signIn',
    method: 'POST',
    data: {email: email, password: password},
    success: callback,
    error: function(err){
      console.log('ERROR, USER NOT LOGGED IN');
      console.error(err);
    }
  });
}