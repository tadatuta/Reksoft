define([
    "backbone",
    "text!../find-yourself/template.html",
    "assets/js/animation/commonAnimation.js",
    "assets/js/reksoft-academy/arrow.js",
    'fabric',
    "assets/js/find-yourself/zigzag.js",
], function( Backbone, tpl, CommonAnimation, Arrow, fabric, Zigzag  ) {

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),
        className: "unit slideContainer",

        events: {
            "click #send": "send"
        },

        initialize : function( options ) {
        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );
            /*$('#name').focus(); // TODO подумать над нач. фокусом
            $('#name').blur(function () {
                $('#city').focus();
            });
            $('#city').blur(function () {
                $('#question').focus();
            });
            $('#question').blur(function () {
                $('#email').focus();
            });*/

            setTimeout(function(){
                $(".addFlashit5").addClass("flashit");
            }, 5000);

            return this;
        },

        setAnimation: function(arrowCanvas, zigzagCanvas){
            this.arrowCanvas = arrowCanvas;
            this.zigzagCanvas = zigzagCanvas;
            this.setNewCanvasSize();
            this.scaleIndex = CommonAnimation.setScaleIndexOnLoad(this.width);
            this.addArrows();
            this.addZigzag();
        },

        setNewCanvasSize: function () {
            this.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            this.arrowCanvas.setDimensions({
                width: this.width,
            });
        },

        addZigzag: function() {
            var zigzag = new Zigzag(this.zigzagCanvas);
        },

        addArrows: function () {
            var arrow1 = new Arrow({
                canvas: this.arrowCanvas,
                width: this.width,
                url: '../assets/img/u12_arrow.svg',
                imgScaleParam: 0.2,
                imgLeft: this.width * 0.4,
                imgTop: 65,
                animationSpeed: 160000,
                scaleIndex: this.scaleIndex,
                easing: CommonAnimation.linear,
                shouldCanvasRerenderOnChange: true,
                opacity: 0.5,
            });
            var arrow2 = new Arrow({
                canvas: this.arrowCanvas,
                width: this.width,
                url: '../assets/img/u12_arrow.svg',
                imgScaleParam: 0.2,
                imgLeft: this.width * 0.5,
                imgTop: 90,
                animationSpeed: 120000,
                scaleIndex: this.scaleIndex,
                easing: CommonAnimation.linear,
                shouldCanvasRerenderOnChange: true,
                opacity: 1,
            });
            var arrow3 = new Arrow({
                canvas: this.arrowCanvas,
                width: this.width,
                url: '../assets/img/u12_arrow.svg',
                imgScaleParam: 0.2,
                imgLeft: this.width * 0.7,
                imgTop: 75,
                animationSpeed: 180000,
                scaleIndex: this.scaleIndex,
                easing: CommonAnimation.linear,
                shouldCanvasRerenderOnChange: true,
                opacity: 0.7,
            });
        },

        send: function() {
            $.ajax({
                method: 'POST',
                url: '/send.php',
                data: {
                    name: $("#name"),
                    city: $("#city"),
                    question: $("#question"),
                    email: $("#email")
                },
                success: function(data) {
                    // console.log(data)
                }
            })
        }

    });

    return view;
});