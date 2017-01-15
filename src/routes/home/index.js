import styles from './styles.scss';
import footer from '../../footer';
import toolbar from '../../public-toolbar';

class HomeController {
  constructor( $document ) {

    this._svc = {
      $document
    };

    $document.scrollTop(0, 1000);
  }
}

export default angular.module( 'report.routes.home', [
  'ui.router',
  'report.public-toolbar',
  'report.footer',
  'duScroll'
])

.config( function ( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/',
    controller: 'HomeController',
    controllerAs: 'ctrl',
    template: require( './tpl.html' )
  });
})

.controller( 'HomeController', HomeController )

;
