import styles from './styles.scss';

export default angular.module( 'jdm.material', [])

.directive( 'mdGrow', function () {
  return {
    restrict: 'A',
    link: function ( scope, element, attrs ) {
      attrs.$observe( 'mdGrow', function ( grow ) {
        element.css({ flex: grow });
      });
    }
  };
})

.directive( 'mdTable', function () {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: '<md-content class="md-table" ng-transclude></md-content>'
  };
})

.directive( 'mdTableHeader', function ( $mdTheming, $compile, $mdSticky ) {
  return {
    restrict: 'E',
    template: '<md-table-row class="md-table-header"></md-table-row>',
    transclude: true,
    replace: true,
    compile: function ( element, attr, transclude ) {
      return function postLink ( scope, element, attrs ) {
        $mdTheming( element );
        var outerHTML = element[0].outerHTML;

        transclude( scope, function ( clone ) {
          element.append( clone );
        });

        if ( ! element.hasClass( 'md-no-sticky' ) ) {
          transclude( scope, function ( clone ) {
            var stickyClone = $compile( angular.element( outerHTML ) )( scope );
            stickyClone.append( clone );
            $mdSticky( scope, element, stickyClone );
          });
        }
      };
    }
  };
})

;

