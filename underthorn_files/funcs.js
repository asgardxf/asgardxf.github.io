(function(){
	$.fn.filters = function(){
		return this.each(function(){
			$form = $(this);
			$form.find('.select').divSelect();
		});
	};
})(jQuery);

(function(){
 $.fn.divSelect = function(){
 
  return this.each(function(){
  
   $select = $(this);
   $options = $select.find('.options');
   $button = $select.find('.option-selected');
   
   var defValue = $select.find("select").val()*1;

   $button
    .on('click', function(){
    
     $select = $(this).parent().parent();
     $options = $select.find('.options');
     $button = $select.find('.option-selected');
     
     $button.toggleClass('active');
     $options.slideToggle();
    })
    .find('i').text(
     $select.find('.option[value="' + defValue + '"]').addClass('active').find('i').text() 
     || 
     $select.find('.option').eq( 0 ).addClass('active').find('i').text()
    )
    
   $select.find('.option').each(function(){
    
    $(this).on('click', function(){
     
     $select = $(this).parent().parent();
     
     $select.find('.option').removeClass('active');
     $(this).addClass('active');
     
     $button.find('i').text( $(this).find('i').text() );
     
     $select.find('select option').removeAttr('selected');
     var value = $select.find(".option.active").attr('value');
     $select.find('select').val( value );
     $select.find('select option[value="' + value + '"]').attr('selected', 'true');
     
     $select.find('.option-selected').click();
    });
   });
  });
 }
})(jQuery);


function changeQ(pid, value) {
	$(".pid-"+pid+" input").val(value);
}

function toCart( pid ) {
	$(".pid-"+pid+" a").eq(1).click();/*
	var q = $(".pid-"+pid+" input").val();
	
	var cq = $(".basket.block-head-4").text().slice(9, -1);
	
	$(".basket.block-head-4").text( "Корзина ("+(q*1+cq*1)+")" );*/
	setTimeout(function(){ window.location.reload(); },3000)
}



(function(){
	$.fn.openBigImage = function(){
		
		if ( $(".openBigPhoto-wrap").length == 0 )
			$('body').prepend('\
				<div class="openBigPhoto-wrap">\
					<div class="openBigPhoto-form">\
					</div>\
				</div>\
			')
			.parent()
				.on('mousemove', function( e ){
					e = e || window.event;
					window.mx = e.clientX;
					window.my = e.clientY;
				});
		
		return this.each(function(){
			
			$(this)
				.on('click', function(){
					
					$(".openBigPhoto-form").html('\
							\
							<div>\
								<img src="'+ $(this).attr('href') +'">\
							</div>\
							\
							')
						.parent()
							.on('click', function(){
								$(this).fadeOut();
							})
							.find('.openBigPhoto-form')
								.find('img')
									.on('load', function(){
									
										if ( $(this).height() > gwh()[1] )
											 $(this).height( gwh()[1]-30 );
										
										$(this).parent().css({
											'padding-top' :((gwh()[1] - $(this).height() )/2) + 'px'
										});
										
										$(this).fadeIn();
									});
					
					$(".openBigPhoto-wrap").fadeIn();
					
					return false;
				});
			
		});
	}
})(jQuery);
var isIE = aboutBrow().brow == 'IE';
//lovely prototypes
String.prototype.has = function(str){  return !!~this.indexOf(str)    }//return true, if String has str
//--------
function getScrollTop(){
  var a,html=document.getElementsByTagName('html')[0],body=document.body;
  if(window.pageXOffset!=undefined){a=pageYOffset;}
    else a=(html.scrollTop||body&&body.scrollTop||0)-html.clientTop;
    return a;}
function getXmlHttp(){
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
function JS_post(obj){
	var xmlhttp = getXmlHttp();
    xmlhttp.open('POST', obj.url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
    xmlhttp.send(obj.text); 
    xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) { 
			if(xmlhttp.status == 200) {
				obj.action(obj, xmlhttp.responseText );
			}
		}
	};
}	
function gwh(doc){
    doc = doc || document;
    var elem  = doc.compatMode == 'CSS1Compat' ? doc.documentElement : doc.body;
    return [elem.clientWidth, elem.clientHeight];
}

//--- jQuery $el.offset() analog
function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem)
    } else {
        return getOffsetSum(elem)
    }
}

function getOffsetSum(elem) {
    var top=0, left=0
    while(elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent
    }

    return {top: top, left: left}
}

function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect()
    var body = document.body
    var docElem = document.documentElement
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft

    return { top: Math.round(top), left: Math.round(left) }
}
//-----------
function addClass( div, className ){
	div.className = norm_space( remove_substrs_( div.className + " " + className,  className) );
}
function removeClass(div, className){
	div.className = norm_space(div.className.split(className).join(''));
}