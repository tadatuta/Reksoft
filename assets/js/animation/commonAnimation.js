define([], function () {

        var CommonAnimation = (function () {

            var linear = function (t, b, c, d) {
                return c * t / d + b;
            };

            var setScaleIndexOnLoad = function (width) {
                var resolutionType = getResolution(width);
                var scaleIndex;
                if (resolutionType == "mobile_vert") {
                    scaleIndex = 0.5;
                } else if (resolutionType == "mobile_hor") {
                    scaleIndex = 0.4;
                } else if (resolutionType == "tablet_vert") {
                    scaleIndex = 0.5;
                } else if (resolutionType == "tablet_hor") {
                    scaleIndex = 0.6;
                } else if (resolutionType == "desktop_sm1" || resolutionType == "desktop_sm2") {
                    scaleIndex = 0.75;
                } else if (resolutionType == "desktop_md1") {
                    scaleIndex = 0.85;
                } else if (resolutionType == "desktop_lg1") {
                    scaleIndex = 1;
                } else if (resolutionType == "desktop_lg2") {
                    scaleIndex = 1.2;
                }
                return scaleIndex;
            };

            var getResolution = function (width) {
                if (width < 560) {
                    return "mobile_vert";
                } else if (width >= 560 && width < 760) {
                    return "mobile_hor";
                } else if (width >= 760 && width < 1024) {
                    return "tablet_vert";
                } else if (width >= 1024 && width < 1280) {
                    return "tablet_hor";
                } else if (width >= 1280 && width < 1360) {
                    return "desktop_sm1";
                } else if (width >= 1360 && width <= 1600) {
                    return "desktop_sm2";
                } else if (width > 1600 && width < 1920) {
                    return "desktop_md1";
                } else if (width >= 1900 && width <= 2048) {
                    return "desktop_lg1";
                }  else if (width > 2048) {
                    return "desktop_lg2";
                }
            };

            return {
                setScaleIndexOnLoad: setScaleIndexOnLoad,
                getResolution: getResolution,
                linear: linear,
            };

        })();

        return CommonAnimation;

    });