define([], function () {

    var Zigzags = function (canvas, width) {
        var self = this;
        var def1=new $.Deferred();
        var def2=new $.Deferred();
        this.canvas = canvas;
        this.width = width;
        this.myY = -40;

        fabric.loadSVGFromURL('../assets/img/zigzag_1.svg', function(objects, options) {
            self.zigzag1 = fabric.util.groupSVGElements(objects, options);
            self.zigzag2 = fabric.util.groupSVGElements(objects, options);
            self.zigzag1SlideToPosition();
            self.zigzag2SlideToPosition();
            def1.resolve();
        });

        fabric.loadSVGFromURL('../assets/img/zigzag_2.svg', function(objects, options) {
            self.zigzag3 = fabric.util.groupSVGElements(objects, options);
            self.zigzag3SlideToPosition();
            def2.resolve();
        });

        $.when(def1, def2).then(function(){
            setTimeout(function(){
                self.animate();
            }, 1000);

        });

    };

    Zigzags.prototype.zigzag1SlideToPosition = function () {
        this.zigzag1.scale(0.7);

        this.canvas.add(this.zigzag1.set({
            left: this.width / 2 + 350,
            top: 0,
            originX: "left",
            originY: "top",
            opacity: 0
        }));

        /*this.zigzag1.animate({
            'top': 100,
            'opacity': 1
        }, {
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
            onComplete: function () { }
        });*/
        this.zigzagSlideToPosition(this.zigzag1, 100);
    };

    Zigzags.prototype.zigzag2SlideToPosition  = function () {
        var imgHeight = this.zigzag2.height * 0.7;
        this.zigzag2.scale(0.7);
        var self=this;

        this.canvas.add(this.zigzag2.set({
            left: this.width / 2 + 380,
            top: 0,
            originX: "left",
            originY: "top",
            opacity: 0,
            clipTo: function (ctx) {
               ctx.arc(0, self.myY, imgHeight/2, 0, Math.PI*2 , true);
            }
        }));

        /*this.zigzag2.animate({
            'top': 80,
            'opacity': 1
        }, {
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
            onComplete: function () { }
        });*/
        this.zigzagSlideToPosition(this.zigzag2, 80);
    };

    Zigzags.prototype.zigzag3SlideToPosition = function () {
        var self=this;
        var imgHeight = this.zigzag3.height * 0.7;
        this.zigzag3.scale(0.7);
        this.canvas.add(this.zigzag3.set({
            left: this.width / 2 + 410,
            top: 0,
            originX: "left",
            originY: "top",
            opacity: 0,
            clipTo: function (ctx) {
               ctx.arc(0, self.myY, imgHeight/2, 0, Math.PI*2 , true);
            }
        }));

        /*this.zigzag3.animate({
            'top': 120,
            'opacity': 1
        }, {
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
            onComplete: function () { }
        });*/
        this.zigzagSlideToPosition(this.zigzag3, 120);
    };

    Zigzags.prototype.animate = function() {
        var myYstart = -40;
        var myYend = 40;
        //this.myY = myYstart;
        var self = this;

        fabric.util.animate({
            startValue: Math.round(this.myY) === myYstart ? myYstart : myYend,
            endValue: Math.round(this.myY) === myYstart ? myYend : myYstart,
            duration: 1000,
            onChange: function(value) {
                self.myY = value;
            },
            onComplete:  function () {
                self.animate();
            }
        });
    };

    Zigzags.prototype.zigzagSlideToPosition = function (zigzag, top) {
        zigzag.animate({
            'top': top,
            'opacity': 1
        }, {
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
            onComplete: function () { }
        });
    };

    return Zigzags;

});