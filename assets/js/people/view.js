define([
    "backbone",    
    "text!../people/template.html"
], function( Backbone, tpl ) {

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
        }

    });

    return view;
});