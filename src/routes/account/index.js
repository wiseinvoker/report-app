import styles from './styles.scss';
import accounts from '../../accounts';

export default angular.module( 'report.routes.account' , [
  'ui.router',
  'report.session',
  'ngMaterial',
  'report.accounts',
])

.config( function ( $stateProvider ) {
  $stateProvider
    .state('account', {
      url: '/account',
      template: require( './tpl.html' ),
      controller: 'AccountController',
      resolve: {
        currentUser: function ( fSession ) {
          return fSession.user();
        },
        isLoggedin: function ( fSession, $q ) {
          if ( fSession.isLoggedIn ) {
            return $q.resolve();
          } else {
            return $q.reject();
          }
        }
      }
    })
})

.run( function ( $state, $rootScope ) {
  $rootScope.$on( '$stateChangeError', function ( event, toState ) {
    if ( toState.name === 'account' ) {
      $state.go( 'check-auth', {}, { location: false } );
    }
  });
})

.controller( 'AccountController', function ( $scope, $state, $q, $timeout,
                                             fAccountService, msgService,
                                             $mdDialog, currentUser ) {
  $scope.$state = $state;
  
  let profileInit;
  _refreshModel(currentUser);

  $scope.saveProfile = function ( profile ) {
    if ( profile.password === profile.confirm_password ) {
      fAccountService.update( profile )
        .then( function (res) {
          msgService.displaySuccessMsg( "Privacy updated successfully" );
        }, err => msgService.displayErrorMsg( "Could not save your profile: " + err ));
    } else {
      let mismatchAlert = $mdDialog.alert()
      .title( 'Password Mismatch!' )
      .textContent(
        'Please make sure passwod and confirm password are equal.'
      )
      .ok( 'OK' );

      return $mdDialog
      .show( mismatchAlert );
    }
  };



  // Update the editing status
  // that toggles Save btn disabled state

  $scope.updateEditing = () => $scope.editingProfile = !angular.equals($scope.profile, profileInit);
  $scope.updateEditingComp = () => $scope.editingProfileComp = !angular.equals($scope.profileComp, profileInit);


  


  // Refresh controller model

  function _refreshModel(user) {
    profileInit = angular.copy(user);
    
    $scope.editingProfile = false;
    $scope.editingProfileComp = false;
    
    $scope.profile = angular.copy(user);
    $scope.profileComp = angular.copy(user);
  }

  
  // Create Account dto before saving
  // to avoid sending temp parameters attached to model

  function _prepareAccountDto(model) {
    return {
      // permanent props
      id: model.id,
      email: model.email,

      // profile props
      first_name: model.first_name,
      last_name: model.last_name,

      // address props
      address: model.address,
      address2: model.address2,
      city: model.city,
      country: model.country,
      province: model.province,
      zip: model.zip,

      // become a competitor props
      school: model.school,
      dob: model.dob,
      champion: model.champion,
      gender: model.gender,

      // dependents props
      public_reg: model.public_reg
    }
  }

})

;

