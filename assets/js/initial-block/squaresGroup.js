define(["assets/js/initial-block/blinkingSquare.js"], function (BlinkingSquare) {

    var SquaresGroup = function (canvas, width, height) {
        this.animDuration = 500;
        this.movePathLength = 100;
        this.timeBeforeNextAnim = 500;
        this.numberOfItems = 4;
        var baseLeftOffset = 170;
        var squares = [];
        var square;
        var self = this;

        for(var j=0;j < this.numberOfItems; j++){
            square =  new BlinkingSquare({
                left: width,
                top: canvas.getHeight() / 2 - 8,
                width: 10,
                height: 10,
                fill: '#F1737A',
                index: 1,
                hasBorders: false,
                'opacity': 0
            });
            canvas.add(square);
            squares.push(square);

            this.slideToPosition(square, width - baseLeftOffset + 20*j);
        }

        squares[0].intervalBeforeNextState = 7000;
        squares[0].addBlinking();
        squares[2].intervalBeforeNextState = 10000;
        squares[2].addBlinking();

        //выполнять после появления сбоку
        setTimeout(function(){
            self.animateGroup(squares);
        }, 1000);

        $("body").on("animation-end", function(){
            setTimeout(function(){
                self.animateGroup(squares);
            }, 500);
        });

    };

    SquaresGroup.prototype.animateGroup = function (squares) {
        for (var i = 0; i < this.numberOfItems; i++) {
            this.moveSquareToLeft(i, squares[i]);
        }
        for (i = 0; i < this.numberOfItems; i++) {
            this.moveSquareToRight(this.numberOfItems + i, squares[this.numberOfItems - i -1]);
        }
    };


    SquaresGroup.prototype.moveSquareToLeft = function (i, square) {
        var self = this;
        setTimeout(function () {
            square.animate({
                'left': square.getLeft() - self.movePathLength
            }, {
                duration: self.animDuration,
                easing: fabric.util.ease.easeInOutExpo
            });
        }, i*(this.timeBeforeNextAnim + this.animDuration));
    };


    SquaresGroup.prototype.moveSquareToRight = function (i, square) {
        var self = this;
        setTimeout(function () {
            square.animate({
                'left': square.getLeft() + self.movePathLength
            }, {
                duration: self.animDuration,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function(){
                    if(i == 7 ){
                        $("body").trigger("animation-end")
                    }
                }
            });
        }, i*(this.timeBeforeNextAnim + this.animDuration));
    };


    SquaresGroup.prototype.slideToPosition = function (square, leftPos) {
        square.animate({
            'left': leftPos,
            'opacity': 1
        }, {
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
            onComplete: function () {

            }
        });
    };

    return SquaresGroup;

});