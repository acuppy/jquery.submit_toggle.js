(function($){

  var SubmitToggle = function(input, options){

    var _this = this;

    var options = $.extend({
      form:        'form',
      waitForAjax: false,
      onEnable:    $.noop,
      onDisable:   $.noop,
      onToggle:    $.noop,
      disableText: null
    }, options);

    var submitButton;

    this.init = function(){
      submitButton = $(input).addClass('submitToggleEnabled');

      submitButton.on('click', function(){
        _this.toggleToDisabled();
        submitButton.closest(options.form).submit();
      });

      if(options.waitForAjax === true){
        $(document).ajaxComplete(function(){
          _this.toggleToEnabled();
        });
      }
    }

    this.toggleToDisabled = function(){
      if(submitButton.hasClass('submitToggleEnabled')){
        this.processToggle();
      }
    },

    this.toggleToEnabled = function(){
      if(submitButton.hasClass('submitToggleDisabled')){
        this.processToggle();
      }
    },

    this.processToggle = function(){
      this.toggleSubmitDisableText();
      this.toggleStatusClass();
      this.toggleStatus();
      this.processCallbacks();
    },

    this.processCallbacks = function(){
      if(submitButton.hasClass('submitToggleEnabled')){
        if( $.isFunction(options.onEnable) ) { 
          options.onEnable.call(submitButton); 
        }
      } else if(submitButton.hasClass('submitToggleDisabled')){
        if( $.isFunction(options.onDisable) ) { 
          options.onDisable.call(submitButton); 
        }
      }

      if( $.isFunction(options.onToggle) ) {
        options.onToggle.call(submitButton);
      }
    },

    this.toggleStatusClass = function(){
      if(submitButton.hasClass('submitToggleEnabled')){
        submitButton.removeClass('submitToggleEnabled').addClass('submitToggleDisabled');
      } else if(submitButton.hasClass('submitToggleDisabled')){
        submitButton.removeClass('submitToggleDisabled').addClass('submitToggleEnabled');
      }
    },

    this.toggleStatus = function(){
     if(submitButton.hasClass('submitToggleEnabled')){
        submitButton.prop('disabled', false);
      } else if(submitButton.hasClass('submitToggleDisabled')){
        submitButton.prop('disabled', true);
      } 
    },

    this.toggleSubmitDisableText = function(){
      var submitToggleText = submitButton.data('disable-text') || submitButton.attr('disable-text') || options.disableText;

      if(!!submitToggleText){
        submitButton.data('submit-disable-text', submitButton.val());
        submitButton.val(submitToggleText);
      }
    }
  }

  $.fn.submitToggle = function(options){

    return this.each(function(){
      submitToggle = new SubmitToggle(this, options);
      submitToggle.init();
    });

  };

})(jQuery);
