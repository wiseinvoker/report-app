import Dispatcher from 'flux/lib/Dispatcher';
import angular from 'angular';

export const module = angular.module( 'report.dispatcher', [] ).service( 'dispatcher', Dispatcher );

export default Dispatcher;

