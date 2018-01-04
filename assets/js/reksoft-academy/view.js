define([
    "backbone",    
    "text!../reksoft-academy/template.html"
], function( Backbone, tpl ) {

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
        }

    });

    return view;
});