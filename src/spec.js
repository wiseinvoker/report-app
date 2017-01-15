describe( 'report', function () {
  beforeEach( module( 'report' ) );

  describe( 'LeftNavCtrl', function () {
    beforeEach( inject( function ( $q, $controller, $rootScope ) {
      this.$mdSidenavClose = sinon.spy();
      this.$mdSidenav = sinon.stub().returns( { close: this.$mdSidenavClose } );
      this.fSession = {};
      this.feisDeferred = $q.defer();
      this.fFeisService = { mine: sinon.stub().returns( this.feisDeferred.promise ) };
      this.$scope = $rootScope.$new();

      this.LeftNavCtrl = $controller( 'LeftNavCtrl', {
        $scope: this.$scope,
        $mdSidenav: this.$mdSidenav,
        fFeisService: this.fFeisService,
        fSession: this.fSession
      });
    }));

    it( 'should put the session on the scope', function () {
      expect( this.$scope.fSession ).to.equal( this.fSession );
    });

    it( 'should fetch the user\'s feiseanna', function () {
      expect( this.fFeisService.mine ).to.be.called;
    });

    it( 'should save the feiseanna to the scope', function () {
      var feiseanna = [];
      this.feisDeferred.resolve( feiseanna );
      this.$scope.$apply();
      expect( this.$scope.feiseanna ).to.equal( feiseanna );
    });

    describe( '.close()', function () {
      it( 'should be a function', function () {
        expect( this.$scope.close ).to.be.a( 'function' );
      });

      it( 'should close the left sidenav', function () {
        this.$scope.close();
        expect( this.$mdSidenav ).to.be.calledWith( 'left' );
        expect( this.$mdSidenavClose ).to.be.called;
      });
    });
  });
});

