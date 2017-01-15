import styles from './styles.scss';

class LoginController {
  constructor ( $window, $state, fSession, $auth, $mdDialog ) {
    this._ = { $window, $state, fSession, $auth, $mdDialog };

    this.user = {};
  }

  login (  ) {
    this._.$auth.login(this.user)
    .then(resp => {
      localStorage['satellizer_token'] = resp.headers( 'csrftoken' );
      this._.fSession.refresh();
      this._.$state.go('dashboard');
    })
    .catch( err => {
      let loginAlert = this._.$mdDialog.alert()
      .title( 'Unauthorized Access!' )
      .textContent(
        'Username or password is incorrect.'
      )
      .ok( 'Close' );

      return this._.$mdDialog
      .show( loginAlert );
    })
    ;
  }
}

export default angular.module( 'report.routes.login', [
  'ui.router',
  'ngCookies'
])

.config( function ( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    controller: 'LoginController',
    controllerAs: 'login',
    template: require( './tpl.html' )
  });
})

.controller( 'LoginController', LoginController )

;


