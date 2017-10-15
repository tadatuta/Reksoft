define([
    "backbone",    
    "text!../our-client-right/template.html",
    "swiper",
    "device"
], function( Backbone, tpl, Swiper, device ) {

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),

        initialize : function( options ) {

        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );
            var windowWidth = window.innerWidth;
            setTimeout(function(){
                if(device.desktop()) {
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 3,
                        slidesPerColumn: 2,
                        paginationClickable: true,
                        spaceBetween: 65
                    });
                } else if (device.tablet()) {
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 2,
                        slidesPerColumn: 2,
                        paginationClickable: true,
                        spaceBetween: 25
                    });
                } else {
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        paginationClickable: true,
                        spaceBetween: 10
                    });
                }
            }, 300);

            return this;
        }

    });

    return view;
});