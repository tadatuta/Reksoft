define(['fabric'], function (fabric) {

    var MovingMouseCircle = fabric.util.createClass(fabric.Circle, {
        initialize: function (array, duration, interval) {
            this.callSuper('initialize', array);
            this.duration = duration;
            this.interval = interval;
            this.top = array.top;
            this.showTop = array.top;
        },
        animateTopAndBack: function () {
            var self = this;

            this.animate("top", self.showTop -10  ,{
                duration: self.duration,
                easing: fabric.util.ease.easeOutExpo,
                onComplete: function () {
                    self.animateBottom();
                },
                /*onChange: function () {
                    if(!(self.top >= self.showTop - 11))
                    self.top = self.showTop - 10;
                }*/
            });
        },
        animateBottom: function () {
            var self = this;
                self.animate('top', self.showTop, {
                    duration: self.duration,
                    easing: fabric.util.ease.easeInExpo,
                    onComplete: function () {
                        setTimeout(function(){
                            self.animateTopAndBack();
                        }, self.interval);
                    },
                    /*onChange: function () {
                        if(!(self.top <= self.showTop + 11))
                            self.top = self.showTop + 10;
                    }*/
                });
        }

    });

    return MovingMouseCircle;

});