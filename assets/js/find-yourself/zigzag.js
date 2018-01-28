define(['fabric'], function (fabric) {

    var Zigzag = function (canvas) {
        var self = this;
        this.canvas = canvas;
        this.myY = -40;

        fabric.loadSVGFromURL('../assets/img/zigzag_1.svg', function(objects, options) {
            self.zigzag1 = fabric.util.groupSVGElements(objects, options);
            var imgHeight = self.zigzag1.height * 0.7;
            self.zigzag1.scale(0.7);
            self.canvas.add(self.zigzag1.set({
                left: self.canvas.width / 2,
                top: 0,
                originX: "left",
                originY: "top",
                opacity: 1,
                clipTo: function (ctx) {
                    ctx.arc(0, self.myY, imgHeight/2, 0, Math.PI*2 , true);
                }
            }));
            self.animate();
        });
    };

    Zigzag.prototype.animate = function() {
        var myYstart = -40;
        var myYend = 40;
        var self = this;

        fabric.util.animate({
            startValue: Math.round(this.myY) === myYstart ? myYstart : myYend,
            endValue: Math.round(this.myY) === myYstart ? myYend : myYstart,
            duration: 2500,
            onChange: function(value) {
                self.myY = value;
                self.canvas.renderAll();
            },
            onComplete:  function () {
                self.animate();
            }
        });
    };

    return Zigzag;

});