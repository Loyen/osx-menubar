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

  for (var i=0; i<json.length; i++) {
      var itemData = json[i];
      //console.log(itemData);
      var item = $('#menubarItem-'+itemData.target, menubar);
      item.removeClass('isHidden');
      if (itemData.value != '') {
        itemText = $('.menubarItem-text', item);
        itemText.html(itemData.value);

        if (itemData.state) {
          item.attr('js-state', itemData.state);
        }
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