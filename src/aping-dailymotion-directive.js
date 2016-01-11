"use strict";

var jjtApingDailymotion = angular.module("jtt_aping_dailymotion", ['jtt_dailymotion'])
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
                    if (typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call
                    var requestObject = {};

                    if (typeof request.items !== "undefined") {
                        requestObject.limit = request.items;
                    } else {
                        requestObject.limit = appSettings.items;
                    }

                    if (requestObject.count === 0 || requestObject.count === '0') {
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

                    if (typeof request.search !== "undefined") {
                        requestObject.search = request.search;
                    }

                    if (typeof request.tags !== "undefined") {
                        requestObject.tags = request.tags;
                    }

                    if (request.userId) {

                        requestObject.id = request.userId;
                        requestObject.sort = 'recent';

                        if (typeof request.channelId !== "undefined") {
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

                        if (typeof request.genre !== "undefined") {
                            requestObject.genre = request.genre;
                        }

                        if (typeof request.country !== "undefined") {
                            requestObject.country = request.country;
                        }

                        if (typeof request.language !== "undefined") {
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