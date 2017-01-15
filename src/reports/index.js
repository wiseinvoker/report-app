export default angular.module( 'report.reports', [
])

.factory( 'fReportService', function ( $http ) {
  var prefix = 'api/reports/';

  /**
   * Schools
   */

  function get () {
    console.log("report getting");
    return $http.get( prefix )
    .then( resp => {
      return resp.data;
    });
  }

  function one ( uuid ) {
    return $http.get( prefix + uuid );
  }

  function forUser ( uid, post_date ) {
    return $http.get( prefix + '?reporter=' + uid + '&created=' + post_date );
  }

  function forAdmin ( post_date ) {
    return $http.get( '/api/reports-list/' + '?created=' + post_date );
  }

  function create ( report ) {
    return $http.post( prefix, report );
  }

  function update ( report ) {
    return $http.put( prefix + report.id + '/', report );
  }

  function remove ( uuid ) {
    return $http.delete( prefix + uuid );
  }

  /**
   * Exported API
   */

  return {
    get: get,
    one: one,
    forUser: forUser,
    forAdmin: forAdmin,
    create: create,
    remove: remove,
    update: update
  };
})

;


