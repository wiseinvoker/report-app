import styles from './styles.scss';

export default angular.module( 'report.routes.errors.not-found', [
  'ui.router'
])

.config( function ( $stateProvider ) {
  $stateProvider.state( 'not-found', {
    url: '/not-found',
    controller: 'NotFoundController',
    template: require( './tpl.html' )
  });
})

.controller( 'NotFoundController', function ( $scope ) {
  console.log("Running not-found");
})

;

