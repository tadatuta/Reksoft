define([
    "backbone",    
    "text!../spektr/template.html", "slick"
], function( Backbone, tpl, slick ) {

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

        nextSlideClick : function(){
            if ($('.sl1').hasClass('slick-active') || $('.sl3').hasClass('slick-active')) {
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
            }

        },

        prevSlideClick : function(){
            //this.$('.single-item').slick('slickPrev');

            if ($('.sl2').hasClass('slick-active') || $('.sl4').hasClass('slick-active')) {
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
            }
        }

    });

    return view;
});