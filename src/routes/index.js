import home from './home';
import dashboard from './dashboard';
import errors from './errors';
import login from './login';
import account from './account';

export default angular.module( 'report.routes', [
  'ui.router',
  'report.routes.home',
  'report.routes.dashboard',
  'report.routes.errors',
  'report.routes.login',
  'report.routes.account',
])

.config( function ( $urlRouterProvider, $locationProvider ) {
  $locationProvider.html5Mode( true );
  // $urlRouterProvider.otherwise( '/not-found' );
  $urlRouterProvider.otherwise( 'login' );
})

;
