define([], function () {

    var SticksAroundCircle = function (canvas, width, height, imgSrc, angle, duration, mscaleIndex, reksoftImgHeight) {
        var self = this;
        //var def1 = new $.Deferred;
        this.imgSrc = imgSrc;
        this.angle = angle;
        this.duration = duration;

        fabric.Image.fromURL(this.imgSrc, function (img) {
            var imgWidth = img.getOriginalSize().width * mscaleIndex;
            var imgHeight = img.getOriginalSize().height * mscaleIndex;
            img.scale(mscaleIndex);
            canvas.add(img.set({
                left: width / 2 ,
                top: height / 2 - reksoftImgHeight/2,
                originX: "center",
                originY: "center",
                opacity: 100
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

        this.img.animate('angle', this.angle, {
            duration: this.duration,
            easing: fabric.util.ease.easeInOutExpo,
            onComplete: function () {
                self.animateBack();
            }
        });
    };

    SticksAroundCircle.prototype.animateBack = function () {
        var self = this;

        this.img.animate('angle', -this.angle, {
            duration: this.duration,
            easing: fabric.util.ease.easeInOutExpo,
            onComplete: function () {
                self.animateTwoDirection();
            }
        });
    };

    return SticksAroundCircle;

});