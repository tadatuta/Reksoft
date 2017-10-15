define(['fabric'], function (fabric) {

    var MovingLittleCircle = function (canvas, width, height, circle, startAngle, delayTo, delayBack, baseDelay, reksoftImgHeight) {
        this.delayTo = delayTo;
        this.delayBack = delayBack;
        this.baseDelay = baseDelay;
        var self=this;
        this.circle = circle;
       // circle.rotate(startAngle);

        canvas.add(circle.set({
            left: width / 2,
            top: height / 2 - reksoftImgHeight/2,
            originX: "center",
            originY: "center",
            angle : startAngle
        }));
        //var def = new $.Deferred;
    };

    MovingLittleCircle.prototype.animate = function (doRestart) {
        var self=this;

        setTimeout(function () {
            self.circle.animate('angle', "=-48", {
                duration: 1000,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {
                }
            });
        }, this.delayTo);

        setTimeout(function () {
            self.circle.animate('angle', "=48", {
                duration: 1000,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {
                    if(doRestart) {
                        setTimeout(function () {
                            $(window).trigger("little-circles-restart-animation");
                        }, self.baseDelay);
                    }
                }
            });
        }, this.delayBack);
    };


    return MovingLittleCircle;

});