define([], function () {

    var MovingArc = fabric.util.createClass(fabric.Circle, {
        initialize: function (initObj) {
            this.settings = initObj;
            this.callSuper('initialize', initObj);
        },
        animateTwoDirections: function(){
            var self = this;

            this.animate('angle', 15, {
                duration: this.settings.duration,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {
                    self.animateBack();
                }
            });
        },

        animateBack: function(){
            var self = this;

            this.animate('angle', -15, {
                duration: this.settings.duration,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {
                    self.animateTwoDirections();
                }
            });
        }
    });

    return MovingArc;

});