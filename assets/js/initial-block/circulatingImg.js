define(['fabric'], function (fabric) {

    var CirculatingImg = function (canvas, srcArc, srcCirc, left, top, scaleIndex) {
       // var def = new $.Deferred;
        var self = this;
        this.scaleIndex = scaleIndex;
        this.canvas = canvas;

        //fabric.Image.fromURL(srcArc, function (circle) {
        fabric.loadSVGFromURL(srcArc, function(objects, options) {
            var arc = fabric.util.groupSVGElements(objects, options);
            self.arc = arc;
            arc.scale(0.6 * scaleIndex);
            //def.resolve();

            canvas.add(arc.set({
                left: left,
                top: top,
                originX: "center",
                originY: "center",
                opacity: 100
            }));

        });

        //fabric.Image.fromURL(srcCirc, function (arc) {
        fabric.loadSVGFromURL(srcCirc, function(objects, options) {
            var circle = fabric.util.groupSVGElements(objects, options);
            self.circle = circle;
            circle.scale(0.6 * scaleIndex);
            canvas.add(circle.set({
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
            // onChange: this.canvas.renderAll.bind(this.canvas),
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
            // onChange: this.canvas.renderAll.bind(this.canvas),
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