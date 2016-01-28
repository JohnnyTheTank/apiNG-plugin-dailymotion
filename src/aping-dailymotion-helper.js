"use strict";

angular.module("jtt_aping_dailymotion")
    .service('apingDailymotionHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
        this.getThisPlattformString = function () {
            return "dailymotion";
        };

        this.getThisPlatformLink = function () {
            return "https://dailymotion.com/";
        };

        this.getObjectByJsonData = function (_data, _helperObject) {

            var requestResults = [];
            if (_data) {

                var _this = this;

                if (_data) {

                    angular.forEach(_data.data.list, function (value, key) {
                        var tempResult;
                        if (_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                            tempResult = value;
                        } else {
                            tempResult = _this.getItemByJsonData(value, _helperObject);
                        }
                        if (tempResult) {
                            requestResults.push(tempResult);
                        }
                    });
                }
            }
            return requestResults;
        };

        this.getItemByJsonData = function (_item, _helperObject) {
            var returnObject = {};
            if (_item && _helperObject.model) {
                switch (_helperObject.model) {
                    case "social":
                        returnObject = this.getSocialItemByJsonData(_item);
                        break;
                    case "video":
                        returnObject = this.getVideoItemByJsonData(_item, _helperObject);
                        break;

                    default:
                        return false;
                }
            }
            return returnObject;
        };

        this.getSocialItemByJsonData = function (_item) {
            var socialObject = apingModels.getNew("social", this.getThisPlattformString());

            angular.extend(socialObject, {
                blog_name: _item['owner.screenname'] || undefined,
                blog_id: _item['owner.id'] || undefined,
                blog_link: _item['owner.url'] || undefined,
                type: _item.item_type || _item.media_type || undefined,
                timestamp: _item.created_time * 1000,
                source: _item.embed_html || undefined,
                post_url: _item.url,
                intern_id: _item.id,
                text: apingUtilityHelper.getTextFromHtml(_item.description),
                caption: _item.title,
                img_url: _item.thumbnail_720_url,
                thumb_url: _item.thumbnail_240_url,
                native_url: _item.thumbnail_url,
                likes: _item.bookmarks_total,
                comments: _item.comments_total,
            });

            socialObject.date_time = new Date(socialObject.timestamp);

            return socialObject;
        };

        this.getVideoItemByJsonData = function (_item, _helperObject) {
            var videoObject = apingModels.getNew("video", this.getThisPlattformString());

            angular.extend(videoObject, {
                blog_name: _item['owner.screenname'] || undefined,
                blog_id: _item['owner.id'] || undefined,
                blog_link: _item['owner.url'] || undefined,
                type: _item.item_type || _item.media_type || undefined,
                timestamp: _item.created_time * 1000,
                markup: _item.embed_html || undefined,
                post_url: _item.url,
                intern_id: _item.id,
                text: apingUtilityHelper.getTextFromHtml(_item.description),
                caption: _item.title,
                img_url: _item.thumbnail_720_url,
                thumb_url: _item.thumbnail_240_url,
                native_url: _item.thumbnail_url,
                likes: _item.bookmarks_total,
                comments: _item.comments_total,
                duration: _item.duration, // in seconds
            });

            if (_helperObject.protocol) {
                videoObject.markup = videoObject.markup.replace('src=\"//', 'src=\"' + _helperObject.protocol);
            }

            videoObject.date_time = new Date(videoObject.timestamp);

            return videoObject;
        };
    }]);