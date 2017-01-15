export default angular.module( 'report.session', [
])

.factory( 'fSession', function ( $http, $q ) {
  var isAuthenticated;
  var user;

  let promise;

  const getUser = () => promise = $http.get( 'auth/me' )
    .then( function ( u ) {
      isAuthenticated = true;
      user = u;
      return user;
    }, function () {
      isAuthenticated = false;
      return true;
    });

  getUser();

  return {
    isLoggedIn: function () {
      return isAuthenticated;
    },
    logout: function () {
      return $http.post( 'auth/logout' );
    },
    isGod: function () {
      return user && user.is_superuser === 1;
    },
    refresh () {
      return getUser();
    },
    user: function () {
      var defer = $q.defer();
      promise = promise.then( function ( u ) {
        if ( user ) {
          defer.resolve( user.data );
        } else {
          defer.reject();
        }

        return u;
      });

      return defer.promise;
    }
  };
})

;

