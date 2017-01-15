import styles from './styles.scss';
import session from '../../../session';

export default angular.module( 'report.routes.errors.not-authorized', [
  'ui.router',
  'report.session',
  'ngCookies'
])

.config( function ( $stateProvider ) {
  $stateProvider.state( 'not-authorized', {
    url: '/not-authorized',
    controller: 'NotAuthorizedController',
    template: require( './tpl.html' )
  });

  $stateProvider.state( 'check-auth', {
    resolve: {
      user: function ( fSession, $location, $state, $cookieStore ) {
        return fSession.user()
        .then( function () {
          $state.go( 'not-authorized', {}, { location: false } );
        }, function () {
          $cookieStore.put( 'IFEIS_REDIRECT_URL', $location.path() );
          $state.go( 'login' );
        });
      }
    }
  });
})

.controller( 'NotAuthorizedController', function ( $scope ) {
})

;

