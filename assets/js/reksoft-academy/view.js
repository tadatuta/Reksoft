define([
    "backbone",    
    "text!../reksoft-academy/template.html",
    "assets/js/animation/commonAnimation.js",
    "assets/js/reksoft-academy/arrow.js",
    'fabric',
], function( Backbone, tpl, CommonAnimation, Arrow, fabric ) {

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),
        className: "unit slideContainer",
        initialize : function( options ) {

        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );
            return this;
        },

        setAnimation: function(canvas){
            this.canvas = canvas;
            this.setNewCanvasSize();
            this.scaleIndex = CommonAnimation.setScaleIndexOnLoad(this.width);
            this.addArrows();
        },

        setNewCanvasSize: function () {
            this.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            this.canvas.setDimensions({
                width: this.width,
            });
        },

        addArrows: function () {
            var arrow1 = new Arrow({
                canvas: this.canvas,
                width: this.width,
                url: '../assets/img/u12_arrow.svg',
                imgScaleParam: 0.2,
                imgLeft: this.width*0.1,
                imgTop: 60,
                animationSpeed: 160000,
                scaleIndex: this.scaleIndex,
                easing: CommonAnimation.linear,
                shouldCanvasRerenderOnChange: true,
                opacity: 1,
            });
            var arrow2 = new Arrow({
                canvas: this.canvas,
                width: this.width,
                url: '../assets/img/u12_arrow.svg',
                imgScaleParam: 0.2,
                imgLeft: this.width*0.3,
                imgTop: 20,
                animationSpeed: 120000,
                scaleIndex: this.scaleIndex,
                easing: fabric.util.ease.easeInCirc,
                shouldCanvasRerenderOnChange: true,
                opacity: 0.5,
            });
            var arrow3 = new Arrow({
                canvas: this.canvas,
                width: this.width,
                url: '../assets/img/u12_arrow.svg',
                imgScaleParam: 0.2,
                imgLeft: this.width*0.4,
                imgTop: 80,
                animationSpeed: 180000,
                scaleIndex: this.scaleIndex,
                easing: CommonAnimation.linear,
                shouldCanvasRerenderOnChange: true,
                opacity: 0.7,
            });

        }

    });

    return view;
});