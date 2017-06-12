define(["assets/js/initial-block/MovingCircle.js",
        "assets/js/initial-block/triangleCrossCircles.js",
        "assets/js/initial-block/sticksAroundCircle.js",
        "assets/js/initial-block/movingArc.js",
        "assets/js/initial-block/blinkingImg.js",
        "assets/js/initial-block/circulatingImg.js",
        "assets/js/initial-block/movingLittleCircle.js",
        "assets/js/initial-block/movingMouseCircle.js",
        "assets/js/initial-block/rotatingObject.js",
        "assets/js/initial-block/fullScreenLines.js",
        "assets/js/initial-block/leftCircles.js",
        "assets/js/initial-block/zigzags.js",
        "assets/js/initial-block/squaresGroup.js",
        "assets/js/initial-block/cloud.js",
        "assets/js/initial-block/rotatingImg.js"],
    function (MovingCircle, TriangleCrossCircles, SticksAroundCircle, MovingArc, BlinkingImg,
              CirculatingImg, MovingLittleCircle, MovingMouseCircle, RotatingObject, FullScreenLines, LeftCircles,
              Zigzags, SquaresGroup, Cloud, RotatingImg) {

        var ReksoftBlockDesigner = (function () {

            //var settings = {};
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
            var scaleIndex;
            var reksoftImgHeight;
            var planetSize = 26,
                totalPlanets = 3,
                rotationSpeed = 20000;
            var radiusPlus;
            var orbitRadiusBase;
            var reksoftImagePadding;
            var canvas;
			var paddingFromLogoToHorLine = 25;

            var init = function () {
                fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
                fabric.Object.prototype.objectCaching = false; //TURN OFF Cache!!!
                //fabric.Object.prototype.noScaleCache = true; //- не помогает
                canvas = this.__canvas = new fabric.StaticCanvas('c', { //StaticCanvas
                    selection: false
                });
                setScaleIndexOnLoad();
                evaluateScaleDependedVars();
                setNewCanvasSize();
                addLines();
                addlogo();
                addClounds();
                _bindUIEvents();
            };

            var _reinit = function () {
                if (!$("html").hasClass("tablet")) return;
                canvas.clear();
                setNewCanvasSize();
                setScaleIndexOrientationChange();
                evaluateScaleDependedVars();
                addlogo();
                addLines();
                addSquaresGroup();
            };

            var _bindUIEvents = function () {
                window.addEventListener('resize', function () {
                    //_reinit();
                });

                $(window).on("logo-loaded", function () {
                    setTimeout(function () {
                        drawCircles();
                        addLittleCirclesInCenter();
                        addSticksAroundCenterCircle();
                        addNoise();
                        addSquaresGroup();
                        addLeftCircles();
                        addRightCircle();
                        addLittleTopImg();
                        addZigzags();
                        addMountainCircles();
                        addIeroglifsLeft();
                        addIeroglifsRight();
                        addMouse();
                        if (getResolution() != "desktop_sm1") {
                            addTriangleCrossCircles();
                        }
                        setTimeout(function () {
                            addPlanets();
                        }, 1000);
                    }, 1000);

                });
            };

            var getResolution = function () {
                if (width >= 1280 && width < 1360) {
                    return "desktop_sm1";
				} else if (width >= 1360 && width <= 1600) {
					return "desktop_sm2";
				} else if (width > 1600 && width < 1920) {
					return "desktop_md1";
                } else if (width >= 1900 && width <= 2048) {
                    return "desktop_lg1";
                }  else if (width > 2048) {
					return "desktop_lg2";
				}
            };

			var setScaleIndexOnLoad = function () {
				var resolutionType = getResolution();

				if (resolutionType == "desktop_sm1" || resolutionType == "desktop_sm2") {
					scaleIndex = 0.75;
				} else if (resolutionType == "desktop_md1") {
					scaleIndex = 0.85;
				} else if (resolutionType == "desktop_lg1") {
					scaleIndex = 1;
				} else if (resolutionType == "desktop_lg2") {
					scaleIndex = 1.2;
				}
			};

            var evaluateScaleDependedVars = function () {
                var logoScaleIndex = 0.65;
                radiusPlus = 200 * scaleIndex;
                orbitRadiusBase = 75 * scaleIndex;
                reksoftImagePadding = 20 * scaleIndex;
                reksoftImgHeight = 240 * logoScaleIndex * scaleIndex;
            };

            var setNewCanvasSize = function () {
                width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
                /*var widthn = width;
                 var heightn = height;*/
                canvas.setDimensions({
                    width: width,
                    height: height
                });
            };

            var addLines = function () {
                var length = 900;
                var angle;
                var x1;
                var y1;
                var xIntersectionWithScreenTop;
                var duration = 450;

                var fullScreenLines = new FullScreenLines({
                    canvas: canvas,
                    width: width,
                    height: height,
                    duration: duration
                });

                fullScreenLines.drawAnimatedHorizontalLine(0, width, height / 2);

                setTimeout(function () {
                    angle = 125;
                    x1 = width / 2;
                    y1 = height / 2 - reksoftImagePadding - reksoftImgHeight - paddingFromLogoToHorLine * scaleIndex;
                    xIntersectionWithScreenTop = getLinesIntersectionByTwoCoord(x1, y1, x1 + length * Math.cos(Math.PI * angle / 180.0),
                        y1 + length * Math.sin(Math.PI * angle / 180.0), 0);
                    fullScreenLines.drawAnimatedDiagonalLine(angle, xIntersectionWithScreenTop, 0);
                }, duration - 200);

                setTimeout(function () {
                    angle = 57;
                    x1 = width / 2;
                    y1 = height / 2 - reksoftImagePadding - reksoftImgHeight - paddingFromLogoToHorLine * scaleIndex; // 10: paddings
                    xIntersectionWithScreenTop = getLinesIntersectionByTwoCoord(x1, y1, x1 + length * Math.cos(Math.PI * angle / 180.0),
                        y1 + length * Math.sin(Math.PI * angle / 180.0), 0);
                    fullScreenLines.drawAnimatedDiagonalLine(angle, xIntersectionWithScreenTop, 0);
                }, (duration - 200) * 2);

            };

            var addlogo = function () {
                setTimeout(function () {

                    fabric.loadSVGFromURL('../assets/img/Reksoft-logo.svg', function (objects, options) {
                        var logoScaleIndex = 0.65;
                        var logo = fabric.util.groupSVGElements(objects, options);
                        logo.scale(logoScaleIndex * scaleIndex);
                        var imgWidth = logo.width * logoScaleIndex * scaleIndex;
                        var imgHeight = logo.height * logoScaleIndex * scaleIndex;
                        var logoTop = height / 2 - reksoftImagePadding - imgHeight;

                        canvas.add(logo.set({
                            left: width / 2 - imgWidth / 2 - 2, //-2, тк неотцентрована немного картинка
                            top: logoTop - 40,
                            originX: "left",
                            originY: "top",
                            opacity: 0
                        }));

                        logo.animate({
                            'top': logoTop,
                            opacity: 1
                        }, {
                            duration: 450,
                            onChange: canvas.renderAll.bind(canvas)
                        });
                    });
                    $(window).trigger("logo-loaded");

                }, 1000);
            };

            var addNoise = function () {
                fabric.loadSVGFromURL('../assets/img/noise.svg', function (objects, options) {
                    var noise = fabric.util.groupSVGElements(objects, options);
                    var imgHeight = noise.height * 0.8 * scaleIndex;
                    noise.scale(0.8 * scaleIndex);
                    canvas.add(noise.set({
                        left: width / 2 - 400 * scaleIndex,
                        top: height / 2 - imgHeight / 2,
                        originX: "left",
                        originY: "top",
                        opacity: 0
                    }));

                    noise.animate('opacity', 1, {
                        duration: 1000,
                        easing: fabric.util.ease.easeInOutExpo,
                        onComplete: function () {
                        }
                    });

                });
            };

            var addLittleTopImg = function () {
                fabric.loadSVGFromURL('../assets/img/top-thing.svg', function (objects, options) {

                    var topImg = fabric.util.groupSVGElements(objects, options);
                    var imgHeight = topImg.height * 0.55 * scaleIndex;
                    topImg.scale(0.5 * scaleIndex);
                    canvas.add(topImg.set({
                        left: width / 2,
                        top: -imgHeight,
                        originX: "left",
                        originY: "top",
                        'opacity': 0
                    }));

                    topImg.animate({
                        'top': 0,
                        'opacity': 1
                    }, {
                        duration: 1000,
                        easing: fabric.util.ease.easeOutBounce,
                        onComplete: function () {
                        }
                    });

                });
            };

            var addMouse = function () {
                fabric.loadSVGFromURL('../assets/img/mouse.svg', function (objects, options) {
                    var mouse = fabric.util.groupSVGElements(objects, options);
                    var imgHeight = mouse.height;
                    //mouse.scale(0.55);
                    canvas.add(mouse.set({
                        left: width / 2,
                        top: height - 160 * scaleIndex,
                        originX: "center",
                        originY: "center"
                    }));
                });

                var movingMouseCircle = new MovingMouseCircle({
                    left: width / 2,
                    top: height - 155 * scaleIndex,
                    radius: 2,
                    fill: '#000',
                    index: 2,
                    originX: "center",
                    originY: "center"
                }, 500, 1000);
                canvas.add(movingMouseCircle);
                setTimeout(function () {
                    movingMouseCircle.animateTopAndBack();
                }, 2000);
            };

            var addLittleCirclesInCenter = function () {
                var def = new $.Deferred;
                var baseDelay = 15000; //время между началом движения обратно и повторного движения
                var delayAnimationOnStart = 5000;//после загрузки через 5с. начинается анимация
                var circle;
                //fabric.Image.fromURL('../assets/img/littleCenterCircle.svg', function (icircle) {
                fabric.loadSVGFromURL('../assets/img/littleCenterCircle.svg', function(objects, options) {
                    var icircle = fabric.util.groupSVGElements(objects, options);
                    icircle.scale(1.53 * scaleIndex);
                    circle = icircle;
                    def.resolve();
                });

                $.when(def).done(function () {
                    var circlesAr = [];
                    circlesAr.push(circle);
                    for (var i = 0; i < 4; i++) {
                        circlesAr.push(fabric.util.object.clone(circle));
                    }

                    var mLCircle = new MovingLittleCircle(canvas, width, height, circlesAr[0], 8, 0, baseDelay + 9000, baseDelay, reksoftImgHeight);
                    var mLCircle2 = new MovingLittleCircle(canvas, width, height, circlesAr[1], 16, 1000, baseDelay + 8000, baseDelay, reksoftImgHeight);
                    var mLCircle3 = new MovingLittleCircle(canvas, width, height, circlesAr[2], 24, 2000, baseDelay + 7000, baseDelay, reksoftImgHeight);
                    var mLCircle4 = new MovingLittleCircle(canvas, width, height, circlesAr[3], 32, 3000, baseDelay + 6000, baseDelay, reksoftImgHeight);
                    var mLCircle5 = new MovingLittleCircle(canvas, width, height, circlesAr[4], 40, 4000, baseDelay + 5000, baseDelay, reksoftImgHeight);

                    var mLCirclesAr = [];
                    mLCirclesAr.push(mLCircle, mLCircle2, mLCircle3, mLCircle4, mLCircle5);

                    setTimeout(function () {
                        animateLittleCircles(mLCirclesAr);
                    }, delayAnimationOnStart);

                    $(window).on("little-circles-restart-animation", function () {
                        animateLittleCircles(mLCirclesAr);
                    });
                });

                function animateLittleCircles(mLCirclesAr) {
                    mLCirclesAr[0].animate(1);
                    mLCirclesAr[1].animate();
                    mLCirclesAr[2].animate();
                    mLCirclesAr[3].animate();
                    mLCirclesAr[4].animate();
                }

            };

            var addIeroglifsLeft = function () {
                //x1,y1,x2,y2,yLine2
                var angle = 125;
                var length = 1;
                var x1 = width / 2;
                var y1 = height / 2 - reksoftImagePadding - reksoftImgHeight - paddingFromLogoToHorLine * scaleIndex;
                var x2 = x1 + length * Math.cos(Math.PI * angle / 180.0);
                var y2 = y1 + length * Math.sin(Math.PI * angle / 180.0);
                var xIntersection = getLinesIntersectionByTwoCoord(x1, y1, x2, y2, height - height / 3.3);
                var ierLeft = xIntersection + 10 * scaleIndex;
                var ierTop = height - height / 3.3;

                //fabric.Image.fromURL('../assets/img/ieroglifsBase.svg', function (img) {
                fabric.loadSVGFromURL('../assets/img/ieroglifsBase.svg', function(objects, options) {
                    var img = fabric.util.groupSVGElements(objects, options);
                    img.scale(0.8 * scaleIndex);
                    canvas.add(img.set({
                        left: ierLeft ,
                        top: ierTop,
                        originX: "left",
                        originY: "top",
                        opacity: 0,
						angle: (angle-90)
                    }));
                    //плавное появление
                    img.animate('opacity', 100, {
                        duration: 1000,
                        easing: fabric.util.ease.easeInOutExpo,
                        onComplete: function () {
                        }
                    });

                });

                var blinkingImg = new BlinkingImg(canvas, width, height, '../assets/img/ieroglifs1.svg', 4000, ierLeft, ierTop, scaleIndex, angle);
                var blinkingImg1 = new BlinkingImg(canvas, width, height, '../assets/img/ieroglifs3.svg', 5000, ierLeft, ierTop, scaleIndex, angle);
                var blinkingImg2 = new BlinkingImg(canvas, width, height, '../assets/img/ieroglifs4.svg', 7000, ierLeft, ierTop, scaleIndex, angle);
            };

            var addIeroglifsRight = function () {
                //x1,y1,x2,y2,yLine2
                var angle = 55;
                var length = 1;
                var x1 = width / 2;
                var y1 = height / 2 - reksoftImagePadding - reksoftImgHeight - paddingFromLogoToHorLine * scaleIndex;
                var x2 = x1 + length * Math.cos(Math.PI * angle / 180.0);
                var y2 = y1 + length * Math.sin(Math.PI * angle / 180.0);
                var xIntersection = getLinesIntersectionByTwoCoord(x1, y1, x2, y2, height - height / 3.4);
                var ierLeft = xIntersection - 15 * scaleIndex;
                var ierTop = height - height / 3.4;

                //fabric.Image.fromURL('../assets/img/ieroglifs2Base.svg', function (img) {
                fabric.loadSVGFromURL('../assets/img/ieroglifs2Base.svg', function(objects, options) {
                    var img = fabric.util.groupSVGElements(objects, options);
                    img.scale(0.8 * scaleIndex);
                    canvas.add(img.set({
                        left: ierLeft,
                        top: ierTop,
						originX: "left",
						originY: "top",
                        opacity: 0,
						angle: (angle-90)
                    }));
                    //плавное появление
                    img.animate('opacity', 100, {
                        duration: 1000,
                        easing: fabric.util.ease.easeInOutExpo,
                        onComplete: function () {
                        }
                    });

                });

                var blinkingImg = new BlinkingImg(canvas, width, height, '../assets/img/ieroglifs21.svg', 6000, ierLeft, ierTop, scaleIndex, angle);
            };

            var addMountainCircles = function () {
                var proportiponalParam = width / 1920;//1920 - ширина гор
                var proportionalHeight = 322 * proportiponalParam;
                var showTop = height - proportionalHeight / 2.5;

                var movingCircle1 = new MovingCircle({
                    left: width / 6.3,
                    top: height,
                    radius: 10 * scaleIndex,
                    fill: '#00C7C0',
                    index: 2,
                    opacity: 0.3
                }, showTop, canvas, scaleIndex, 0.7);
                canvas.add(movingCircle1);
                $.when(movingCircle1.slideToPosition()).done(function () {
                    movingCircle1.moveTop();
                });

                showTop = height - proportionalHeight / 4;
                var movingCircle2 = new MovingCircle({
                    left: width / 2.35,
                    top: height,
                    radius: 10 * scaleIndex,
                    fill: '#00C7C0',
                    index: 2,
                    opacity: 0.3
                }, showTop, canvas, scaleIndex, 0.4);
                canvas.add(movingCircle2);
                $.when(movingCircle2.slideToPosition()).done(function () {
                    movingCircle2.moveBack();
                });

                var movingCircle3 = new MovingCircle({
                    left: width / 1.7,
                    top: height,
                    radius: 30 * scaleIndex,
                    fill: '#00C7C0',
                    index: 2,
                    opacity: 0.3
                }, showTop, canvas, scaleIndex, 1);
                canvas.add(movingCircle3);
                $.when(movingCircle3.slideToPosition()).done(function () {
                    movingCircle3.moveTop();
                });

                var movingCircle4 = new MovingCircle({
                    left: width - width / 8,
                    top: height,
                    radius: 10 * scaleIndex,
                    fill: '#00C7C0',
                    index: 2,
                    opacity: 0.3
                }, showTop, canvas, scaleIndex, 0.8);
                canvas.add(movingCircle4);
                $.when(movingCircle4.slideToPosition()).done(function () {
                    movingCircle4.moveBack();
                });
            };

            var addSticksAroundCenterCircle = function () {
                var mscaleIndex = 0.65 * scaleIndex;
                fabric.loadSVGFromURL('../assets/img/aroundCircle0.svg', function(objects, options) {
                    var img = fabric.util.groupSVGElements(objects, options);
                    var imgWidth = img.width * mscaleIndex;
                    var imgHeight = img.height * mscaleIndex;
                    img.scale(mscaleIndex);
                    canvas.add(img.set({
                        left: width / 2,
                        top: height / 2 - reksoftImgHeight / 2,
                        originX: "center",
                        originY: "center",
                        opacity: 1
                    }));
                });
                var sticksAroundCircle = new SticksAroundCircle(canvas, width, height, '../assets/img/aroundCircle.svg', -15, 10, 15, 2000, mscaleIndex, reksoftImgHeight);
                var sticksAroundCircle2 = new SticksAroundCircle(canvas, width, height, '../assets/img/aroundCircle2.svg', 12, -5, -12, 2000, mscaleIndex, reksoftImgHeight);

                setTimeout(function () {
                    sticksAroundCircle.animateTwoDirection();
                    setTimeout(function () {
                        sticksAroundCircle2.animateTwoDirection();
                    }, 350);
                }, 6000);

            };

            var addTriangleCrossCircles = function () {
				var left = width / 2 + 390 * scaleIndex;
				var top = height / 2 + 20 * scaleIndex;
                var triangleCrossCircles = new TriangleCrossCircles(canvas, width, height, left, top, 0, 8000, true, scaleIndex);
                var triangleCrossCircles2 = new TriangleCrossCircles(canvas, width, height, left, top + 30* scaleIndex, 1, 21000, false, scaleIndex);
                var triangleCrossCircles3 = new TriangleCrossCircles(canvas, width, height, left, top + 60* scaleIndex, 2, 33000, true, scaleIndex);
                var triangleCrossCircles4 = new TriangleCrossCircles(canvas, width, height, left, top + 90* scaleIndex, 0, 25000, false, scaleIndex);
                var triangleCrossCircles5 = new TriangleCrossCircles(canvas, width, height, left, top + 120* scaleIndex, 1, 30000, true, scaleIndex);
            };

            var addSquaresGroup = function () {
                var squaresGroup = new SquaresGroup(canvas, width, height, scaleIndex);
            };

            var addLeftCircles = function () {
                var left = width / 20;
                var leftCircles = new LeftCircles(canvas, width, height, '../assets/img/circles-left.svg', left, scaleIndex);
            };

            var addRightCircle = function () {
                var left = width / 1.26;
				if(getResolution() != "desktop_sm1") {
					left = width / 1.23;
				}
                var top = height / 2 + 100 * scaleIndex;

                var rightCircle = new fabric.Circle({
                    radius: 120 * scaleIndex,
                    fill: '',
                    stroke: '#F1737A',
                    strokeWidth: 1,
                    top: top,
                    left: width,
                    opacity: 0
                });
                canvas.add(rightCircle);
                rightCircle.animate({
                    'left': left, //width - 400, //
                    'opacity': 0.5
                }, {
                    duration: 1000,
                    easing: fabric.util.ease.easeOutBounce,
                    onComplete: function () {
                        var circulatingImgs = new CirculatingImg(canvas, width, height, '../assets/img/arcRightCircle.svg',
                            '../assets/img/circleRightCircle.svg', left, top, scaleIndex);
                        setTimeout(function () {
                            circulatingImgs.animateCircle();
                        }, 4000);
                    }
                });

            };

            var addZigzags = function () {
                var zigzags = new Zigzags(canvas, width);
            };

            //lines intersection with y=0 (desktop top)
            //yLine2 - это уравнение прямой, с которой ищем пересечение (y=0 или y=240)
            var getLinesIntersectionByTwoCoord = function (x1, y1, x2, y2, yLine2) {
                var k = (y1 - y2) / (x1 - x2);
                var b = y2 - k * x2;
                return (-b + yLine2) / k;
            };

            var setScaleIndexOrientationChange = function () {
                //в этот момент еще старый класс ориентации
                if ($("html").hasClass("desktop") || ($("html").hasClass("tablet") && !$("html").hasClass("landscape"))) {
                    scaleIndex = 1;
                } else {
                    scaleIndex = 1.1;
                }
            };

            var addClounds = function () {
                var cloudL1 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_green1.svg',
                    imgScaleParam: 0.7,
                    imgLeft: 430,
                    imgTop: height * 0.1,
                    animationSpeed: 300000,
                    scaleIndex: scaleIndex,
                    linear: linear
                });
                var cloudL2 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_green2.svg',
                    imgScaleParam: 0.6,
                    imgLeft: 240,
                    imgTop: height * 0.2,
                    animationSpeed: 180000,
                    scaleIndex: scaleIndex,
                    linear: linear
                });
                var cloudL3 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_pale1.svg',
                    imgScaleParam: 0.7,
                    imgLeft: 220,
                    imgTop: height * 0.15,
                    animationSpeed: 500000,
                    scaleIndex: scaleIndex,
                    linear: linear
                });
                //right
                var cloudR1 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_pale1.svg',
                    imgScaleParam: 1.4,
                    imgLeft: width / 2 + 400,
                    imgTop: height * 0.15,
                    animationSpeed: 500000,
                    scaleIndex: scaleIndex,
                    linear: linear,
                    angle: -180
                });
                var cloudR2 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_pale1.svg',
                    imgScaleParam: 1.1,
                    imgLeft: width / 2 + 600,
                    imgTop: height * 0.1,
                    animationSpeed: 300000,
                    scaleIndex: scaleIndex,
                    linear: linear
                });
                var cloudR3 = new Cloud({
                    canvas: canvas,
                    width: width,
                    url: '../assets/img/cloud_green3.svg',
                    imgScaleParam: 0.6,
                    imgLeft: width / 2 + 700,
                    imgTop: height * 0.2,
                    animationSpeed: 180000,
                    scaleIndex: scaleIndex,
                    linear: linear
                });

                //addAnimatedCloud('../assets/img/cloud_green1.svg', 0.7, 130, height*0.1, 300000);
                //addAnimatedCloud('../assets/img/cloud_green2.svg', 0.6, 40, height*0.2, 180000);
                //addAnimatedCloud('../assets/img/cloud_pale1.svg', 0.7, 20, height*0.15, 500000);
                //right*/
                //addAnimatedCloud('../assets/img/cloud_pale1.svg', 1.4, width/2 + 200, height*0.15, 500000);
                //addAnimatedCloud('../assets/img/cloud_pale1.svg', 1.1, width/2 + 500, height*0.1, 300000);
                //addAnimatedCloud('../assets/img/cloud_green1.svg', 1.6, width/2 + 400, height*0.2, 180000);
            };

            var linear = function (t, b, c, d) {
                return c * t / d + b;
            };

            var drawArcs = function () {
                var movingArcBottom = new MovingArc({
                    radius: radiusPlus - 25,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2,
                    angle: 0,
                    startAngle: Math.PI * 50 / 180.0,
                    endAngle: Math.PI * 130 / 180.0,
                    stroke: '#FF8B8B',
                    strokeWidth: 1,
                    fill: '',
                    originX: 'center',
                    originY: 'center',
                    duration: 5000,
                    opacity: 0
                });
                canvas.add(movingArcBottom);
                movingArcBottom.animate('opacity', 0.5, {
                    duration: 1000,
                    easing: linear,
                    onComplete: function () {
                    }
                });
                movingArcBottom.animateTwoDirections();

                var movingArcBottom2 = new MovingArc({
                    radius: radiusPlus - 25,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2,
                    angle: 0,
                    startAngle: Math.PI * 160 / 180.0,
                    endAngle: Math.PI * 250 / 180.0,
                    stroke: '#FF8B8B',
                    strokeWidth: 1,
                    fill: '',
                    originX: 'center',
                    originY: 'center',
                    duration: 5000,
                    opacity: 0
                });
                canvas.add(movingArcBottom2);
                movingArcBottom2.animate('opacity', 0.5, {
                    duration: 1000,
                    easing: linear,
                    onComplete: function () {
                    }
                });
                movingArcBottom2.animateTwoDirections();

                var movingArcBottom3 = new MovingArc({
                    radius: radiusPlus - 25,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2,
                    angle: 0,
                    startAngle: Math.PI * 290 / 180.0,
                    endAngle: Math.PI * 20 / 180.0,
                    stroke: '#FF8B8B',
                    strokeWidth: 1,
                    fill: '',
                    originX: 'center',
                    originY: 'center',
                    duration: 5000,
                    opacity: 0
                });
                canvas.add(movingArcBottom3);
                movingArcBottom3.animate('opacity', 0.5, {
                    duration: 1000,
                    easing: linear,
                    onComplete: function () {
                    }
                });
                movingArcBottom3.animateTwoDirections();

            };

            var drawCircles = function () {
                //рисуем 4 орбиты
                for (var i = 1; i < 4; i++) {
                    createOrbit(i);
                }

                drawArcs();
            };

            var createOrbit = function (i) {
                var opacityL = [0, 0.5, 0.7, 1];
                //radiusPlus = 0;
                var orbit = new fabric.Circle({
                    radius: orbitRadiusBase * ( i * 0.5) + radiusPlus,
                    left: canvas.getWidth() / 2,
                    top: canvas.getHeight() / 2 - reksoftImgHeight / 2 - (orbitRadiusBase * (i * 0.5) + radiusPlus),
                    fill: '',
                    stroke: 'rgba(255,139,139, 0.9)',
                    hasBorders: false,
                    hasControls: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    index: i,
                    opacity: 0,
                    // originX: 'left',
                    originY: 'top'
                });
                canvas.add(orbit);

                orbit.animate('opacity', opacityL[i], {
                    duration: 1000,
                    easing: linear,
                    onComplete: function () {
                    }
                });
            };

            var addPlanets = function () {
                //var planet0;
                //var def = new $.Deferred;

                /*fabric.loadSVGFromURL('../assets/img/Reksoft-logo.svg', function (img, options) {
                    canvas.add(img.set({
                        left: left,
                        top: top,
                        originX: "center",
                        originY: "center",
                        opacity: 0
                    }));

                    //плавное появление
                    img.animate('opacity', 1, {
                        duration: 500,
                        easing: linear,
                        onComplete: function () {
                        }
                    });

                    self.rotate();
                });*/

                var planetLoader = new RotatingImg(
                    canvas,
                    (canvas.getWidth() / 2) - radiusPlus - (planetSize * 1),
                    canvas.getHeight() / 2,
                    linear, 3000);



                $.when(planetLoader.loadImg()).done(function () {
                    animatePlanet(planetLoader.getImg(), 1);
                });

                var planet1 = new fabric.Circle({
                    left: (canvas.getWidth() / 2) - radiusPlus - (planetSize * 1),
                    top: canvas.getHeight() / 2,
                    radius: 5,
                    fill: '#005C53',
                    index: 2,
                    opacity: 0
                });
                canvas.add(planet1);

                animatePlanet(planet1, 2);
                planet1.animate('opacity', 1, {
                    duration: 500,
                    easing: linear,
                    onComplete: function () {
                    }
                });

                var planet2 = new RotatingObject({
                    left: (canvas.getWidth() / 2) - radiusPlus - (planetSize * 1),
                    top: canvas.getHeight() / 2,
                    width: 14,
                    height: 14,
                    fill: '#025B56',
                    index: 3,
                    opacity: 0,
                    hasBorders: false,
                    hasControls: false
                }, linear, 2000);

                canvas.add(planet2);

                planet2.animate('opacity', 1, {
                    duration: 500,
                    easing: linear,
                    onComplete: function () {
                    }
                });
                animatePlanet(planet2, 3);
            };

            var animatePlanet = function (oImg, planetIndex) {
                var radius = (0.5 * planetIndex) * orbitRadiusBase + radiusPlus,
                // rotate around reksoft image center
                    cx = canvas.getWidth() / 2,
                    cy = canvas.getHeight() / 2 - reksoftImgHeight / 2,
                // speed of rotation slows down for further planets
                    duration = (planetIndex + 1) * rotationSpeed,
                // randomize starting angle to avoid planets starting on one line
                    startAngle = fabric.util.getRandomInt(-180, 0),
                    endAngle = startAngle + 359;
                (function animate() {
                    fabric.util.animate({
                        startValue: startAngle,
                        endValue: endAngle,
                        duration: duration,
                        // linear movement
                        easing: function (t, b, c, d) {
                            return c * t / d + b;
                        },
                        onChange: function (angle) {
                            angle = fabric.util.degreesToRadians(angle);
                            var x = cx + radius * Math.cos(angle);
                            var y = cy + radius * Math.sin(angle);
                            oImg.set({
                                left: x,
                                top: y
                            }).setCoords();
                            // only render once
                            if (planetIndex === totalPlanets - 1) {
                                canvas.renderAll();
                            }
                        },
                        onComplete: animate
                    });
                })();
            };

            return {
                init: init
            };

        })();

        return ReksoftBlockDesigner;

    });
