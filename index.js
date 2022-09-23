
var slider = document.getElementById("slider")
var output = document.getElementById("slider-qty")
output.innerHTML = slider.value

slider.oninput = function() {
  output.innerHTML = this.value
}
// 

document.getElementById("scheme-btn").addEventListener("click",(event)=>{
    event.preventDefault()
    const currentColor = document.getElementById("color-pallete").value.replace("#","")
    const currentPalleteType = document.getElementById("scheme-type").value
    const palletteCount = document.getElementById("slider").value
    fetch(`https://www.thecolorapi.com/scheme?hex=${currentColor}&mode=${currentPalleteType}&count=${palletteCount}`)
        .then(res => res.json())
        .then(data => {
            const setColorHtml = data.colors.map((color, palletteId)=>{
                palletteId +=1
                const currentHexValue = color.hex.value
                return `
                <div id=${palletteId} 
                onclick="clipboardHex('${palletteId}','${currentHexValue}')" 
                style="width:${100/palletteCount}%">
                    <div class="generated-pallette-colors 
                    "style="background:${currentHexValue}">
                    </div>
                    <h4>${color.hex.value}</h4>
                </div>
                `
            }).join("")
            document.getElementById("main-container").innerHTML = setColorHtml
    })
})

function clipboardHex(id, copyText) {
    var elem = document.createElement("textarea")
    document.body.appendChild(elem)
    elem.value = copyText
    elem.select()
    document.execCommand("copy")
    document.body.removeChild(elem)
    alert("Color copied: "+ elem.value)
}

document.getElementById("dark-mode-btn").addEventListener("click",(event)=>{
    event.preventDefault()
    document.body.classList.length === 1 ? 
    (document.body.classList.remove("dark"), 
    document.getElementById("dark-mode-btn").innerText ="Dark mode") 
    : 
    (document.body.classList.add("dark"), 
    document.getElementById("dark-mode-btn").innerText ="White mode")
    
})