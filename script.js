async function translateText() {
    let text = document.getElementById("inputText").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let resultDiv = document.getElementById("result");

    if (!text) {
        resultDiv.innerText = "Please enter text first";
        return;
    }

    resultDiv.innerText = "Translating...";

    try {
        // Using Google translate free API - 100% works for Kannada
        let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
        let response = await fetch(url);
        let data = await response.json();

        // Google returns translation in data[0][0][0]
        let translated = data[0].map(x => x[0]).join('');
        resultDiv.innerText = translated;
    } catch (error) {
        console.log(error);
        resultDiv.innerText = "Error! Check internet or try again";
    }
}

function copyText() {
    let text = document.getElementById("result").innerText;
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
}

function speakText() {
    let text = document.getElementById("result").innerText;
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}