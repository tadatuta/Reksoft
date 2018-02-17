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

            if ($('.sl1').hasClass('slick-active')) {
                $('.sl1 .white-bg').addClass('activated');

                setTimeout(function() {
                    this.$('.single-item').slick('slickNext');

                    setTimeout(function() {
                        $('.sl1 .white-bg').removeClass('activated');
                    }, 500);
                }, 500);
            } else if ($('.sl2').hasClass('slick-active')) {
                $('.sl2 .white-bg').addClass('activated');

                setTimeout(function() {
                    this.$('.single-item').slick('slickNext');

                    setTimeout(function() {
                        $('.sl2 .white-bg').removeClass('activated');
                    }, 500);
                }, 500);
            } else if ($('.sl3').hasClass('slick-active')) {
                $('.sl3 .white-bg').addClass('activated');

                setTimeout(function() {
                    this.$('.single-item').slick('slickNext');

                    setTimeout(function() {
                        $('.sl3 .white-bg').removeClass('activated');
                    }, 500);
                }, 500);
            }  else if ($('.sl4').hasClass('slick-active')) {
                $('.sl4 .white-bg').addClass('activated');

                setTimeout(function() {
                    this.$('.single-item').slick('slickNext');

                    setTimeout(function() {
                        $('.sl4 .white-bg').removeClass('activated');
                    }, 500);
                }, 500);
            }

        },

        prevSlideClick : function(){
            //this.$('.single-item').slick('slickPrev');

            /*if ($('.sl2').hasClass('slick-active') || $('.sl4').hasClass('slick-active')) {
                $('.bg-trans-animation-3').hide();
                $('.bg-trans-animation-2').hide();
                $('.bg-trans-animation-1').hide();
                $('.bg-trans-animation-4').show().addClass('a-about-active-left');
                //$('.bg-trans-animation-4');
                setTimeout(function() {
                    this.$('.single-item').slick('slickPrev');

                    setTimeout(function() {
                        $('.bg-trans-animation-4').removeClass('a-about-active-left');
                    }, 300);
                }, 300);
            } else if ($('.sl3').hasClass('slick-active')) {
                $('.bg-trans-animation-4').hide();
                $('.bg-trans-animation-2').hide();
                $('.bg-trans-animation-1').hide();
                $('.bg-trans-animation-3').show().addClass('a-about-active-left');
                //$('.bg-trans-animation-4');
                setTimeout(function() {
                    this.$('.single-item').slick('slickPrev');

                    setTimeout(function() {
                        $('.bg-trans-animation-3').removeClass('a-about-active-left');
                    }, 300);
                }, 300);
            }*/

            if ($('.sl1').hasClass('slick-active')) {
                $('.sl1 .white-bg').addClass('activated');

                setTimeout(function() {
                    this.$('.single-item').slick('slickPrev');

                    setTimeout(function() {
                        $('.sl1 .white-bg').removeClass('activated');
                    }, 500);
                }, 500);
            } else if ($('.sl2').hasClass('slick-active')) {
                $('.sl2 .white-bg').addClass('activated');

                setTimeout(function() {
                    this.$('.single-item').slick('slickPrev');

                    setTimeout(function() {
                        $('.sl2 .white-bg').removeClass('activated');
                    }, 500);
                }, 500);
            } else if ($('.sl3').hasClass('slick-active')) {
                $('.sl3 .white-bg').addClass('activated');

                setTimeout(function() {
                    this.$('.single-item').slick('slickPrev');

                    setTimeout(function() {
                        $('.sl3 .white-bg').removeClass('activated');
                    }, 500);
                }, 500);
            }  else if ($('.sl4').hasClass('slick-active')) {
                $('.sl4 .white-bg').addClass('activated');

                setTimeout(function() {
                    this.$('.single-item').slick('slickPrev');

                    setTimeout(function() {
                        $('.sl4 .white-bg').removeClass('activated');
                    }, 500);
                }, 500);
            }
        }

    });

    return view;
});