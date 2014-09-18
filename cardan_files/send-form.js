;(function($){
	'use strict';
	
	$.fn.sendForm = function(callback) {
		
		return this.each(function() {
			
			$(this).on('submit', function() {
				
				var self = this;
				
				var data = {};
				
				$(this).find('.data, input, select, [name]').each(function() {
					
					var name = $(this).attr('name');
					var val = $(this).val();
					if ( $(this).attr('type') == 'checkbox' )
						val = (!!this.checked) +1;
					
					if ( $(this).attr('type') == 'radio' )
						val = $(self).find('[name="'+name+'"]:checked').val();
					
					data[ name ] = val;
				});
				
				$[$(this).attr('method')||'post']($(this).attr('action'), data, function(r) {
				
					callback.call(self, r);
				});
				
				return false;
			});
		});
	}
})(jQuery);