

let classifier = ml5.imageClassifier('MobileNet', setEventListeners);

let dropArea = document.getElementById('drop-area');

function setEventListeners() {

    dropArea.style.backgroundColor = "#fff";

    let button = document.getElementById("button-id");
    button.innerHTML = "Drop your image here... ";
    button.style.cursor = "pointer";

    dropArea.addEventListener('drop', handleDrop, false);

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    });
}

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
};

function highlight(e) {
    dropArea.style.backgroundColor = "rgb(200, 255, 207)";
}

function unhighlight(e) {
    dropArea.style.backgroundColor = "#fff";
}

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    files = [...files];
    files.forEach(previewFile);
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        let img = document.createElement('img');
        let cap = document.createElement('figcaption');
        let fig = document.createElement('figure');

        let id = "" + Math.random();
        fig.id = id;
        // gallery = document.getElementById("gallery");
        document.getElementById("gallery").appendChild(fig)
        
        img.src = reader.result;

        classifier.predict(img, function(err, results) {

            if (err) {
                console.log(err);
            }
            else {
                cap.innerText = results[0].label
                document.getElementById(id).appendChild(img);
                document.getElementById(id).appendChild(cap);
            }
          });
    };
}

function resultPred(error, prediction) {
    
}























// function resultImg() {
//     image(img, 0, 0, width, height);
// }



// function setup() {
//     createCanvas(640, 480);
//     background(128);

//     img = createImg('images/foto.jpg', resultImg);
//     img.hide();


// }

// function draw() {

// }