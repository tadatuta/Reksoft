define(['fabric'], function (fabric) {

    var CirculatingImg = function (canvas, srcArc, srcCirc, left, top, scaleIndex, shouldRender) {
       // var def = new $.Deferred;
        var self = this;
        this.scaleIndex = scaleIndex;
        this.canvas = canvas;
        this.srcArc = srcArc;
        this.srcCirc = srcCirc;
        this.left = left;
        this.top = top;
        this.shouldRender = shouldRender;
    };

    CirculatingImg.prototype.loadArc = function () {
        return this.loadImg(this.srcArc, 'arc');
    };

    CirculatingImg.prototype.loadCircle = function () {
        return this.loadImg(this.srcCirc, 'circle');
    };

    CirculatingImg.prototype.loadImg = function (src, key) {
        var self = this;
        var def = new $.Deferred;
        fabric.loadSVGFromURL(src, function(objects, options) {
            var img = fabric.util.groupSVGElements(objects, options);
            self[key] = img;
            img.scale(0.6 * self.scaleIndex);
            self.canvas.add(img.set({
                left: self.left,
                top: self.top,
                originX: "center",
                originY: "center",
                opacity: 100
            }));
            def.resolve();
        });
        return def;
    };

    CirculatingImg.prototype.animateCircle = function () {
        var self = this;

        this.circle.animate('angle', "=360", {
            duration: 2000,
            onChange: function(){
                if(self.shouldRender) {
                    self.canvas.renderAll();
                }
            },
            // onChange: self.canvas.renderAll.bind(self.canvas),
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
            onChange: function(){
                if(self.shouldRender) {
                    self.canvas.renderAll();
                }
            },
            easing: fabric.util.ease.easeInOutExpo,
            onComplete: function () {
                setTimeout(function () {
                    self.animateCircle();
                }, 10000)
            }
        });
    };

    CirculatingImg.prototype.getCircle = function () {
        return this.circle;
    };

    CirculatingImg.prototype.getArc = function () {
        return this.arc;
    };

    return CirculatingImg;

});