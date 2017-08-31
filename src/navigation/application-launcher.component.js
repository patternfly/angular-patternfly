/**
 * @ngdoc directive
 * @name patternfly.navigation.component:pfApplicationLauncher
 * @restrict E
 *
 * @description
 * Component for rendering application launcher dropdown.
 *
 * @param {string=} label Use a custom label for the launcher, default: Application Launcher
 * @param {boolean=} isDisabled Disable the application launcher button, default: false
 * @param {boolean=} isList Display items as a list instead of a grid, default: false
 * @param {boolean=} hiddenIcons Flag to not show icons on the launcher, default: false
 * @param {array} items List of navigation items
 * <ul style='list-style-type: none'>
 * <li>.title        - (string) Name of item to be displayed on the menu
 * <li>.iconClass    - (string) Classes for icon to be shown on the menu (ex. "fa fa-dashboard")
 * <li>.href         - (string) href link to navigate to on click
 * <li>.tooltip      - (string) Tooltip to display for the badge
 * </ul>
 * @example
 <example module="patternfly.navigation">
 <file name="index.html">
   <div ng-controller="applicationLauncherController" class="row">
     <div class="col-xs-12 pre-demo-text">
       <label>Click the launcher indicator to show the Application Launcher Dropdown:</label>
     </div>
     <nav class="navbar navbar-default navbar-pf" role="navigation">
       <div class="navbar-header">
         <a class="navbar-brand" href="/">
         <img src="img/brand.svg" alt="PatternFly Enterprise Application">
         </a>
       </div>
       <div class="collapse navbar-collapse navbar-collapse-1">
         <ul class="nav navbar-nav navbar-utility">
           <li>
             <pf-application-launcher items="navigationItems" label="{{label}}" is-disabled="isDisabled" is-list="isList" hidden-icons="ctrl.hiddenIcons === 'true'"></pf-application-launcher>
           </li>
           <li class="dropdown">
             <a class="nav-item-iconic" id="horizontalDropdownMenu11" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
               <span title="Help" class="fa pficon-help"></span>
               <span class="caret"></span>
             </a>
           </li>
           <li class="dropdown">
             <a href="#" class="dropdown-toggle" data-toggle="dropdown">
               <span class="pficon pficon-user"></span>Brian Johnson <b class="caret"></b>
             </a>
           </li>
         </ul>
         <ul class="nav navbar-nav navbar-primary">
           <li><a href="#">First Link</a></li>
           <li class="active"><a href="#">Another Link</a></li>
           <li><a href="#">And Another</a></li>
           <li><a href="#">As a General Rule</a></li>
           <li><a href="#">Five to Seven Links</a></li>
           <li><a href="#">Is Good</a></li>
         </ul>
       </div>
     </nav>
     <div class="col-md-12">
       <form role="form">
         <div class="row">
           <div class="col-md-3">
             <div class="form-group">
               <label>Grid Menu</label></br>
               <label class="radio-inline">
                 <input type="radio" ng-model="ctrl.hiddenIcons" value="false">Icons</input>
               </label>
               <label class="radio-inline">
                 <input type="radio" ng-model="ctrl.hiddenIcons" value="true">No Icons</input>
               </label>
             </div>
           </div>
         </div>
       </form>
     </div>
   </div>
 </file>
 <file name="script.js">
   angular.module('patternfly.navigation').controller('applicationLauncherController', ['$scope',
     function ($scope) {
       $scope.navigationItems = [
         {
           title: "Recteque",
           href: "#/ipsum/intellegam/recteque",
           tooltip: "Launch the Function User Interface",
           iconClass: "pficon-storage-domain"
         },
         {
           title: "Suavitate",
           href: "#/ipsum/intellegam/suavitate",
           tooltip: "Launch the Function User Interface",
           iconClass: "pficon-build"
         },
         {
           title: "Lorem",
           href: "#/ipsum/intellegam/lorem",
           tooltip: "Launch the Function User Interface",
           iconClass: "pficon-domain"
         },
         {
           title: "Home",
           href: "#/ipsum/intellegam/home",
           tooltip: "Launch the Function User Interface",
           iconClass: "pficon-home"
         }
       ];

       $scope.label = 'Application Launcher';
       $scope.isDisabled = false;
       $scope.isList = false;
       $scope.hiddenIcons = 'false';
     }]);
 </file>
 </example>
 */
angular.module('patternfly.navigation').component('pfApplicationLauncher', {
  bindings: {
    items: '<',
    label: '@?',
    isDisabled: '<?',
    isList: '<?',
    hiddenIcons: '<?'
  },
  templateUrl: 'navigation/application-launcher.html',
  controller: function ($scope) {
    'use strict';
    var ctrl = this;

    ctrl.$id = $scope.$id;
  }
});

