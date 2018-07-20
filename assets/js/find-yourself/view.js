define([
    "backbone",
    "text!../find-yourself/template.html",
    "../find-yourself/zigzag",
], function( Backbone, tpl, Zigzag  ) {

    var view = Backbone.View.extend({
        // Кэшируем html-шаблон
        template : _.template( tpl ),
        className: "unit unit7Block slideContainer",

        events: {
            "click #send": "send",
            "click .privat-checkbox": "allowSend"
        },

        initialize : function( options ) {
        },

        render : function() {
            // Отключаем привязанные события, очищаем элемент и добавляем в верстку шаблон
            this.$el.empty().append( this.template() );

            setTimeout(function(){
                $(".addFlashit5").addClass("flashit");
            }, 5000);

            return this;
        },

        setAnimation: function(zigzagCanvas){
            this.zigzagCanvas = zigzagCanvas;
            this.addZigzag();
        },

        addZigzag: function() {
            var zigzag = new Zigzag(this.zigzagCanvas);
        },

        isValidEmail: function(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        allowSend: function() {
            if ($("#form_field_checkbox:checked").length > 0) {
                $(".form_submit").addClass('disabled').prop('disabled', true);
                $('html, body').animate({
                    scrollTop: $("#question").offset().top
                }, 1000);
            } else {
                $(".form_submit").removeClass('disabled').prop('disabled', false);
                $('html, body').animate({
                    scrollTop: $("#question").offset().top
                }, 1000);
            }
        },

        send: function() {
            $("#sendResult, #emailValidation, #сheckboxValidation, #questionValidation").text("");
            if($("#question").val().length < 10) {
                $("#questionValidation").text("Обязательное поле");
                $('html, body').animate({
                    scrollTop: $("#question").offset().top
                }, 1000);
                return;
            } else {
                $("#questionValidation").text("");
            }
            if(!$("#email").val().trim().length) {
                $("#emailValidation").text("Обязательное поле");
                $('html, body').animate({
                    scrollTop: $("#email").offset().top
                }, 1000);
                return;
            } else {
                $("#emailValidation").text("");
            }
            if(!this.isValidEmail($("#email").val().trim())) {
                $("#emailValidation").text("Email введен неверно");
                $('html, body').animate({
                    scrollTop: $("#email").offset().top
                }, 1000);
                return;
            } else {
                $("#emailValidation").text("");
            }
            if(!$("#form_field_checkbox").is(':checked')) {
                $("#сheckboxValidation").text("Согласие обязательно");
                $('html, body').animate({
                    scrollTop: $("#email").offset().top
                }, 1000);
                return;
            } else {
                $("#сheckboxValidation").text("");
            }
            $.ajax({
                method: 'POST',
                url: '/send.php',
                data: {
                    name: $("#name").val(),
                    city: $("#city").val(),
                    question: $("#question").val(),
                    email: $("#email").val().trim(),
                    "g-recaptcha-response": grecaptcha.getResponse(),
                },
                success: function(data) {
                    var dataObj = JSON.parse(data);
                    if(dataObj.status === 'success') {
                      $("#name, #city, #question, #email").val('');
                      $("#sendResult").text("Отправлено!");
                      grecaptcha.reset();
                    } else {
                      $("#sendResult").text("Подтвердите, что вы не робот");
                    }
                },
                error: function(){
                    $("#sendResult").text("Сбой при отправке, повторите попытку позже");
                }
            })
        }

    });

    return view;
});