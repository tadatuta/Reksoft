define(['fabric'], function (fabric) {

    var MovingSquare = function (canvas, width, height, square, delayTo, delayBack, baseDelay, reksoftImgHeight, scaleIndex, index) {
        this.delayTo = delayTo;
        this.delayBack = delayBack;
        this.baseDelay = baseDelay;
        var self=this;
        this.movePathLength = 100*scaleIndex;
        this.square = square;
        var baseLeftOffset = 150*scaleIndex;

        canvas.add(square.set({
            left: width - baseLeftOffset + 20*index*scaleIndex,
            top: height / 2 - 8,
            originX: "center",
            originY: "center",
        }));
    };

    MovingSquare.prototype.animate = function (doRestart) {
        var self=this;

        setTimeout(function () {
            self.square.animate('left', self.square.left - self.movePathLength, {
                duration: 1000,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {
                }
            });
        }, this.delayTo);

        setTimeout(function () {
            self.square.animate('left', self.square.left + self.movePathLength, {
                duration: 1000,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {
                    if(doRestart) {
                        setTimeout(function () {
                            $(window).trigger("square-restart-animation");
                        }, self.baseDelay);
                    }
                }
            });
        }, this.delayBack);
    };


    return MovingSquare;

});