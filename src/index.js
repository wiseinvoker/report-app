import styles from './styles.scss';
import material from './table';
import routes from './routes';
import session from './session';
import common from './common/common.module';

class MainNavController {
  constructor ( $scope, $window, $mdSidenav, fSession, $state, msgService ) {
    this._ = { $window, $mdSidenav, $state, msgService };
    this.fSession = fSession;
  }

  close () {
    this._.$mdSidenav( 'left' ).close();
  }

  go ( state, params, $event ) {
    if ( $event ) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    this._.$state.go( state, params );
  }

  logout () {
    this.fSession.logout();
    location.reload();
    this._.$state.go( 'home' );
  }
}

export default angular.module( 'report', [
  'ngAria',
  'ngMaterial',
  'ngMessages',
  'ngAnimate',
  'jdm.material',
  'report.routes',
  'report.session',
  'report.common',
  'satellizer'
])

.config( function ( $httpProvider, $mdThemingProvider, $authProvider ) {
  $mdThemingProvider.theme( 'default' )
    .primaryPalette( 'green' )
    .accentPalette( 'light-green' )
    ;

  $mdThemingProvider.theme( 'report-dark' )
  .primaryPalette( 'lime' )
  ;

  $mdThemingProvider.theme( 'secondary' )
    .primaryPalette( 'blue-grey' )
    .accentPalette( 'green' )
    ;

  $mdThemingProvider.theme( 'teal' )
    .primaryPalette( 'teal' )
    .accentPalette( 'teal' )
  ;

  $authProvider.withCredentials = true;
  $authProvider.authHeader = 'Authorization';
  $authProvider.authToken = 'Token';

  $authProvider.loginUrl = 'auth/login';

  // $httpProvider configuration
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
})

.run( function ( $timeout, $state, $rootScope, $mdSidenav, $window, fSession ) {
  $rootScope.$on( '$stateChangeError', function ( event, toState, toParams ) {
    $state.go( 'home' );
  });

  $rootScope.$on( '$stateChangeStart', function (event, toState, fromState) {
    $mdSidenav( 'left' ).close();
  });

  // Hide the page loading mask. This must happen in at least the second digest for the animation to
  // show, so we do it after an inconsequential delay.
  $timeout( () => $rootScope.pageLoaded = true, 10 );
  
  // Keep track of the previous state
  // to be able to navigate back in state history
  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    $rootScope.previousState = from.name;
  });
})

.controller( 'MainNavController', MainNavController )
;

