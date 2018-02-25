define([
    "backbone",    
    "text!../spektr/template.html", "slick", "../animation/commonAnimation", "../find-yourself/zigzag"
], function( Backbone, tpl, slick, CommonAnimation, Zigzag ) {

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),
        className: "slideContainer",
        events : {
            'click .to-next-slide-text' : 'nextSlideClick',
            'click .next_slide_text' : 'nextSlideClick',
            'click .prev_slide_text' : 'prevSlideClick'
        },
        initialize : function( options ) {

        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );
            return this;
        },

        slickInit: function(){
            var windowHeight = $(window).height();
            this.$('.unit5').height(windowHeight);
            this.$('.single-item').slick({
                dots: false,
                infinite: false,
                arrows: false,
                slidesToShow: 1,
                adaptiveHeight: true
            });
        },

        addZigzag: function() {
            var zigzag = new Zigzag(this.zigzagCanvas);
        },

        setAnimation: function(zigzagCanvas){
            this.zigzagCanvas = zigzagCanvas;
            this.scaleIndex = CommonAnimation.setScaleIndexOnLoad(this.width);
            this.addZigzag();
        },

        nextSlideClick : function(){
            /*if ($('.sl1').hasClass('slick-active') || $('.sl3').hasClass('slick-active')) {
                $('.bg-trans-animation-1').show();
                $('.bg-trans-animation-2').hide();
                $('.bg-trans-animation-3').hide();
                $('.bg-trans-animation-4').hide();
                $('.bg-trans-animation-1').addClass('about-active-right');
                setTimeout(function() {
                    this.$('.single-item').slick('slickNext');

                    setTimeout(function() {
                        $('.bg-trans-animation-1').removeClass('about-active-right');
                    }, 300);
                }, 300);
            } else if ($('.sl2').hasClass('slick-active')) {
                $('.bg-trans-animation-1').hide();
                $('.bg-trans-animation-2').show();
                $('.bg-trans-animation-3').hide();
                $('.bg-trans-animation-4').hide();
                $('.bg-trans-animation-2').addClass('about-active-right');
                setTimeout(function() {
                    this.$('.single-item').slick('slickNext');

                    setTimeout(function() {
                        $('.bg-trans-animation-2').removeClass('about-active-right');
                    }, 300);
                }, 300);
            }*/

            if (device.desktop()) {
                if ($('.sl1').hasClass('slick-active')) {
                    var sl2RightBlockWidth = $('.sl2 .right-info-block').width();
                    this.$('.single-item').slick('slickNext');
                    $('.sl2').css('background','#e20c18');
                    $('.sl2 .right-info-block').css('margin-right','-' + sl2RightBlockWidth+'px');
                    setTimeout(function() {
                        $('.sl2 .right-info-block').addClass('activated');
                    }, 500);
                } else if ($('.sl2').hasClass('slick-active')) {
                    var sl3RightBlockWidth = $('.sl3 .right-info-block').width();
                    this.$('.single-item').slick('slickNext');
                    $('.sl3').css('background','#efefef');
                    $('.sl3 .right-info-block').css('margin-right','-' + sl3RightBlockWidth+'px');
                    setTimeout(function() {
                        $('.sl3 .right-info-block').addClass('activated');
                        $('.sl2 .left-info-block').removeClass('activated');
                    }, 500);
                } else if ($('.sl3').hasClass('slick-active')) {
                    var sl4RightBlockWidth = $('.sl4 .right-info-block').width();
                    this.$('.single-item').slick('slickNext');
                    $('.sl4').css('background','#e20c18');
                    $('.sl4 .right-info-block').css('margin-right','-' + sl4RightBlockWidth+'px');
                    setTimeout(function() {
                        $('.sl4 .right-info-block').addClass('activated');
                        $('.sl3 .left-info-block').removeClass('activated');
                    }, 500);
                } else if ($('.sl4').hasClass('slick-active')) {
                    var sl5RightBlockWidth = $('.sl5 .right-info-block').width();
                    this.$('.single-item').slick('slickNext');
                    $('.sl5').css('background','#efefef');
                    $('.sl5 .right-info-block').css('margin-right','-' + sl5RightBlockWidth+'px');
                    setTimeout(function() {
                        $('.sl5 .right-info-block').addClass('activated');
                        $('.sl4 .left-info-block').removeClass('activated');
                    }, 500);
                }
            } else {
                this.$('.single-item').slick('slickNext');
            }

            //this.$('.single-item').slick('slickNext');

        },

        prevSlideClick : function(){
            //this.$('.single-item').slick('slickPrev');

            if (device.desktop()) {
                if ($('.sl3').hasClass('slick-active')) {
                    var sl2LeftBlockWidth = $('.sl2 .left-info-block').width();
                    this.$('.single-item').slick('slickPrev');
                    $('.sl2').css('background','#efefef');
                    $('.sl2 .left-info-block').css('margin-left','-' + sl2LeftBlockWidth+'px');
                    setTimeout(function() {
                        $('.sl2 .left-info-block').addClass('activated');
                        $('.sl3 .right-info-block').removeClass('activated');
                    }, 500);
                } else if ($('.sl4').hasClass('slick-active')) {
                    var sl3LeftBlockWidth = $('.sl3 .left-info-block').width();
                    this.$('.single-item').slick('slickPrev');
                    $('.sl3').css('background','#e20c18');
                    $('.sl3 .left-info-block').css('margin-left','-' + sl3LeftBlockWidth+'px');
                    setTimeout(function() {
                        $('.sl3 .left-info-block').addClass('activated');
                        $('.sl4 .right-info-block').removeClass('activated');
                    }, 500);
                } else if ($('.sl2').hasClass('slick-active')) {
                    this.$('.single-item').slick('slickPrev');
                    $('.sl2 .right-info-block').removeClass('activated');
                }
            } else {
                this.$('.single-item').slick('slickPrev');
            }


        }

    });

    return view;
});