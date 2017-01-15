import styles from './styles.scss';

export default angular.module( 'report.public-header', [])

.directive( 'fPublicHeader', function () {
  return {
    restrict: 'E',
    template: '<div class="sub-toolbar" layout="column" ng-transclude></div>',
    transclude: true,
    replace: true
  };
})

;
