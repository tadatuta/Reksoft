define(['fabric'], function (fabric) {
    //canvas, width, url, imgScaleParam, imgLeft, imgTop, animationSpeed, scaleIndex, linear
    var Arrow = function (settings) {
        var self = this;
        this.settings = settings;

        /*fabric.loadSVGFromURL(this.settings.url, function(objects, options) {
            var cloudImg = fabric.util.groupSVGElements(objects, options);
            cloudImg.scale(1);
            self.settings.canvas.add(cloudImg.set({
                left: self.settings.imgLeft,
                top: self.settings.imgTop,
                // originX: "center",
                // originY: "center"
            }));
            self.cloudImg = cloudImg;
            // self.animate();
        });*/

        fabric.Image.fromURL(this.settings.url, function(cloudImg) { // TODO вставить как svg (loadSVGFromURL), если будет норм
            cloudImg.scale(self.settings.imgScaleParam * self.settings.scaleIndex);
            self.settings.canvas.add(cloudImg.set({
                left: self.settings.imgLeft,
                top: self.settings.imgTop,
                originX: "center",
                originY: "center",
                opacity: self.settings.opacity,
            }));
            self.cloudImg = cloudImg;
            self.animate();
        });

    };

    Arrow.prototype.animate = function () {
        var self = this;
        this.cloudImg.animate('left', this.settings.width - 10, {
            duration: this.settings.animationSpeed,
            onChange: this.settings.shouldCanvasRerenderOnChange
                ? this.settings.canvas.renderAll.bind(this.settings.canvas)
                : undefined,
            easing: this.settings.easing,
            onComplete: function () {
                self.settings.canvas.add(self.cloudImg.set({
                    left: 0,
                    top: self.settings.imgTop,
                    originX: "center",
                    originY: "center",
                    opacity: self.settings.opacity,
                }));
                self.animate();
            }
        });
    };

    return Arrow;

});