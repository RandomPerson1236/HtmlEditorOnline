const editor = document.querySelector(".editor");

function syntaxHighlights(){
var ca = document.getElementsByTagName("code");
for(var i=0; i < ca.length; i++){
    var data = ca[i].innerHTML;
    //html
    data = data.replace(/"(.*?)"/g, '<span class="code-str">&quot;$1&quot;</span>')
    data = data.replace(/&lt;(.*?)&gt;/g, '<span class="code-elem">&lt;$1&gt;</span>')
    data = data.replace(/\/\* (.*?) \*\//g, '<span class="code-comment">/* $1 */</span>')
    
    //javascript
    data = data.replace(/var/g, '<span class="code-var">var</span>')
    data = data.replace(/function/g, '<span class="code-function">function</span>')
    data = data.replace(/if/g, '<span class="code-function">if</span>')
    data = data.replace(/else/g, '<span class="code-function">else</span>')
    data = data.replace(/style/g, '<span class="code-css-blue">style</span>')
    data = data.replace(/getElementById/g, '<span class="code-getelement">getElementById</span>')
    data = data.replace(/querySelector/g, '<span class="code-getelement">querySelector</span>')
    data = data.replace(/document/g, '<span class="code-css-blue">document</span>')

    //css
    data = data.replace(/body/g, '<span class="code-getelement">body</span>')
    data = data.replace(/background/g, '<span class="code-css-blue">background</span>')
    data = data.replace(/font-size/g, '<span class="code-css-blue">font-size</span>')
    data = data.replace(/font-family/g, '<span class="code-css-blue">font-family</span>')

    ca[i].innerHTML = data;
}
}
window.addEventListener("load", syntaxHighlights);