define(["fabric", "../initial-block/movingLine"], function (fabric, MovingLine) {

    var LeftCircles = function (canvas, width, height, src, showLeft, scaleIndex, curImgScale) {

        this.width = width;
        this.showLeft = showLeft;
        this.height = height;
        this.canvas = canvas;
        this.scaleIndex = scaleIndex;
        this.curImgScale = curImgScale;
        this.src = src;
    };

    LeftCircles.prototype.loadImg = function () {
        var self = this;
        var def = new $.Deferred;
        fabric.loadSVGFromURL(this.src, function (objects, options) {
            var leftCircle = fabric.util.groupSVGElements(objects, options);
            var imgHeight = leftCircle.height * self.scaleIndex;
            leftCircle.scale(self.curImgScale * self.scaleIndex);
            self.canvas.add(leftCircle.set({
                left: 0,
                top: self.height / 2 - imgHeight * self.curImgScale / 2 - 20 * self.scaleIndex, //-20 - немного выше поднята, чем середина картинки
                originX: "left",
                originY: "top",
                opacity: 0
            }));
            self.img = leftCircle;
            self.slideToPosition();
            def.resolve();
        });
        return def;
    };

    LeftCircles.prototype.getImg = function () {
        return this.img;
    };

    LeftCircles.prototype.reinit = function (height, scaleIndex) {
        this.height = height;
        this.scaleIndex = scaleIndex;
    };

    LeftCircles.prototype.slideToPosition = function () {
        var self = this;
        this.img.animate({
            'left': self.showLeft,
            'opacity': 1
        }, {
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
            onChange: function (value) {
                self.canvas.renderAll();
            },
            onComplete: function () {
                self.addLinesToLeftCircles(self.height / 2 + 30 * self.scaleIndex);
            }
        });
    };

    LeftCircles.prototype.addLinesToLeftCircles = function (y) {
        var self = this;
        var x1 = 100 * this.scaleIndex;
        var x2 = 170 * this.scaleIndex;
        this.movingLine1 = new MovingLine([x1, y, x2, y], {
            strokeWidth: 3,
            fill: '#0F544B',
            stroke: '#0F544B',
            originX: 'center',
            originY: 'center'
        }, 4000, 10000, this.scaleIndex);
        this.canvas.add(this.movingLine1);
        this.movingLine1.animateRightAndBack();

        x1 = 90 * this.scaleIndex;
        x2 = 160 * this.scaleIndex;
        var y1 = y + 10 * this.scaleIndex, y2 = y + 10 * this.scaleIndex;
        this.movingLine2 = new MovingLine([x1, y1, x2, y2], {
            strokeWidth: 3,
            fill: '#3ED2CE',
            stroke: '#3ED2CE',
            originX: 'center',
            originY: 'center'
        }, 4000, 10000, this.scaleIndex);
        this.canvas.add(this.movingLine2);
        setTimeout(function () {
            self.movingLine2.animateRightAndBack();
        }, 2000);
    };

    LeftCircles.prototype.reinitLinesToLeftCircles = function () {
        var y = this.height / 2 + 30 * this.scaleIndex;
        var x1 = 100 * this.scaleIndex;
        var x2 = 170 * this.scaleIndex;
        this.movingLine1 && this.movingLine1.set({
            x1: x1,
            y1: y,
            x2: x2,
            y2: y
        });

        x1 = 90 * this.scaleIndex;
        x2 = 160 * this.scaleIndex;
        var y1 = y + 10 * this.scaleIndex, y2 = y + 10 * this.scaleIndex;
        this.movingLine2 && this.movingLine2.set({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        });
    };

    return LeftCircles;

});