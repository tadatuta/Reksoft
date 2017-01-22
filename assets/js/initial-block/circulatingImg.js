define([], function () {

    var CirculatingImg = function (canvas, width, height, src, left, top) {
       // var def = new $.Deferred;
        var self = this;

        fabric.Image.fromURL(src, function (circle) {
            self.circle = circle;
            circle.scale(0.6);
            //def.resolve();

            canvas.add(circle.set({
                left: width - 400,
                top: height / 2 + 100,
                originX: "center",
                originY: "center",
                opacity: 100
            }));

        });

        fabric.Image.fromURL('../assets/img/circleRightCircle.png', function (arc) {
            self.arc = arc;
            arc.scale(0.6);
            canvas.add(arc.set({
                left: width - 400,
                top: height / 2 + 100,
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