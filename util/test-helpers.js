function expectGetAndPromise ( obj, fn, args, url ) {
  beforeEach( function () {
    this.$httpBackend.whenGET( new RegExp( url ) ).respond( {} );
  });

  it( 'should return a promise', function () {
    expect( obj()[fn].apply( obj(), args ) ).to.have.property( 'then' ).and.be.a.function;
  });

  it( 'should GET the appropriate endpoint', function () {
    obj()[fn].apply( obj(), args );
    this.$httpBackend.expectGET( url );
  });
}

function _expectPayloadAndPromise ( obj, fn, args, url, payload, method ) {
  beforeEach( function () {
    this.$httpBackend.when( method, new RegExp( url ) ).respond( {} );
  });

  it( 'should return a promise', function () {
    expect( obj()[fn].apply( obj(), args ) ).to.have.property( 'then' ).and.be.a.function;
  });

  it( 'should ' + method + ' to the appropriate endpoint', function () {
    obj()[fn].apply( obj(), args );
    this.$httpBackend.expect( method, url, payload );
  });
}

function expectPostAndPromise ( ...args ) {
  _expectPayloadAndPromise( ...args, 'POST' );
}

function expectPutAndPromise ( ...args ) {
  _expectPayloadAndPromise( ...args, 'PUT' );
}


