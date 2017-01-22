require( [ "bootstrap", "device", "fabric" ], function() {
    // Проверим подгрузилась ли вместе с "bootstrap" его зависимость - jQuery
    console.info( "jQuery exists: " + (typeof jQuery == "function" ? true : false ) );    
});


require( [ "initial-block/initialBlockVIew", "bootstrap" ], function( MainView ) {
    var mainView = new MainView();
    $("#content").append( mainView.render().$el );
});