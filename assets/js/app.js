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
], function(
         MainView, 
         WeLikeView, 
         ClientRightView, 
         SpektrView,
         PeopleView,
         ReksoftAcademyView,
         FindYourselfView,
         fabric,
         scrollify
) {
    var mainView = new MainView();
    $("#firstSlide").append( mainView.render().$el );

    var weLikeView = new WeLikeView();
    $("body").append(weLikeView.render().$el);
    var weLikeCanvas = new fabric.StaticCanvas('weLikeCircle', {
        selection: false
    });
    weLikeView.setAnimation(weLikeCanvas);

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
    var reksoftAcademyCanvas = new fabric.StaticCanvas('academyArrows', {
        selection: false
    });
    reksoftAcademyView.setAnimation(reksoftAcademyCanvas);

    var findYourselfView = new FindYourselfView();
    $("body").append(findYourselfView.render().$el);
    if($("html").hasClass("desktop")) {
        var arrowCanvas = new fabric.StaticCanvas('findYourselfArrows', {
            selection: false
        });
        var zigzagCanvas = new fabric.StaticCanvas('findYourselfZigzag', {
            selection: false
        });
        findYourselfView.setAnimation(arrowCanvas, zigzagCanvas);
    }

    $.scrollify({
        section: ".slideContainer",
        // updateHash: false,
    });

});