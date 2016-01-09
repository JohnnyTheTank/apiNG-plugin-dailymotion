"use strict";

jjtApingDailymotion.service('apingDailymotionHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
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
                    if(_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                        tempResult = value;
                    } else {
                        tempResult = _this.getItemByJsonData(value, _helperObject.model);
                    }
                    if(tempResult) {
                        requestResults.push(tempResult);
                    }
                });
            }

        }
        return requestResults;
    };

    this.getItemByJsonData = function (_item, _model) {
        var returnObject = {};
        if (_item && _model) {
            switch (_model) {
                case "social":
                    returnObject = this.getSocialItemByJsonData(_item);
                    break;
                case "video":
                    returnObject = this.getVideoItemByJsonData(_item);
                    break;

                default:
                    return false;
            }
        }
        return returnObject;
    };

    this.getSocialItemByJsonData = function (_item) {
        var socialObject = apingModels.getNew("social", this.getThisPlattformString());

        //fill _item in socialObject
        $.extend(true, socialObject, {
            "blog_name": _item['owner.screenname'] || undefined,
            "blog_id":  _item['owner.id'] || undefined,
            "blog_link": _item['owner.url'] || undefined,
            "type": _item.item_type || _item.media_type || undefined,
            "timestamp": _item.created_time * 1000,
            "source": _item.embed_html || undefined,
            "post_url": _item.url,
            "intern_id": _item.id,
            //"text": _item.description.replace(/<(?:.|\n)*?>/gm, ''),
            "text": apingUtilityHelper.getTextFromHtml(_item.description),
            "caption": _item.title,
            "img_url": _item.thumbnail_url,
            "likes": _item.bookmarks_total,
            "comments": _item.comments_total,
        });

        socialObject.date_time = new Date(socialObject.timestamp);

        return socialObject;
    };

    this.getVideoItemByJsonData = function (_item) {
        var videoObject = apingModels.getNew("video", this.getThisPlattformString());

        //fill _item in videoObject
        $.extend(true, videoObject, {
            blog_name: _item['owner.screenname'] || undefined,
            blog_id:  _item['owner.id'] || undefined,
            blog_link: _item['owner.url'] || undefined,
            type: _item.item_type || _item.media_type || undefined,
            timestamp: _item.created_time * 1000,
            markup: _item.embed_html || undefined,
            post_url: _item.url,
            intern_id: _item.id,
            text: apingUtilityHelper.getTextFromHtml(_item.description),
            caption: _item.title,
            img_url: _item.thumbnail_url,
            likes: _item.bookmarks_total,
            comments: _item.comments_total,
            duration: _item.duration, // in seconds
        });

        videoObject.date_time = new Date(videoObject.timestamp);

        return videoObject;
    };

}]);