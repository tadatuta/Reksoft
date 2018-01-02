define([
    "backbone",    
    "text!../our-client-right/template.html",
    "swiper",
    "device"
], function( Backbone, tpl, Swiper, device ) {
	
	var unit3DocWidth = $( document ).width();

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),
        className: "slideContainer",
        initialize : function( options ) {
        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );
            return this;
        },

        swiperInit : function(){
            if(device.desktop() && unit3DocWidth > 1260) {
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 3,
                    slidesPerColumn: 2,
                    paginationClickable: true,
                    spaceBetween: 65
                });
            } else if (device.desktop() && unit3DocWidth < 1260) {
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 2,
                    slidesPerColumn: 2,
                    paginationClickable: true,
                    spaceBetween: 25
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
        },

    });

    return view;
});