describe( 'report default page', function () {
  beforeEach( function () {
    browser.get( '/' );
  });

  it( 'should have a title', function () {
    expect( browser.getTitle() ).toEqual( 'iFeis' );
  });
});

