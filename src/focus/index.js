export default angular.module( 'report.focus', [
])

.directive( 'fFocus', function ( $timeout ) {
  return {
    link: function ( scope, element, attrs ) {
      scope.$watch( attrs.fFocus, function ( val ) {
        $timeout( () => val && element.focus() );
      });
    }
  };
})

;

