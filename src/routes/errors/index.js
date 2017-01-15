import notFound from './not-found';
import notAuthorized from './not-authorized';

export default angular.module( 'report.routes.errors', [
  'report.routes.errors.not-found',
  'report.routes.errors.not-authorized'
])

;

