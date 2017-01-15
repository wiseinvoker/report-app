import styles from './styles.scss';

export default angular.module( 'report.footer', [
  'ngMaterial'
])

.directive( 'fFooter', function () {
  var fFooter = {
    restrict: 'AE',
    controller: 'FooterController',
    template: require( './tpl.html' ),
    replace: true,
    scope: {
      title: '@'
    },
    link: function ( scope, element, attrs ) {
    }
  };

  return fFooter;
})

.controller( 'FooterController', function ( $scope, $mdSidenav, fSession ) {
  $scope.fSession = fSession;
})

;

