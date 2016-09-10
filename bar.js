command: "echo `./osx-menubar/scripts/data`",

refreshFrequency: 1000,

render: function (output) {
  return '<div class="menubar-wrapper"></div>';
},

update: function (output, el) {
  var json = eval('(' + output + ')');

  if (!json) return;

  var menubar = $('.menubar-wrapper', el);
  if (!menubar.children().length) {
    $.ajax("osx-menubar/templates/menubar.html")
    .done(function(data){
      menubar.html(data);
    });
  }

  for (var json_key in json) {
      var json_value = json[json_key];
      var item = $('#menubarItem-'+json_key, menubar);
      item.removeClass('isHidden');
      if (json_value != '') {
        itemText = $('.menubarItem-text', item);
        itemText.html(json_value);
      } else {
        item.addClass('isHidden');
      }
  }
},

style: "        \n\
  top: 0     \n\
  left: 0    \n\
  width: 100%    \n\
  height: 100%   \n\
"