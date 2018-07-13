define([
    "backbone",    
    "text!../our-client-right/template.html",
    ], function( Backbone, tpl ) {
	
    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),
        className: "slideContainer unt3",
        initialize : function( options ) {
        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );

            setTimeout(function(){
                $(".addFlashit5").addClass("flashit");
            }, 5000);

            setTimeout(function(){
                $(".addFlashit12").addClass("flashit");
            }, 12000);

            return this;
        },

    });

    return view;
});