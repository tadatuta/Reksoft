define(['fabric'], function (fabric) {

    var SticksAroundCircle = function (canvas, width, height, imgSrc, startAngle, angleTo, angleBack, duration, mscaleIndex, reksoftImgHeight) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.imgSrc = imgSrc;
        this.duration = duration;
		this.startAngle = startAngle;
		this.angleTo = angleTo;
		this.angleBack = angleBack;
		this.mscaleIndex = mscaleIndex;
        this.reksoftImgHeight = reksoftImgHeight;
    };

    SticksAroundCircle.prototype.loadImg = function () {
        var self = this;
        var def = new $.Deferred;

        fabric.loadSVGFromURL(this.imgSrc, function(objects, options) {
            var img = fabric.util.groupSVGElements(objects, options);
            img.scale(self.mscaleIndex);
            self.canvas.add(img.set({
                left: self.width / 2 ,
                top: self.height / 2 - self.reksoftImgHeight/2,
                originX: "center",
                originY: "center",
                opacity: 1,
                angle: self.startAngle
            }));

            self.img = img;
            def.resolve();
        });
        return def;
    };

    SticksAroundCircle.prototype.animateTwoDirection = function () {
        var self = this;

        this.img.animate('angle', this.angleTo, {
            duration: this.duration,
            easing: fabric.util.ease.easeInOutExpo,
            onComplete: function () {
                self.animateBack();
            }
        });
    };

    SticksAroundCircle.prototype.animateBack = function () {
        var self = this;

        this.img.animate('angle', -this.angleBack, {
            duration: this.duration,
            easing: fabric.util.ease.easeInOutExpo,
            onComplete: function () {
                self.animateTwoDirection();
            }
        });
    };

    SticksAroundCircle.prototype.getImg = function () {
        return this.img;
    };

    return SticksAroundCircle;

});