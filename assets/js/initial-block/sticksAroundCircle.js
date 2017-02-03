define([], function () {

    var SticksAroundCircle = function (canvas, width, height, imgSrc, startAngle, angleTo, angleBack, duration, mscaleIndex, reksoftImgHeight) {
        var self = this;
        //var def1 = new $.Deferred;
        this.imgSrc = imgSrc;
        this.duration = duration;
		this.startAngle = startAngle;
		this.angleTo = angleTo;
		this.angleBack = angleBack;

        fabric.loadSVGFromURL(this.imgSrc, function(objects, options) {
            var img = fabric.util.groupSVGElements(objects, options);
            var imgWidth = img.width * mscaleIndex;
            var imgHeight = img.height * mscaleIndex;
            img.scale(mscaleIndex);
            canvas.add(img.set({
                left: width / 2 ,
                top: height / 2 - reksoftImgHeight/2,
                originX: "center",
                originY: "center",
                opacity: 1,
				angle: startAngle
            }));

            self.img = img;
            //def1.resolve();
        });

        /*$.when(def1).done(function () {
            self.animateTwoDirection();
        });*/

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

    return SticksAroundCircle;

});