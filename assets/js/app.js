require( [
    "initial-block/initialBlockVIew",
    "we-like-block/weLikeView",
    "our-client-right/view",
    "spektr/view",
    "people/view",
    "reksoft-academy/view",
    "find-yourself/view",
    'fabric',
    'scrollify',
    "device"
], function(
         MainView, 
         WeLikeView, 
         ClientRightView, 
         SpektrView,
         PeopleView,
         ReksoftAcademyView,
         FindYourselfView,
         fabric,
         scrollify,
         device
) {
    var mainView = new MainView();
    $("#firstSlide").append( mainView.render().$el );

    var weLikeView = new WeLikeView();
    $("body").append(weLikeView.render().$el);
    var weLikeCanvas = new fabric.StaticCanvas('arcRightCircle', {
        selection: false
    });
    weLikeView.setCircleAnimation(weLikeCanvas);
    var weLikeCanvas2 = new fabric.StaticCanvas('triangleCrossCircle', {
        selection: false
    });
    weLikeView.setTriangleCrossCircleAnimation(weLikeCanvas2);

    var spektrView = new SpektrView();
    $("body").append(spektrView.render().$el);
    spektrView.slickInit();
    if($("html").hasClass("desktop")) {
        var historyZigzagCanvas = new fabric.StaticCanvas('zigzag', {
            selection: false
        });
        spektrView.setAnimation(historyZigzagCanvas);
    }

    var clientRightView = new ClientRightView();
    $("body").append(clientRightView.render().$el);

    var peopleView = new PeopleView();
    $("body").append(peopleView.render().$el);

    var reksoftAcademyView = new ReksoftAcademyView();
    $("body").append(reksoftAcademyView.render().$el);

    var findYourselfView = new FindYourselfView();
    $("body").append(findYourselfView.render().$el);
    if($("html").hasClass("desktop")) {
        var zigzagCanvas = new fabric.StaticCanvas('findYourselfZigzag', {
            selection: false
        });
        findYourselfView.setAnimation(zigzagCanvas);
    }
    if($("html").hasClass("mobile")) {
        $(".unit7 .void-arrow-1, .unit7 .void-arrow-2, .unit7 .void-arrow-3").hide();
    }

    var scrollifyTimeout = 0;
    if($("html").hasClass("mobile")) {
        scrollifyTimeout = 0;
    }
    //setTimeout(function() { // чтоб не было "лишней высоты"
        $.scrollify({
            section: ".slideContainer",
            after:function() {
                var curslide = $.scrollify.current();
                curslide = curslide[0].baseURI;
                ga('send', {
                    hitType: 'event',
                    'eventCategory': 'Recognition',
                    'eventAction': 'Move_To_Slide',
                    'eventLabel': 'CURRENT_SLIDE_NUMBER:' + curslide.slice(-1)
                });
            }
        });

      grecaptcha.render("recaptcha", {
        sitekey: '6Le_dmMUAAAAAOXUeBl2RNw0ZsYRm4hVfUclm9VT',
        callback: function() {
          // console.log('recaptcha initialized');
        }
      });

    //}, scrollifyTimeout)

});