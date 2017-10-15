define(["fabric", "assets/js/initial-block/movingLine.js"], function (fabric, MovingLine) {

    var LeftCircles = function (canvas, width, height, src, showLeft, scaleIndex) {
        var self = this;
        this.showLeft = showLeft;
        this.height = height;
        this.canvas = canvas;
        this.scaleIndex = scaleIndex;
        this.curImgScale = 0.7;

        fabric.loadSVGFromURL(src, function (objects, options) {
            var leftCircle = fabric.util.groupSVGElements(objects, options);
            var imgHeight = leftCircle.height * scaleIndex;
            leftCircle.scale(self.curImgScale * scaleIndex);
            canvas.add(leftCircle.set({
                left: 0,
                top: height / 2 - imgHeight * self.curImgScale / 2 - 20 * scaleIndex, //-20 - немного выше поднята, чем середина картинки
                originX: "left",
                originY: "top",
                opacity: 0
            }));
            self.img = leftCircle;
            self.slideToPosition();
        });

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
        var x1 = 100 * this.scaleIndex;
        var x2 = 170 * this.scaleIndex;
        var movingLine1 = new MovingLine([x1, y, x2, y], {
            strokeWidth: 3,
            fill: '#0F544B',
            stroke: '#0F544B',
            originX: 'center',
            originY: 'center'
        }, 4000, 10000, this.scaleIndex);
        this.canvas.add(movingLine1);
        movingLine1.animateRightAndBack();

        x1 = 90 * this.scaleIndex;
        x2 = 160 * this.scaleIndex;
        var y1 = y + 10 * this.scaleIndex, y2 = y + 10 * this.scaleIndex;
        var movingLine2 = new MovingLine([x1, y1, x2, y2], {
            strokeWidth: 3,
            fill: '#3ED2CE',
            stroke: '#3ED2CE',
            originX: 'center',
            originY: 'center'
        }, 4000, 10000, this.scaleIndex);
        this.canvas.add(movingLine2);
        setTimeout(function () {
            movingLine2.animateRightAndBack();
        }, 2000);
    };

    return LeftCircles;

});