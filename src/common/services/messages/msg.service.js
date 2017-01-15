import styles from './msg.service.scss';

export class MsgService {
  constructor($mdToast) {
    this.$mdToast = $mdToast;
  }
  
  displaySuccessMsg(msg) {
    this.$mdToast.show({
      template: `<md-toast class="md-toast f-toast success">
                    <span flex>${msg}</span>
                    <div class="md-action" ng-click="closeToast()">
                      <i class="fa fa-times"></i>
                    </div>
                 </md-toast>`,
      position: 'top right',
      hideDelay: 4000,
      controller: function($scope, $mdToast) {
        $scope.closeToast = () => $mdToast.hide();
      }
    });
  }

  displayWarningMsg(msg) {
    this.$mdToast.show({
      template: `<md-toast class="md-toast f-toast warning" layout="row">
                  <span flex>${msg}</span>
                    <div class="md-action" ng-click="closeToast()">
                      <i class="fa fa-times"></i>
                    </div>
                 </md-toast>`,
      position: 'top right',
      hideDelay: 8000,
      controller: function($scope, $mdToast) {
        $scope.closeToast = () => $mdToast.hide();
      }
    });
  }

  displayErrorMsg(msg) {
    if (msg) {
      let message = angular.isString(msg) ? msg : `${msg.data.errors[0].code} ${msg.data.errors[0].title}: ${msg.data.errors[0].detail}`;
      this.$mdToast.show({
        template: `<md-toast class="md-toast f-toast error" layout="row">
                    <span flex>${message}</spanflex>
                    <div class="md-action" ng-click="closeToast()">
                      <i class="fa fa-times"></i>
                    </div>
                  </md-toast>`,
        position: 'top right',
        hideDelay: false,
        controller: function($scope, $mdToast) {
          $scope.closeToast = () => $mdToast.hide();
        }
      });
    }
  }
}