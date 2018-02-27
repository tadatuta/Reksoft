define(['fabric'], function (fabric) {

    var MovingCircle = fabric.util.createClass(fabric.Circle, {
        initialize: function (initObj, top, canvas, scaleIndex, opacity) {
            this.callSuper('initialize', initObj);
            this.showTop = top;
            this.canvas = canvas;
            this.scaleIndex = scaleIndex;
			this.opacity = opacity;
        },

        reinit: function (top, scaleIndex) {
            this.showTop = top;
            this.scaleIndex = scaleIndex;
        },

        toString: function () {
            //return this.callSuper('toString') + ' (color: ' + this.color + ')';
        },

        moveTop: function () {
            var self = this;
            this.animate('top', self.showTop - 50 * self.scaleIndex, {
                duration: 5000,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {
                    self.moveBack()
                }
            });
        },

        moveBack: function () {
            var self = this;
            this.animate('top', self.showTop + 50 * self.scaleIndex, {
                duration: 5000,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {
                    self.moveTop()
                }
            });
        },

        slideToPosition: function () {
            var self = this;
            var def = $.Deferred();
            this.animate({
                'top': this.showTop,
                'opacity': this.opacity
            }, {
                duration: 1000,
                easing: fabric.util.ease.easeOutBounce,
                onChange: function (angle) {
                    //self.canvas.renderAll(); //хватает прорисовки от LeftCircles
                },
                onComplete: function () {
                    def.resolve();
                }
            });
            return def;
        }
    });

    return MovingCircle;

});