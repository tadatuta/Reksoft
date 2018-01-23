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

    var clientRightView = new ClientRightView();
    $("body").append(clientRightView.render().$el);
    //clientRightView.swiperInit();

    var spektrView = new SpektrView();
    $("body").append(spektrView.render().$el);
    spektrView.slickInit();

    var peopleView = new PeopleView();
    $("body").append(peopleView.render().$el);

    var reksoftAcademyView = new ReksoftAcademyView();
    $("body").append(reksoftAcademyView.render().$el);

    var findYourselfView = new FindYourselfView();
    $("body").append(findYourselfView.render().$el);

    $.scrollify({
        section: ".slideContainer",
        updateHash: false,
    });

});