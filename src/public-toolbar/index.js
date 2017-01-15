import styles from './styles.scss';

class PublicToolbarController {
  constructor( $mdSidenav, fSession, $state ) {

    this.$state = $state;
    this.fSession = fSession;
    this._svc = {
      $mdSidenav, fSession
    };

    this.fSession.user().then( (user) => {
      this.user = user;
    });

    var publicStates = ['home', 'organizers', 'dancers', 'results'];
    if ( publicStates.some( $state.includes ) ) {
      this.publicPage = true;
    }
  }

  toggleLeftNav () {
    this._svc.$mdSidenav( 'left' ).toggle();
  }

  logout () {
    this._svc.fSession.logout();
    location.reload();
    this.$state.go( 'home' );
  }
}

export default angular.module( 'report.public-toolbar', [
  'ngMaterial'
])

.directive( 'fPublicToolbar', function () {
  var fPublicToolbar = {
    restrict: 'AE',
    controller: 'PublicToolbarController',
    controllerAs: 'ctrl',
    template: require( './tpl.html' ),
    replace: true,
    scope: {
      title: '@'
    },
    link: function ( scope, element, attrs ) {
    }
  };

  return fPublicToolbar;
})

.controller( 'PublicToolbarController', PublicToolbarController )

;

