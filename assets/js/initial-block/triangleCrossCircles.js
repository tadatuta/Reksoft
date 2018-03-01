define(['fabric'], function (fabric) {

    var TriangleCrossCircles = function (canvas, width, height, left, top, firstState, intervalBeforeNextState, isBlinking, scaleIndex, shouldRender) {
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
		this.shouldRender = shouldRender;
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

    TriangleCrossCircles.prototype.reinit = function (left, top, scaleIndex) {
        this.left = left;
        this.top = top;
        this.scaleIndex = scaleIndex;
        this.curObj && this.curObj.set({
            left: left,
            top: top,
        });
    };

    TriangleCrossCircles.prototype.setNextState = function () {
        var self = this;
        if (this.state == 0) {
            this.curObj = this.cross;
        } else if (this.state == 1) {
            this.curObj = this.triangle;
        } else {
            this.curObj = this.circle;
        }

        this.curObj.scale(this.scaleIndex * 0.8);
        this.canvas.add(this.curObj.set({
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
        this.curObj.animate('opacity', 1, {
            duration: 1000,
            easing: fabric.util.ease.easeInOutExpo,
            onChange: function(){
                if(self.shouldRender) {
                    self.canvas.renderAll();
                }
            },
            onComplete: function () { }
        });

        if(this.isBlinking) {
            this.addBlinking(this.curObj);
        }

        setTimeout(function () {
            self.curObj.animate('angle', 360, {
                duration: 1000,
                easing: fabric.util.ease.easeInOutExpo,
                onChange: function(){
                    if(self.shouldRender) {
                        self.canvas.renderAll();
                    }
                },
                onComplete: function () {

                }
            });

            self.curObj.animate('scaleX', 0, {
                duration: 1000,
                easing: fabric.util.ease.easeInOutExpo,
                onChange: function(){
                    if(self.shouldRender) {
                        self.canvas.renderAll();
                    }
                },
                onComplete: function () {

                }
            });

            self.curObj.animate({scaleY: 0, opacity: 0}, {
                duration: 1000,
                easing: fabric.util.ease.easeInOutExpo,
                onChange: function(){
                    if(self.shouldRender) {
                        self.canvas.renderAll();
                    }
                },
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
        var self = this;
        var blinkDuration = 40;
        curObj.animate('opacity', 0, {
            duration: blinkDuration,
            easing: fabric.util.ease.easeInOutQuad(),
            onChange: function(){
                if(self.shouldRender) {
                    self.canvas.renderAll();
                }
            },
            onComplete: function () {

            }
        });

        setTimeout(function () {
            curObj.animate('opacity', 1, {
                duration: blinkDuration,
                easing: fabric.util.ease.easeInOutQuad,
                onChange: function(){
                    if(self.shouldRender) {
                        self.canvas.renderAll();
                    }
                },
                onComplete: function () {

                }
            });
        }, blinkDuration + 40);
    };

    return TriangleCrossCircles;

});