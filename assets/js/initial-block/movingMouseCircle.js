define([], function () {

    var MovingMouseCircle = fabric.util.createClass(fabric.Circle, {
        initialize: function (array, duration, interval) {
            this.callSuper('initialize', array);
            this.duration = duration;
            this.interval = interval;
        },
        animateTopAndBack: function () {
            var self = this;

            this.animate("top", "=-10",{
                duration: self.duration,
                easing: fabric.util.ease.easeOutExpo,
                onComplete: function () {
                    self.animateBottom();
                }
            });
        },
        animateBottom: function () {
            var self = this;
                self.animate('top', '=10', {
                    duration: self.duration,
                    easing: fabric.util.ease.easeInExpo,
                    onComplete: function () {
                        setTimeout(function(){
                            self.animateTopAndBack();
                        }, self.interval);
                    }
                });
        }

    });

    return MovingMouseCircle;

});