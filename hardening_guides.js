window.onload = function onBodyLoad(e) {
    var buttons = document.getElementsByClassName("copy_button");
    for (var i = 0; i < buttons.length; i++) {
	if (buttons[i].tagName == "INPUT") {
	    buttons[i].addEventListener("click", function (event) {
		button = event.currentTarget;
		sectionID = button.parentElement.parentElement.parentElement.id;
		copy_to_clipboard(sectionID);
	    });
	}
    }
}

function copy_to_clipboard(id) {
  commands = search_children(document.getElementById(id)).replace(/<br>/gi, "\n").replace(/&gt;/gi, ">").replace(/&lt;/gi, "<").replace(/\n\n/gi, "\n");

  // Inspired from a stackoverflow post.  I closed my browser before saving the URL, so
  // I can't give credit.  :(
  var t = document.createElement('textarea');
  t.style.position = 'fixed';
  t.style.top = 0;
  t.style.left = 0;
  t.style.width = '2em';
  t.style.height = '2em';
  t.style.padding = 0;
  t.style.border = 'none';
  t.style.outline = 'none';
  t.style.boxShadow = 'none';
  t.style.background = 'transparent';
  t.value = commands;

  document.body.appendChild(t);
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
}

function search_children(node) {
  var commands = "";
  for (var i = 0; i < node.children.length; i += 1)
    commands += search_children(node.children[i]);

  if (node.className == 'commands')
    return commands + node.innerHTML + "\n";
  else
    return commands;
}
