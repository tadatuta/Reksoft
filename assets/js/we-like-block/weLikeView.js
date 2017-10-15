define([
    "backbone",    
    "text!../we-like-block/template.html"
], function( Backbone, tpl ) {

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),
        className: "unit2",
        events : {
            /*'click .to-next-slide-text' : 'nextSlideClick',
            'click .next_slide_text' : 'nextSlideClick'*/
        },
        initialize : function( options ) {

        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );
            return this;
        }

    });

    return view;
});