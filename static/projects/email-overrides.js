document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a').forEach(function (a) {

  	a.href = "";
  	// a.setAttribute('target', '_blank');

    if (a.textContent.trim().toLowerCase() === 'view in browser') {
      var table = a.closest('table');
      if (table) table.remove();
    }
  });
});