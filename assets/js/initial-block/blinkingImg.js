define([], function () {

	var BlinkingImg = function (canvas, width, height, src, intervalBeforeNextState, left, top) {
		this.intervalBeforeNextState = intervalBeforeNextState;
		this.canvas = canvas;
		var def = new $.Deferred;
		var self = this;

		fabric.Image.fromURL(src, function (img) {
			self.img = img;
			img.scale(0.8);
			def.resolve();

			canvas.add(img.set({
				left: left,
				top: top,
				originX: "center",
				originY: "center",
				opacity: 0
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