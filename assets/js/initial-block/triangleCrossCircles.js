define(['fabric'], function (fabric) {

    var TriangleCrossCircles = function (canvas, width, height, left, top, firstState, intervalBeforeNextState, isBlinking, scaleIndex) {
        var self = this;
        this.width = width;
        this.height = height;
        this.state = firstState;
        this.canvas = canvas;
        this.intervalBeforeNextState = intervalBeforeNextState;
        this.left = left;
        this.top = top;
        this.isBlinking = isBlinking;
		this.scaleIndex = scaleIndex;
        var def1 = new $.Deferred;
        var def2 = new $.Deferred;
        var def3 = new $.Deferred;

        fabric.loadSVGFromURL('../assets/img/cross.svg', function(objects, options) {
            var cross = fabric.util.groupSVGElements(objects, options);
            self.cross = cross;
            def1.resolve();
        });

        fabric.loadSVGFromURL('../assets/img/circle.svg', function(objects, options) {
            var circle = fabric.util.groupSVGElements(objects, options);
            self.circle = circle;
            def2.resolve();
        });

        fabric.loadSVGFromURL('../assets/img/triangle.svg', function(objects, options) {
            var triangle = fabric.util.groupSVGElements(objects, options);
            self.triangle = triangle;
            def3.resolve();
        });

        $.when(def1, def2, def3).done(function () {
            self.setNextState();
        });

    };

    TriangleCrossCircles.prototype.setNextState = function () {
        var self = this;
        var curObj;
        if (this.state == 0) {
            curObj = this.cross;
        } else if (this.state == 1) {
            curObj = this.triangle;
        } else {
            curObj = this.circle;
        }

		curObj.scale(this.scaleIndex * 0.8);
        this.canvas.add(curObj.set({
            left: self.left,
            top: self.top,
            originX: "center",
            originY: "center",
            opacity: 0,
            width: 20,
            height: 20,
            angle: 0
        }));

        //плавное появление
        curObj.animate('opacity', 1, {
            duration: 1000,
            easing: fabric.util.ease.easeInOutExpo,
            onComplete: function () { }
        });

        if(this.isBlinking) {
            this.addBlinking(curObj);
        }

        setTimeout(function () {
            curObj.animate('angle', 360, {
                duration: 1000,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {

                }
            });

            curObj.animate('scaleX', 0, {
                duration: 1000,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {

                }
            });

            curObj.animate('scaleY', 0, {
                duration: 1000,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function () {
                    self.state++;
                    if (self.state == 3) self.state = 0;
                    self.setNextState();
                }
            });

        }, this.intervalBeforeNextState);

    };

    TriangleCrossCircles.prototype.addBlinking = function (curObj) {
        var blinkDuration = 40;
        var self = this;

        setTimeout(function () {

            self.addOneBlink(curObj);

            setTimeout(function () {
                self.addOneBlink(curObj);
            }, blinkDuration * 2 + 40);

        }, this.intervalBeforeNextState / 2);
    };

    TriangleCrossCircles.prototype.addOneBlink = function (curObj) {
        var blinkDuration = 40;
        curObj.animate('opacity', 0, {
            duration: blinkDuration,
            easing: fabric.util.ease.easeInOutQuad(),
            onComplete: function () {

            }
        });

        setTimeout(function () {
            curObj.animate('opacity', 1, {
                duration: blinkDuration,
                easing: fabric.util.ease.easeInOutQuad,
                onComplete: function () {

                }
            });
        }, blinkDuration + 40);
    };

    return TriangleCrossCircles;

});