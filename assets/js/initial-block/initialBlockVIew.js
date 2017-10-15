define([
    "backbone",    
    "text!../initial-block/initialBlockTemplate.html",
    "initial-block/ReksoftBlockDesigner",
    "fabric"
], function( Backbone, tpl, ReksoftBlockDesigner, fabric ) {

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),

        initialize : function( options ) {

        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );

            ReksoftBlockDesigner.init();
            return this;
        }

    });

    return view;
});