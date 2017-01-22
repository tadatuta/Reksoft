define(["assets/js/initial-block/movingLine.js"], function (MovingLine) {

    var LeftCircles = function (canvas, width, height, src, showLeft) {
        var self = this;
        this.showLeft = showLeft;
        this.height = height;
        this.canvas = canvas;

        fabric.loadSVGFromURL(src, function(objects, options) {
            var leftCircle = fabric.util.groupSVGElements(objects, options);
            var imgHeight = leftCircle.height;
            leftCircle.scale(0.7);
            canvas.add(leftCircle.set({
                left: 0,
                top: height / 2 - imgHeight*0.7/2 - 20, //-23 - немного выше поднята, чем середина картинки
                originX: "left",
                originY: "top",
                opacity: 0
            }));
            self.img = leftCircle;
            self.slideToPosition();
            //self.addLinesToLeftCircles(height / 2 +30 );
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
			onChange: function(value) {
				self.canvas.renderAll();
			},
            onComplete: function () {
                self.addLinesToLeftCircles(self.height / 2 +30 );
            }
        });
    };

    LeftCircles.prototype.addLinesToLeftCircles = function (y) {
        var movingLine1 = new MovingLine([ 100, y, 170, y ], {
            strokeWidth: 3,
            fill: '#0F544B',
            stroke: '#0F544B',
            originX: 'center',
            originY: 'center'
        }, 4000, 10000);
        this.canvas.add(movingLine1);
        movingLine1.animateRightAndBack();

        var movingLine2 = new MovingLine([ 90, y + 10, 160, y + 10], {
            strokeWidth: 3,
            fill: '#3ED2CE',
            stroke: '#3ED2CE',
            originX: 'center',
            originY: 'center'
        }, 4000, 10000);
        this.canvas.add(movingLine2);
        setTimeout(function () {
            movingLine2.animateRightAndBack();
        }, 2000);
    };

    return LeftCircles;

});