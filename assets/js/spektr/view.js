define([
    "backbone",    
    "text!../spektr/template.html", "slick"
], function( Backbone, tpl, slick ) {

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),
        events : {
            'click .to-next-slide-text' : 'nextSlideClick',
            'click .next_slide_text' : 'nextSlideClick'
        },
        initialize : function( options ) {

        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );
            setTimeout(function(){
                var windowHeight = $(window).height();
                this.$('.unit5').height(windowHeight);
                this.$('.single-item').slick({
                    dots: false,
                    infinite: false,
                    arrows: false,
                    slidesToShow: 1,
                    adaptiveHeight: true
                });
            }, 300);
            return this;
        },

        nextSlideClick : function(){
            this.$('.single-item').slick('slickNext');
        }

    });

    return view;
});