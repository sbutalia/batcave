// Examples
//  <div ui-toggle class='dealshare_ampm_group' firstlabel="'AM'" secondlabel="'PM'" vals="[0,1]" contentdata="base.app.content.dealshare.end_date_display.end_date_ampm"/>
//  <div ui-toggle class='header_image_onff' firstlabel="'On'" secondlabel="'Off'" vals="['off','image']" contentdata="data.active_tab"/>
angular.module('cmpUiToggle', []).directive('uiToggle', function($compile) {
    return {
        restrict: 'A',
        scope: {firstlabel: '=',
                secondlabel: '=',
                contentdata: '='
            },
        templateUrl: '/public/tpl/toggleUI.htm',
        link: function(scope, elm, iAttrs) {
            scope.vals = scope.$eval(iAttrs.vals);

            if(scope.contentdata !== undefined){
                //console.log("-- uiToggle: ", scope.contentdata);
            }

            scope.toggle = function(val){
                if(scope.vals)
                    scope.contentdata = scope.vals[val];
                else
                    scope.contentdata = val;
            }

            scope.echoActive = function(boolVal) {
                if(boolVal)
                    return 'active';
                else
                    return '';
            };
        }

    }
});