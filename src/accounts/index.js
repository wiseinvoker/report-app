class fAccountService {

  constructor ( $http ) {
    this.prefix = 'auth/';
    this.$http = $http;
  }

  /**
   * Accounts
   */

  one ( id ) {
    return this.$http.get( this.prefix + '/' + id );
  }

  me ( id ) {
    return this.$http.get( this.prefix + '/me' );
  }

  update ( account ) {
    return this.$http.put( this.prefix + 'me', account );
  }
}

export default angular.module( 'report.accounts', [] ).service( 'fAccountService', fAccountService );


