;(function(){
	
	function LayoutBlock (class_name) {
		this.container = document.getElementsByClassName(class_name)[0];
		this.containerWidth = this.container.clientWidth;
		this.blocks = this.container.getElementsByClassName('column');
		this.init();
	}
	
	LayoutBlock.prototype = {
		init: function () {
			this.setLayout();
			this.actions();
		},

		setLayout: function () {
			for(var i = 0; i < this.blocks.length; i++) {
				var elemWidth = this.blocks[i].clientWidth,
					elemLoffset = this.blocks[i].offsetLeft;
				if((elemLoffset + elemWidth) !== this.containerWidth) {
					this.blocks[i].style.marginRight = 20 + "px";
				}
			}
		},

		addEvent: function (elem, evType, fn) {
			if (elem.addEventListener) {
				elem.addEventListener(evType, fn, false);
			}
			else if (elem.attachEvent) {
				elem.attachEvent('on' + evType, fn);
			}
			else {
				elem['on' + evType] = fn;
			}
		},

		actions: function () {
			var self = this;
			self.addEvent(window, 'resize', function () {
				self.setLayout();
			}, false);
		}
	}
		
	function Slider (id, duration) {
		this.container = document.getElementById(id);
		this.containerWidth = this.container.clientWidth;
		this.controls = this.container.getElementsByClassName('slider-nav')[0];
		this.duration = duration;
		this.init();
	}

	Slider.prototype = {
		
		init: function () {
			this.wrapper = this.container.getElementsByClassName('slider-wrapper')[0];
			this.slides = this.container.getElementsByClassName('slide');	
			this.slidesContent =  this.container.getElementsByClassName('slide__content');
			this.btnPrev = this.container.getElementsByClassName('slider-prev')[0];
			this.btnNext = this.container.getElementsByClassName('slider-next')[0];
			this.index = 0;
			this.total = this.slides.length;
			
			for(var i = 0; i < this.slidesContent.length; i++) {
				if(i !== 0)
					this.slidesContent[i].style.bottom = "-500px";
			}
			this.controls.style.display = "block";
			this.setSlideWidth(this.containerWidth);
			this.action();
		},

		setSlideWidth: function (width) {
			for(var i = 0; i < this.slides.length; i++) {
				this.slides[i].style.width = width + "px";
			}
		},

		slideTo: function (index) {
			var currentSlide = this.slides[index];
        	this.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
			this.slidesContent[index].style.bottom = "0px";
		},

		addEvent: function (elem, evType, fn) {
			if (elem.addEventListener) {
				elem.addEventListener(evType, fn, false);
			}
			else if (elem.attachEvent) {
				elem.attachEvent('on' + evType, fn);
			}
			else {
				elem['on' + evType] = fn;
			}
		},

		action: function () {
			var self = this;
			this.addEvent(self.btnNext, "click", function () {
				self.slidesContent[self.index].style.bottom = "-500px";
				self.index++;
				if(self.index === self.total) {
					self.index = 0;
				}
				self.slideTo(self.index);
			}, false);
			
			this.addEvent(self.btnPrev, "click", function () {
				self.slidesContent[self.index].style.bottom = "-500px";
				self.index--;
				if(self.index === -1) {
					self.index = self.total - 1;
				}
				self.slideTo(self.index);
			}, false);

			this.addEvent(window, 'resize', function () {
				self.containerWidth = self.container.clientWidth;
				self.setSlideWidth(self.containerWidth);
				self.slideTo(self.index);
			}, false);
		}

	};

	var slider1 = new Slider ("main-slider", 9000);
	var slider2 = new Slider ("main-slider_2", 4000);
	var slider3 = new Slider ("main-slider_3", 5000);

})();