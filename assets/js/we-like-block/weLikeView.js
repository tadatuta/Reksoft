define([
    "backbone",    
    "text!../we-like-block/template.html",
    'fabric',
    "../initial-block/circulatingImg",
    "../initial-block/cloud",
    "../initial-block/triangleCrossCircles",
    "../animation/commonAnimation"
], function( Backbone, tpl, fabric, CirculatingImg, Cloud, TriangleCrossCircles, CommonAnimation ) {

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),
        className: "unit slideContainer",
        events : {
            'click #s7' : 'scrollToSection',
            'click #s6' : 'scrollToSection',
        },
        initialize : function( options ) {},

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );
            return this;
        },

        scrollToSection: function(evt){
            evt.preventDefault();
            var sectionId = $(evt.currentTarget)[0].id.replace('s', '');
            $.scrollify.move("#"+sectionId);
        },

        setAnimation: function(canvas){
            this.canvas = canvas;
            this.setNewCanvasSize();
            this.scaleIndex = CommonAnimation.setScaleIndexOnLoad(this.width);
            this.addClounds();
            this.addRightCircle();
            this.addTriangleCrossCircles();
        },

        addRightCircle: function () {
            var circleRadius = 120;
            var left = circleRadius + this.width - this.width / 6;
            var top = circleRadius + 40;
            var scaleIndex = 1;
            var self = this;

            var rightCircle = new fabric.Circle({
                radius: circleRadius,
                fill: '',
                stroke: '#F1737A',
                strokeWidth: 1,
                top: circleRadius + 40,
                left: left,
                opacity: 0
            });
            this.canvas.add(rightCircle);

            rightCircle.animate({
                'opacity': 0.5
            }, {
                duration: 1000,
                easing: fabric.util.ease.easeOutBounce,
                onComplete: function () {
                    var circulatingImgs = new CirculatingImg(self.canvas, '../assets/img/arcRightCircle.svg',
                        '../assets/img/circleRightCircle.svg', left, top, scaleIndex);
                    $.when(circulatingImgs.loadCircle(), circulatingImgs.loadArc()).done(function () {
                        setTimeout(function () {
                            circulatingImgs.animateCircle();
                        }, 4000);
                    });
                }
            });
        },

        setNewCanvasSize: function () {
            this.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            this.height = (window.innerHeight > 0) ? window.innerHeight * 0.5 : screen.height * 0.5;
            this.canvas.setDimensions({
                width: this.width,
                height: this.height
            });
        },

        addClounds: function () {
            var cloudL1 = new Cloud({
                canvas: this.canvas,
                width: this.width,
                url: '../assets/img/cloud_green1.svg',
                imgScaleParam: 0.7,
                imgLeft: 430,
                imgTop: this.height * 0.6,
                animationSpeed: 300000,
                scaleIndex: this.scaleIndex,
                linear: CommonAnimation.linear,
                shouldCanvasRerenderOnChange: true
            });
            var cloudR1 = new Cloud({
                canvas: this.canvas,
                width: this.width,
                url: '../assets/img/cloud_green2.svg',
                imgScaleParam: 1.4,
                imgLeft: this.width / 2 + 400,
                imgTop: this.height * 0.8,
                animationSpeed: 500000,
                scaleIndex: this.scaleIndex,
                linear: CommonAnimation.linear,
                angle: -180,
                shouldCanvasRerenderOnChange: true
            });
        },

        addTriangleCrossCircles: function () {
            var left = this.width - this.width / 4.5;
            var top = this.height / 1.8;
            var triangleCrossCircles = new TriangleCrossCircles(this.canvas, this.width, this.height, left, top, 0, 8000, true, this.scaleIndex*0.8);
            var triangleCrossCircles2 = new TriangleCrossCircles(this.canvas, this.width, this.height, left, top + 30* this.scaleIndex, 1, 21000, false, this.scaleIndex*0.8);
            var triangleCrossCircles3 = new TriangleCrossCircles(this.canvas, this.width, this.height, left, top + 60* this.scaleIndex, 2, 33000, true, this.scaleIndex*0.8);
            var triangleCrossCircles4 = new TriangleCrossCircles(this.canvas, this.width, this.height, left, top + 90* this.scaleIndex, 0, 25000, false, this.scaleIndex*0.8);
            var triangleCrossCircles5 = new TriangleCrossCircles(this.canvas, this.width, this.height, left, top + 120* this.scaleIndex, 1, 30000, true, this.scaleIndex*0.8);
        },

    });

    return view;
});