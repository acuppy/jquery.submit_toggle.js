(function($){

  $.fn.submitToggle = function(options){
    
    return this.each(function(){

      var $submitButton = $(this)

      options = $.extend({
        form:        'form',
        waitForAjax: false,
        onEnable:    false,
        onDisable:   false
      }, options)

      var $form = $submitButton.closest(options.form)
      
      $submitButton.addClass('submitToggleEnabled')

      $form.on('submit', function(){
        toggleToDisabled()
      });

      if(options.waitForAjax === true){
        $form.ajaxComplete(function(){
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
        toggleSubmitToggleText()
        toggleStatusClass()
        toggleStatus()
        processCallbacks()
      }

      function processCallbacks(){
        if($submitButton.hasClass('submitToggleEnabled')){
          if(typeof options.onEnable == 'function') options.onEnable.call($submitButton);
        } else if($submitButton.hasClass('submitToggleDisabled')){
          if(typeof options.onDisable == 'function') options.onDisable.call($submitButton);
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

      function toggleSubmitToggleText(){
        var submitToggleText = $submitButton.data('submit-toggle-text')

        if(!!submitToggleText){
          $submitButton.data('submit-toggle-text', $submitButton.val())
          $submitButton.val(submitToggleText)
        }
      }

    });
  };

})(jQuery);
