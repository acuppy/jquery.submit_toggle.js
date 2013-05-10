== jQuery Submit Toggle

jQuery submit toggle is a simple way to enable/disable form submit buttons and gracefully replace the text

== Usage

Bind the submitToggle action to a jQuery selected button.

    $('#submit-button').submitToggle({

      // wrapping form selector
      form: 'form',

      // automatically re-enable the button when ajax requests complete
      waitForAjax: false,

      onEnable: function(){
        // control the button when enabled
      },

      onDisable: function(){
        // control the button when disabled
      }

    });