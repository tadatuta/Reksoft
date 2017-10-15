define(['fabric'], function (fabric) {

	var RotatingObject = fabric.util.createClass(fabric.Rect, {
		initialize: function (initObj, linearEasing, duration) {
			this.callSuper('initialize', initObj);
			this.linear = linearEasing;
			this.duration = duration;
			this.rotate();
		},
		toString: function () {
			//return this.callSuper('toString') + ' (color: ' + this.color + ')';
		},
		rotate: function () {
			var self=this;
			this.animate('angle', "=720", {
				duration: this.duration*2,
				easing: this.linear,
				onComplete: function () {
					self.rotate()
				}
			});
		}
	});

	return RotatingObject;

});