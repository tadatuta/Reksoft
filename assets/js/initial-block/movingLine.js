define([], function () {

    var MovingLine = fabric.util.createClass(fabric.Line, {
        initialize: function (array, obj, duration, interval) {
            this.callSuper('initialize', array, obj);
            this.duration = duration;
            this.interval = interval;
        },
        animateRightAndBack: function () {
            var self = this;

            this.animate('left', '=' + 130, {
                duration: self.duration,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {
                    self.animateLeft();
                }
            });
        },
        animateLeft: function () {
            var self = this;

            setTimeout(function () {

                self.animate('left', '-=' + 130, {
                    duration: self.duration,
                    easing: fabric.util.ease.easeInOutExpo,
                    onComplete: function () {
                        setTimeout(function () {
                            self.animateRightAndBack();
                        }, self.interval);
                    }
                });

            }, self.interval);

        }

    });

    return MovingLine;

});