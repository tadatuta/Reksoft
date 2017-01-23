define([], function () {

    var CirculatingImg = function (canvas, width, height, srcArc, srcCirc, left, top, scaleIndex) {
       // var def = new $.Deferred;
        var self = this;
        this.scaleIndex = scaleIndex;

        fabric.Image.fromURL(srcArc, function (circle) {
            self.circle = circle;
            circle.scale(0.6 * scaleIndex);
            //def.resolve();

            canvas.add(circle.set({
                left: left,
                top: top,
                originX: "center",
                originY: "center",
                opacity: 100
            }));

        });

        fabric.Image.fromURL(srcCirc, function (arc) {
            self.arc = arc;
            arc.scale(0.6 * scaleIndex);
            canvas.add(arc.set({
                left: left,
                top: top,
                originX: "center",
                originY: "center",
                opacity: 100
            }));
        });

    };

    CirculatingImg.prototype.animateCircle = function () {
        var self = this;

        this.circle.animate('angle', "=360", {
            duration: 2000,
            easing: fabric.util.ease.easeInOutExpo,
            onComplete: function () {
                setTimeout(function () {
                    self.animateArc();
                }, 10000)
            }
        });
    };

    CirculatingImg.prototype.animateArc = function () {
        var self = this;

        this.arc.animate('angle', "=360", {
            duration: 2000,
            easing: fabric.util.ease.easeInOutExpo,
            onComplete: function () {
                setTimeout(function () {
                    self.animateCircle();
                }, 10000)
            }
        });
    };

    return CirculatingImg;

});