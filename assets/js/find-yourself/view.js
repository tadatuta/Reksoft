define([
    "backbone",    
    "text!../find-yourself/template.html"
], function( Backbone, tpl ) {

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),
        className: "unit",
        initialize : function( options ) {
        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );
            /*$('#name').focus(); // TODO подумать над нач. фокусом
            $('#name').blur(function () {
                $('#city').focus();
            });
            $('#city').blur(function () {
                $('#question').focus();
            });
            $('#question').blur(function () {
                $('#email').focus();
            });*/
            return this;
        }

    });

    return view;
});