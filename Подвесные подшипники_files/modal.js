/*
	Modal window
		how to use:
		
		var md = new Modal({
			html : "<b> Hello world! </b>"
		}).show();
*/
;(function($) {
	"use strict";
	
	var currentId = 0;
	
	function Modal( settings ) {
		
		settings = settings || {};
		
		var mid =  typeof settings.id === 'number' || typeof settings.id === 'string' ?
						mid = settings.id
						: ++currentId;
						
		this.mid = mid;
		this.settings = settings;
		
		this.cssClass = "js " + (settings.cssClass || "");
		this.openTime = settings.openTime || 600;
		
		// добавление на страницу html окна
		this.create();
		this.html( settings.html || "" );
	}
	
	Modal.prototype = {
		
		create : function() {
			
			var selector = "#mid-"+this.mid;
			var selectorBack = ".modal-wrap-background[mid='" + this.mid + "']";
			
			// Модальное окно
			if ( $(selector).length == 0 )
				$('body')
					.prepend('\
						<div id="'+ "mid-" + this.mid +'" mid="'+ this.mid +'" class="modal-wrap '+ this.cssClass +' icloser">\
							<div class="modal-inner">\
								<table><tr><td>\
									<div class="modal-block">\
										<div class="modal-close icloser right no-select"></div>\
										<div clear></div>\
										<div class="my_inf">Ниже Вы можете оставить свои контактные данные и наш менеджер свяжется с Вами.</div>\
										<div class="modal-content"></div>\
									</div>\
								</td></tr></table>\
							</div>\
						</div>\
					');
			
			// Фон
			if ( $(selectorBack).length == 0 )
				$('body')
					.prepend('<div mid="'+ this.mid +'" class="modal-wrap-background"></div>');
			
			this.$ = $( selector );
			this.$back = $( selectorBack );
			
			this.setHandlers();
			
			return this;
		}
		
		, setHandlers : function() {
			
			var self = this;
			
			self.$
				.off('click')
				.on('click', function(e) {
					
					e = e || window.event;
					var targ = e.srcElement || e.target;
					
					if ( !$(targ).hasClass('icloser') )
						return;
					
					self.hide();
					return false;
				});
				
			self.$back
				.off('click')
				.on('click', function() {
					
					self.hide();
				});
		}
		
		, show : function( callback ) {
			this.$back.fadeIn( this.openTime );
			this.$.fadeIn( this.openTime, callback );
			
			return this;
		}
		
		, hide : function( callback ) {
			this.$back.fadeOut( this.openTime );
			this.$.fadeOut( this.openTime, callback );
			
			return this;
		}
		
		, remove : function() {
			this.$.remove();
			this.$back.remove();
		}
		
		, html : function( html ) {
		
			if ( html === undefined )
				return this.$.find('.modal-content').html();
				
			this.$.find('.modal-content').html(html);
			return this;
		}
	};
	
	window.Modal = Modal;
})(jQuery);