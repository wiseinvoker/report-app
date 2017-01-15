describe( 'report.accounts', function () {
  var fAccountService;
  var svc = () => fAccountService;

  beforeEach( module( 'report.accounts' ) );

  beforeEach( inject( function ( $injector, _fAccountService_ ) {
    this.$httpBackend = $injector.get( '$httpBackend' );
    fAccountService = _fAccountService_;
    this.endpoint = '/api/accounts';
  }));

  afterEach( function () {
    this.$httpBackend.verifyNoOutstandingRequest();
    this.$httpBackend.verifyNoOutstandingExpectation();
  });

  describe( 'one()', function () {
    expectGetAndPromise( svc, 'one', [ 'abc' ], '/api/accounts/abc' );
  });

  describe( 'me()', function () {
    expectGetAndPromise( svc, 'me', [], '/api/accounts/me' );
  });

  describe( 'dependents()', function () {
    expectGetAndPromise( svc, 'dependents', [ 'abc' ], '/api/accounts/abc/dependents' );
  });

  describe( 'createDependent()', function () {
    var dep = { payload: 'test' };
    expectPostAndPromise( svc, 'createDependent', [ 'abc', dep ], '/api/accounts/abc/dependents', dep );
  });

  describe( 'updateDependent()', function () {
    var dep = { id: 'test' };
    expectPutAndPromise( svc, 'updateDependent', [ 'abc', dep ], '/api/accounts/abc/dependents/' + dep.id, dep );
  });
});

