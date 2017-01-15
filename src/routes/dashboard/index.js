import styles from './styles.scss';
import accounts from '../../accounts';
import header from '../../public-header';
import reports from '../../reports';

class UserDashboardController {
  constructor ( $state, fReportService, currentUser ) {
    this._ = { $state, fReportService };
    this.user = currentUser;
    this.report_date = new Date();
    // this.loadReport();
    this.load();
  }

  load () {
    this.user.is_superuser ? this.loadTeamReports() : this.loadReport();
  }

  loadReport () {
    let converted_date = this.convertDate( this.report_date );
    this._.fReportService.forUser( this.user.id, converted_date )
    .then( resp => {
      this.myreport = resp.data[0];
    });
  }

  loadTeamReports () {
    let converted_date = this.convertDate( this.report_date );
    this._.fReportService.forAdmin( converted_date )
    .then( resp => {
      this.team_reports = resp.data;
    });
  }

  convertDate( date ) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    let yyyy = date.getFullYear();
    dd = dd < 10 ? ( '0' + dd ) : dd
    mm = mm < 10 ? ( '0' + mm ) : mm
    let converted_date = yyyy + '-' + mm + '-' + dd;

    return converted_date;
  }

  submitReport() {
    if ( this.myreport.id ) {
      this._.fReportService.update(this.myreport);
    } else {
      this.myreport.reporter = this.user.id;
      this._.fReportService.create(this.myreport);
    }
  }

}

export default angular.module( 'report.routes.dashboard', [
  'ui.router',
  'ngMaterial',
  'report.accounts',
  'report.reports',
  'report.public-header'
])

.config( function ( $stateProvider ) {
  $stateProvider.state( 'dashboard', {
    url: '/dashboard',
    template: require( './tpl.html' ),
    controller: 'UserDashboardController',
    controllerAs: 'dash',
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
  });
})

.controller( 'UserDashboardController', UserDashboardController )

;

