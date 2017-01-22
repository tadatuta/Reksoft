define([], function () {

    var BlinkingSquare = fabric.util.createClass(fabric.Rect, {
        initialize: function (initObj) {
            this.settings = initObj;
            this.callSuper('initialize', initObj);

           // this.addBlinking();
        },

        addBlinking: function(){
            var self = this;

            setTimeout(function () {
                self.addOneBlink();

                setTimeout(function () {
                    self.addOneBlink(true);
                }, 150 ); //150 чтоб видно было 2 мигания

            }, self.intervalBeforeNextState);
        },

        addOneBlink: function(doRepeat){
            var blinkDuration = 10;
            var self = this;

            this.animate('opacity', 0, {
                duration: blinkDuration,
                easing: fabric.util.ease.easeInOutQuad,
                onChange: function () {
                    self.canvas.renderAll();
                }
            });

            setTimeout(function () {
                self.animate('opacity', 1, {
                    duration: blinkDuration,
                    easing: fabric.util.ease.easeInOutQuad,
                    onChange: function () {
                        self.canvas.renderAll();
                    },
                    onComplete: function () {
                        if (doRepeat) self.addBlinking();
                    }
                });
            }, 50 );
        }
    });

    return BlinkingSquare;

});