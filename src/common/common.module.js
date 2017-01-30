import { MsgService } from './services/messages/msg.service';
import { DatesService } from './services/dates.service';
import { EnterDirective } from './directives/f-enter/enter.dir';

export default angular.module( 'report.common', [])

  .service('msgService', MsgService)
  .service('datesService', DatesService)
  .directive('fEnter', () => new EnterDirective)

;