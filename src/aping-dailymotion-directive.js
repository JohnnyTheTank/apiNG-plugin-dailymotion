"use strict";

angular.module("jtt_aping_dailymotion", ['jtt_dailymotion'])
    .directive('apingDailymotion', ['apingDailymotionHelper', 'apingUtilityHelper', 'dailymotionFactory', function (apingDailymotionHelper, apingUtilityHelper, dailymotionFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingDailymotion, apingDailymotionHelper.getThisPlattformString(), appSettings);

                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };

                    if (angular.isDefined(appSettings.getNativeData)) {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    if (request.protocol === "http" || request.protocol === "https") {
                        helperObject.protocol = request.protocol + "://";
                    } else  if (appSettings.protocol === "http" || appSettings.protocol === "https") {
                        helperObject.protocol = appSettings.protocol + "://";
                    } else {
                        helperObject.protocol = "//";
                    }

                    //create requestObject for api request call
                    var requestObject = {};

                    if (angular.isDefined(request.items)) {
                        requestObject.limit = request.items;
                    } else {
                        requestObject.limit = appSettings.items;
                    }

                    if (requestObject.limit === 0 || requestObject.limit === '0') {
                        return false;
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if (requestObject.limit < 0 || isNaN(requestObject.limit)) {
                        requestObject.limit = undefined;
                    }

                    // the api has a limit of 100 items per request
                    if (requestObject.limit > 100) {
                        requestObject.limit = 100;
                    }

                    if (angular.isDefined(request.search)) {
                        requestObject.search = request.search;
                    }

                    if (angular.isDefined(request.tags)) {
                        requestObject.tags = request.tags;
                    }

                    if (request.userId) {

                        requestObject.id = request.userId;
                        requestObject.sort = 'recent';

                        if (angular.isDefined(request.channelId)) {
                            requestObject.channel = request.channelId;
                        }

                        dailymotionFactory.getVideosFromUserById(requestObject)
                            .then(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingDailymotionHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });
                    } else if (request.channelId) {

                        requestObject.id = request.channelId;
                        requestObject.sort = 'recent';

                        dailymotionFactory.getVideosFromChannelById(requestObject)
                            .then(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingDailymotionHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });
                    } else if (request.playlistId) {

                        requestObject.id = request.playlistId;
                        requestObject.sort = 'recent';

                        dailymotionFactory.getVideosFromPlaylistById(requestObject)
                            .then(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingDailymotionHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });
                    } else {

                        if (angular.isDefined(request.genre)) {
                            requestObject.genre = request.genre;
                        }

                        if (angular.isDefined(request.country)) {
                            requestObject.country = request.country;
                        }

                        if (angular.isDefined(request.language)) {
                            requestObject.detected_language = request.language;
                        }

                        dailymotionFactory.getVideosByParams(requestObject)
                            .then(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingDailymotionHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });
                    }

                });
            }
        }
    }]);