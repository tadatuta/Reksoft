define(['fabric'], function (fabric) {

	var BlinkingImg = function (canvas, width, height, src, intervalBeforeNextState, left, top, scaleIndex, angle, specScale) {
		this.intervalBeforeNextState = intervalBeforeNextState;
		this.canvas = canvas;
		var def = new $.Deferred;
		var self = this;
		if(!specScale) specScale = 0.8;

		fabric.loadSVGFromURL(src, function(objects, options) {
			var img = fabric.util.groupSVGElements(objects, options);
			self.img = img;
			img.scale(specScale * scaleIndex);
			def.resolve();

			canvas.add(img.set({
				left: left,
				top: top,
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

		$.when(def).done(function () {
			self.addBlinking();
		});
	};

    BlinkingImg.prototype.reinit = function (left, top) {
        this.img && this.img.set({
            left: left,
            top: top,
		});
	};

	BlinkingImg.prototype.addBlinking = function () {
		//var blinkDuration = 40;
		var self = this;

		setTimeout(function () {
			self.addOneBlink();

			setTimeout(function () {
				self.addOneBlink(true);
			}, 300 ); //150 чтоб видно было 2 мигания

		}, self.intervalBeforeNextState);
	};

	BlinkingImg.prototype.addOneBlink = function (doRepeat) {
		var blinkDuration = 10;
		var self = this;

		this.img.animate('opacity', 0, {
			duration: blinkDuration,
			easing: fabric.util.ease.easeInOutQuad,
			onChange: function () {
				self.canvas.renderAll();
			}
		});

		setTimeout(function () {
			self.img.animate('opacity', 1, {
				duration: blinkDuration,
				easing: fabric.util.ease.easeInOutQuad,
				onChange: function () {
					self.canvas.renderAll();
				},
				onComplete: function () {
					if (doRepeat) self.addBlinking();
				}
			});
		}, 50 );
	};

	return BlinkingImg;

});