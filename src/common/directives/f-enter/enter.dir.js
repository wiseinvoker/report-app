export class EnterDirective {
  constructor () {
  }

  link(scope, element, attrs) {
    element.bind("keydown keypress", (event) => {
      var code = event.keyCode || event.which;
      if(code === 13) {
        event.preventDefault();
        scope.$apply(() => scope.$eval(attrs.fEnter));
      }
    });
  }
}
