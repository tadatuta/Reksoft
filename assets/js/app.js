require( [ "bootstrap", "device", "fabric" ], function() {
    // Проверим подгрузилась ли вместе с "bootstrap" его зависимость - jQuery
    // console.info( "jQuery exists: " + (typeof jQuery == "function" ? true : false ) );    
});


require( [ "initial-block/initialBlockVIew", 
          "we-like-block/weLikeView", 
          "our-client-right/view", 
          "spektr/view", 
          "people/view", 
          "find-yourself/view", 
          "bootstrap" ], function( 
         MainView, 
         WeLikeView, 
         ClientRightView, 
         SpektrView,
         PeopleView,
         FindYourselfView) {
    var mainView = new MainView();
    $("#content").append( mainView.render().$el );
    
    var weLikeView = new WeLikeView();
    $("body").append( weLikeView.render().$el ); 
    
    var clientRightView = new ClientRightView();
    $("body").append( clientRightView.render().$el ); 
    
    var spektrView = new SpektrView();
    $("body").append( spektrView.render().$el ); 
    
    var peopleView = new PeopleView();
    $("body").append( peopleView.render().$el );
    
    var findYourselfView = new FindYourselfView();
    $("body").append( findYourselfView.render().$el );
    
});