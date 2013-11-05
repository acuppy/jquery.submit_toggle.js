(function($){

  $.fn.submitToggle = function(options){
    
    return this.each(function(){

      options = $.extend({
        form:            'form',
        waitForAjax:     false,
        onEnable:        $.noop,
        onDisable:       $.noop,
        onToggle:        $.noop,
        disableText: null
      }, options)

      var $submitButton = $(this).addClass('submitToggleEnabled')

      $submitButton.on('click', function(){
        toggleToDisabled()
        $submitButton.closest(options.form).submit();
      });

      if(options.waitForAjax === true){
        $(document).ajaxComplete(function(){
          toggleToEnabled()
        });
      }

      function toggleToDisabled(){
        if($submitButton.hasClass('submitToggleEnabled')){
          processToggle()
        }
      }

      function toggleToEnabled(){
        if($submitButton.hasClass('submitToggleDisabled')){
          processToggle()
        }
      }

      function processToggle(){
        toggleSubmitDisableText()
        toggleStatusClass()
        toggleStatus()
        processCallbacks()
      }

      function processCallbacks(){
        if($submitButton.hasClass('submitToggleEnabled')){
          if( $.isFunction(options.onEnable) ) options.onEnable.call($submitButton);
        } else if($submitButton.hasClass('submitToggleDisabled')){
          if( $.isFunction(options.onDisable) ) options.onDisable.call($submitButton);
        }

        if( $.isFunction(options.onToggle) ) {
          options.onToggle.call($submitButton);
        }
      }

      function toggleStatusClass(){
        if($submitButton.hasClass('submitToggleEnabled')){
          $submitButton.removeClass('submitToggleEnabled').addClass('submitToggleDisabled')
        } else if($submitButton.hasClass('submitToggleDisabled')){
          $submitButton.removeClass('submitToggleDisabled').addClass('submitToggleEnabled')
        }        
      }

      function toggleStatus(){
       if($submitButton.hasClass('submitToggleEnabled')){
          $submitButton.prop('disabled', false)
        } else if($submitButton.hasClass('submitToggleDisabled')){
          $submitButton.prop('disabled', true)
        } 
      }

      function toggleSubmitDisableText(){
        var submitToggleText = $submitButton.data('disable-text') || $submitButton.attr('disable-text') || options.disableText

        if(!!submitToggleText){
          $submitButton.data('submit-disable-text', $submitButton.val())
          $submitButton.val(submitToggleText)
        }
      }

    });
  };

})(jQuery);
