require.config({
    baseUrl: "/assets/js",
    paths: {
        bootstrap: "../../bower_components/bootstrap/dist/js/bootstrap",
        jquery: "../../bower_components/jquery/dist/jquery",
        backbone: "../../bower_components/backbone/backbone",
        underscore: "../../bower_components/underscore/underscore",
        requirejs: "../../bower_components/requirejs/require",
        text: "../../bower_components/text/text",
        device: "../../bower_components/device.js/lib/device",
        fabric: "../../bower_components/fabric.js/dist/fabric.min",
        slick: "../../bower_components/slick-carousel/slick/slick.min",
        scrollify: "../../bower_components/Scrollify/jquery.scrollify"
    },
    shim: {
        bootstrap: {
            deps: [
                "jquery"
            ]
        },
        slick: {
            deps: [
                "jquery"
            ]
        },
        fabric : {
            exports : "fabric"
        },
        scrollify: {
            exports: "scrollify"
        }
    },
    packages: [

    ]
});

// Загружаем наше приложение (главный скрипт)
require( [ "app" ] ); // app for developing, dist for prod