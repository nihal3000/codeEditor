var editor = CodeMirror.fromTextArea(document.getElementById("editor"),{
    mode: "text/x-c++src",
    theme: "ambiance",
    lineNumbers: true,
    autoCloseBrackets: true,
})

var width = window.innerWidth
editor.setSize(0.7*width, "500")

var option = document.getElementById("inlineFormSelectPref")
option.addEventListener("change",function(){
    if (option.value == "Java"){
        editor.setOption("mode","text/x-java")
    }
    else if (option.value == "Python"){
        editor.setOption("mode","text/x-python")
    }
    else{
        editor.setOption("mode","text/x-c++src")
    }
})