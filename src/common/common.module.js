import { MsgService } from './services/messages/msg.service';
import { DatesService } from './services/dates.service';

export default angular.module( 'report.common', [])

  .service('msgService', MsgService)
  .service('datesService', DatesService)

;