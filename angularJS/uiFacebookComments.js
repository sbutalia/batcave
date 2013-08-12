angular.module('cmpUiFacebookComments', []).directive('uiFacebookComments', function($compile, $rootScope) {
    return {
        restrict: 'A',
        scope: {appname: '=appname',
            pageid: '=pageid',
            fbookappurl: '=fbookappurl',
            basedata:'=basedata'},
        link: function(scope, elm, iAttrs) {
            var elemFbComments = angular.element(''+
				'<div id="dir_facebookComments_view"></div>'
			);
            elm.append(elemFbComments);

            //Accepts the following JSON object
            /*
                var data = {
                    base_relative_url: null,
                    fullurl: null,
                    postfix: contentID
                }
                base_relative_url is anything after http://api-apps.com/...
                fullurl is http://google.com/...
                postfix is anything after the base facebook app url http://facebook.com/nsbatcave?sk=app_2344...
            */
            $rootScope.$on("updateFacebookCommentsContainer", function(state, data) {
                console.log('@ updateFacebookCommentsContainer', data);
                scope.commentsUrl = data;
                renderFacebookComments();
            });

            $rootScope.$on("clearFacebookCommentsContainer", function(state, data) {
                console.log('@ clearFacebookCommentsContainer');
                $(elemFbComments).html('');
            });

            if(scope.fbookappurl)
                renderFacebookComments();
            else
                console.log("No fbookappurl defined.")

            function renderFacebookComments(){
                //url = "/rss.php?fb_comment_id="+scope.myAppName+"_"+scope.myPageID+"_"+scope.postfix;
                url = scope.fbookappurl;

                if(scope.commentsUrl !== undefined){
                    //anything after http://website/...
                    if(scope.commentsUrl.base_relative_url){
                        url = scope.basedata.authorization.baseURL + scope.commentsUrl.base_relative_url;
                    }
                    else if(scope.commentsUrl.fullurl){
                        url = scope.commentsUrl.fullurl;
                    }
                    else if(scope.commentsUrl.postfix){
                        // Anything after the base facebook app url http://facebook.com/pagename?sk=app_2344...
                        if(scope.fbookAppURL.indexOf("?") !== -1)
                            url += "&"+ scope.commentsUrl.postfix;
                        else
                            url += "?"+ scope.commentsUrl.postfix;
                    }
                }

                console.log("Facebook Comments Url: ", url);

                $(elemFbComments).html('<div class="fb-comments" data-href="'+url+'" data-num-posts="4" data-width="790" title="Show comments" data-order-by="reverse_time"></div>');
                FB.XFBML.parse();
            };
        }
    }
});