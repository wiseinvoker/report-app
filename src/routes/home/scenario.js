describe( 'home', function () {
  it( 'should have the right url', function () {
    browser.get( '/' );
    expect( browser.getLocationAbsUrl() ).toEqual( '/' );
  });
});
