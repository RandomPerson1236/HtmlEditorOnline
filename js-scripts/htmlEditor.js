const first = document.querySelector(".editor");
const second = document.querySelector(".css-editor");
const jsEditor = document.querySelector(".js-editor");
var iframe = document.getElementById("compiled-code");
const btn = document.querySelector("button");
let colorPicker = document.getElementById("colorPickerConsole");

btn.addEventListener("click", () => {
  var html = first.textContent;
  var css = "<style>"+second.textContent+"</style>";
  var js = "<scri"+"pt>"+jsEditor.textContent+"</scri"+"pt>";
  iframe.src = "data:text/html;charset=utf-8," + encodeURI(html+css+js);
});

first.addEventListener('keyup',()=>{
  var html = first.textContent;
  //iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
})

//paste stuff
first.addEventListener("paste", function(e) {
        e.preventDefault();
        var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
    });
second.addEventListener("paste", function(e) {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    });
jsEditor.addEventListener("paste", function(e) {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    });

    function deleteText(){
        first.textContent = "";
        second.textContent = "";
        jsEditor.textContent = "";
    } 
    colorPicker.addEventListener('input', function(e) {
      first.style.color = e.target.value;
    })

    function ShowAndHide() {
      var x = document.getElementById('settingsConsole');
      if (x.style.display == 'none') {
          x.style.display = 'block';
      } else {
          x.style.display = 'none';
      }
    }
    function SAHCSS() {
      var x = document.querySelector('.css-editor');
      if (x.style.display == 'none') {
          x.style.display = 'block';
      } else {
          x.style.display = 'none';
      }
    }
 