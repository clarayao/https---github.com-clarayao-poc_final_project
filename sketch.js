//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! POINTER ARROW !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var arrowCanvas = function (sketch) {
    sketch.setup = function () {
        let canvasDiv = document.getElementById('p5-canvas');
        let positionInfo = canvasDiv.getBoundingClientRect();
        let arrowCanvasWidth = positionInfo.width;
        let arrowCanvasHeight = positionInfo.height;
        let arrowCanvas = sketch.createCanvas(arrowCanvasWidth, arrowCanvasHeight);
        arrowCanvas.parent("p5-canvas");
    }
    sketch.draw = function () {
        sketch.background("#e4e7eb");
        let originX = sketch.width * 2 / 3;
        let originY = sketch.height * 7 / 10;

        let v0 = sketch.createVector(originX, originY);
        let v1 = sketch.createVector(sketch.mouseX - originX, sketch.mouseY - originY);

        v1.normalize();
        sketch.drawArrow(v0, v1.mult(20), '#1e72e1');
        // line(v0.x, v0.y, -v1.x * 5, -v1.y * 5)
        // noFill();
        // textAlign(CENTER);
        sketch.fill("#1e72e1");
        sketch.textFont("Helvetica")
        sketch.textSize(20);
        sketch.text("I see that you are there", 10, 10, sketch.width, originY)
        // ellipse(50, 50, 35 * 2);
    }
    sketch.drawArrow = function (base, vec, myColor) {
        sketch.push();
        sketch.stroke(myColor);
        sketch.strokeWeight(3);
        sketch.fill(myColor);
        sketch.translate(base.x, base.y);
        sketch.line(0, 0, vec.x, vec.y);
        sketch.line(0, 0, -vec.x, -vec.y);
        sketch.rotate(vec.heading());
        let arrowSize = 5;
        sketch.translate(vec.mag() - arrowSize, 0);
        sketch.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        sketch.pop();
    }
};
new p5(arrowCanvas);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FACE RECOGNITION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let faceapi;
let video;
let detections;
let interestValue;
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
};
let emotion = 0;
let testNum = 0;
//draw p5 canvas for the video
var faceCanvas = function (sketch) {
    sketch.setup = function () {
        let faceDiv = document.getElementById('camera');
        let position = faceDiv.getBoundingClientRect();
        let faceCanvasWidth = position.width;
        let faceCanvasHeight = position.height;
        let faceCanvas = sketch.createCanvas(faceCanvasWidth, faceCanvasHeight);
        faceCanvas.parent("camera");

        // set up video
        video = sketch.createCapture(sketch.VIDEO);
        video.size(sketch.width, sketch.height);
        video.hide();
        faceapi = ml5.faceApi(video, detection_options, sketch.modelReady);
        sketch.textAlign(sketch.RIGHT);
    }
    //set up ai model (for facial recognition)
    sketch.modelReady = function () {
        console.log("ready!");
        faceapi.detect(sketch.gotResults);
    }
    //display results
    sketch.gotResults = function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        detections = result;
        sketch.background(255);
        sketch.image(video, 0, 0, sketch.width, sketch.height);
        if (detections) {
            if (detections.length > 0) {
                sketch.drawBox(detections);
                sketch.drawLandmarks(detections);
            }
        }
        faceapi.detect(sketch.gotResults);
        // console.log(emotion);
    }
    //draw box for face detection
    sketch.drawBox = function (detections) {
        for (let i = 0; i < detections.length; i++) {
            const alignedRect = detections[i].alignedRect;
            const x = alignedRect._box._x;
            const y = alignedRect._box._y;
            const boxWidth = alignedRect._box._width;
            const boxHeight = alignedRect._box._height;

            sketch.noFill();
            sketch.stroke("#1e72e1");
            sketch.strokeWeight(2);
            sketch.rect(x, y, boxWidth, boxHeight);
        }
    }
    //draw landmarks for mouth position
    sketch.drawLandmarks = function (detections) {
        sketch.noFill();
        sketch.stroke(161, 95, 251);
        sketch.strokeWeight(2);
        testNum = emotion;
        if (detections.length > 0) {
            for (let i = 0; i < detections.length; i++) {
                let points = detections[i].landmarks.positions;
                sketch.stroke("#1e72e1");
                sketch.strokeWeight(3);
                //important points for identifying smiling or not
                sketch.point(points[60]._x, points[60]._y)
                sketch.point(points[62]._x, points[62]._y)
                sketch.point(points[66]._x, points[66]._y)
                sketch.point(points[64]._x, points[64]._y)
                let lipL = points[60]._y;
                let lipR = points[64]._y;
                let lipMU = points[62]._y;
                let lipML = points[66]._y;
                let lipM = (lipMU + lipML) / 2;
                let threshold = -0.1;
                sketch.strokeWeight(1);
                //determine facial expression/emotion
                if (lipM - (lipL + lipR) / 2 > threshold) {
                    sketch.text("satisfied", 100, 100);
                    emotion++;
                } else {
                    sketch.text("unsatisfied", 100, 100);
                    emotion--;
                }
            }
        }
    }
}
new p5(faceCanvas);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! IDLE TIMER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let timer, currSeconds = 0;
let onBusDiv = onEntDiv = onFamDiv = onFitDiv = onFoodDiv = onHobDiv = onShopDiv1 = onSpoDiv = onTechDiv = onShopDiv2 = false;
let businessTime = entertainTime = familyTime = fitnessTime = foodTime = hobbyTime = shopTime1 = sportTime = techTime = shopTime2 = 0;
let categoryArray = [businessTime, entertainTime, familyTime, fitnessTime, foodTime, hobbyTime, shopTime1, sportTime, techTime, shopTime2];
let currCategory;
let prevCategory;


// Define the events that would reset the timer
window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeypress = resetTimer;

function startIdleTimer() {
    /* Increment the timer seconds */
    currSeconds++;
    /* Set the timer textto the new value */
    document.querySelector(".secs").textContent = currSeconds;
    /* Display the timer text */
    document.querySelector(".timerText").style.display = "block";
    document.getElementById("idle-canvas").style.backgroundColor = "#d9dade"

    // Accumulated time for each category
    document.getElementById("business-img").addEventListener("mouseenter", function () { onBusDiv = true; });
    document.getElementById("business-img").addEventListener("mouseout", function () { onBusDiv = false; });
    if (onBusDiv == true) {
        businessTime += (0.7 + 0.3 * testNum);
        categoryArray[0] = businessTime;
        // console.log(testNum);
    }

    document.getElementById("entertainment-img").addEventListener("mouseenter", function () { onEntDiv = true; });
    document.getElementById("entertainment-img").addEventListener("mouseout", function () { onEntDiv = false; });
    if (onEntDiv == true) {
        entertainTime += (0.7 + 0.3 * testNum);
        categoryArray[1] = entertainTime;
    }

    document.getElementById("family-img").addEventListener("mouseenter", function () { onFamDiv = true; });
    document.getElementById("family-img").addEventListener("mouseout", function () { onFamDiv = false; });
    if (onFamDiv == true) {
        familyTime += (0.7 + 0.3 * testNum);
        categoryArray[2] = familyTime;
    }

    document.getElementById("fitness-img").addEventListener("mouseenter", function () { onFitDiv = true; });
    document.getElementById("fitness-img").addEventListener("mouseout", function () { onFitDiv = false; });
    if (onFitDiv == true) {
        fitnessTime += (0.7 + 0.3 * testNum);
        categoryArray[3] = fitnessTime;
    }

    document.getElementById("food-img").addEventListener("mouseenter", function () { onFoodDiv = true; });
    document.getElementById("food-img").addEventListener("mouseout", function () { onFoodDiv = false; });
    if (onFoodDiv == true) {
        foodTime += (0.7 + 0.3 * testNum);
        categoryArray[4] = foodTime;
    }

    document.getElementById("hobbies-img").addEventListener("mouseenter", function () { onHobDiv = true; });
    document.getElementById("hobbies-img").addEventListener("mouseout", function () { onHobDiv = false; });
    if (onHobDiv == true) {
        hobbyTime += (0.7 + 0.3 * testNum);
        categoryArray[5] = hobbyTime;
    }

    document.getElementById("shopping1-img").addEventListener("mouseenter", function () { onShopDiv1 = true; });
    document.getElementById("shopping1-img").addEventListener("mouseout", function () { onShopDiv1 = false; });
    if (onShopDiv1 == true) {
        shopTime1 += (0.7 + 0.3 * testNum);
        categoryArray[6] = shopTime1;
    }

    document.getElementById("sports-img").addEventListener("mouseenter", function () { onSpoDiv = true; });
    document.getElementById("sports-img").addEventListener("mouseout", function () { onSpoDiv = false; });
    if (onSpoDiv == true) {
        sportTime += (0.7 + 0.3 * testNum);
        categoryArray[7] = sportTime;
    }

    document.getElementById("technology-img").addEventListener("mouseenter", function () { onTechDiv = true; });
    document.getElementById("technology-img").addEventListener("mouseout", function () { onTechDiv = false; });
    if (onTechDiv == true) {
        techTime += (0.7 + 0.3 * testNum);
        categoryArray[8] = techTime;
    }

    document.getElementById("shopping2-img").addEventListener("mouseenter", function () { onShopDiv2 = true; });
    document.getElementById("shopping2-img").addEventListener("mouseout", function () { onShopDiv2 = false; });
    if (onShopDiv2 == true) {
        shopTime2 += (0.7 + 0.3 * testNum);
        categoryArray[9] = shopTime2;
    }

    prediction();
}
function resetTimer() {
    /* Hide the timer text */
    document.querySelector(".timerText").style.display = "none";
    document.getElementById("idle-canvas").style.backgroundColor = "#e4e7eb"
    document.getElementById("idle-canvas").style.transition = ".02s ease-in-out";

    /* Clear the previous interval */
    clearInterval(timer);

    /* Reset the seconds of the timer */
    currSeconds = 0;

    /* Set a new interval */
    timer = setInterval(startIdleTimer, 1000);
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! PREDICTION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function prediction() {
    let busArray = ["advertising", "agriculture", "architecture", "aviation", "banking", "business", "construction", "design", "economics", "engineering", "entrepreneurship", "health", "education", "management", "marketing", "nursing", "online", "finance", "realestate", "retail", "sales", "science"];
    let entArray = ["game", "live", "movie", "music", "reading", "tv"];
    let famArray = ["dating", "family", "fatherhood", "friendship", "marriage", "motherhood", "parenting", "wedding"];
    let fitArray = ["bodybuilding", "meditation", "physical-exercise", "physical-fitness", "running", "weight-training", "yoga"];
    let foodArray = ["alcoholic-beverages", "beverages", "cooking", "cuisine", "food", "restaurant"]
    let hobbyArray = ["art", "current-event", "home-garden", "pet", "politics-and-social-issues", "travel", "vehicles"];
    let shopArray = ["beauty", "clothing", "fashion-accessories", "shopping", "toys"];
    let sportArray = ["outdoor-recreation", "sports", "boating", "hunting", "soccer", "volleyball"];
    let techArray = ["computer", "consumer electronics", "software", "tablet-computers", "camera", "smartphone"]

    let checkAmount = 0;

    for (let i = 0; i < categoryArray.length; i++) {
        checkAmount += categoryArray[i];
        // categoryArray[i] += 0.5 * testNum;
    }
    // console.log(categoryArray[0])
    max = Math.max.apply(null, categoryArray);
    prevCategory = currCategory
    index = categoryArray.indexOf(max);
    //---------------------------- Default -----------------------------------
    if (checkAmount == 0) {
        document.querySelector(".interest").textContent = "";
        //---------------------------- Category: Business and Industry ----------------------------
    } else if (index == 0) {
        document.querySelector(".interest").textContent = "Business and Industry";
        currCategory = "Business and Industry";
        //======================== switch recommendation image ========================
        if (prevCategory != currCategory) {
            let randomImgArray = [];
            for (let i = 0; i < 4; i++) {
                let randomImg = busArray[Math.floor(Math.random() * busArray.length)];
                if (randomImgArray.includes(randomImg)) {
                    randomImg = busArray[Math.floor(Math.random() * busArray.length)];
                    i -= 1
                } else {
                    randomImgArray.push(randomImg);
                }
                let imgSource = "https://source.unsplash.com/1600x900/?" + randomImgArray[i];
                let idName = "rec" + (i + 1);
                document.getElementById(idName).src = imgSource;
                //img text
                let textName = ".rec-text" + (i + 1);
                document.querySelector(textName).textContent = randomImgArray[i];
            }
        }
        //---------------------------- Category: Entertainment ----------------------------
    } else if (index == 1) {
        document.querySelector(".interest").textContent = "Entertainment";
        currCategory = "Entertainment";
        //======================== switch recommendation image ========================
        if (prevCategory != currCategory) {
            let randomImgArray = [];
            for (let i = 0; i < 4; i++) {
                let randomImg = entArray[Math.floor(Math.random() * entArray.length)];
                if (randomImgArray.includes(randomImg)) {
                    randomImg = entArray[Math.floor(Math.random() * entArray.length)];
                    i -= 1;
                } else {
                    randomImgArray.push(randomImg);
                }
                let imgSource = "https://source.unsplash.com/1600x900/?" + randomImgArray[i]
                let idName = "rec" + (i + 1);
                document.getElementById(idName).src = imgSource;
                //img text
                let textName = ".rec-text" + (i + 1);
                document.querySelector(textName).textContent = randomImgArray[i];
            }
        }
        //---------------------------- Category: Family and relationships ----------------------------
    } else if (index == 2) {
        document.querySelector(".interest").textContent = "Family and relationships";
        currCategory = "Family and relationships";
        //======================== switch recommendation image ========================
        if (prevCategory != currCategory) {
            let randomImgArray = [];
            for (let i = 0; i < 4; i++) {
                let randomImg = famArray[Math.floor(Math.random() * famArray.length)];
                if (randomImgArray.includes(randomImg)) {
                    randomImg = famArray[Math.floor(Math.random() * famArray.length)];
                    i -= 1;
                } else {
                    randomImgArray.push(randomImg);
                }
                let imgSource = "https://source.unsplash.com/1600x900/?" + randomImgArray[i]
                let idName = "rec" + (i + 1);
                document.getElementById(idName).src = imgSource;
                document.querySelector(".rec-text").textContent = randomImgArray[i];
                //img text
                let textName = ".rec-text" + (i + 1);
                document.querySelector(textName).textContent = randomImgArray[i];
            }
        }
        //---------------------------- Category: Fitness and wellness ----------------------------
    } else if (index == 3) {
        document.querySelector(".interest").textContent = "Fitness and wellness";
        currCategory = "Fitness and wellness";
        //======================== switch recommendation image ========================
        if (prevCategory != currCategory) {
            let randomImgArray = [];
            for (let i = 0; i < 4; i++) {
                let randomImg = fitArray[Math.floor(Math.random() * fitArray.length)];
                if (randomImgArray.includes(randomImg)) {
                    randomImg = fitArray[Math.floor(Math.random() * fitArray.length)];
                    i -= 1;
                } else {
                    randomImgArray.push(randomImg);
                }
                let imgSource = "https://source.unsplash.com/1600x900/?" + randomImgArray[i]
                let idName = "rec" + (i + 1);
                document.getElementById(idName).src = imgSource;
                //img text
                let textName = ".rec-text" + (i + 1);
                document.querySelector(textName).textContent = randomImgArray[i];
            }
        }
        //---------------------------- Category: Food and drink ----------------------------
    } else if (index == 4) {
        document.querySelector(".interest").textContent = "Food and drink";
        currCategory = "Food and drink";
        //======================== switch recommendation image ========================
        if (prevCategory != currCategory) {
            let randomImgArray = [];
            for (let i = 0; i < 4; i++) {
                let randomImg = foodArray[Math.floor(Math.random() * foodArray.length)];
                if (randomImgArray.includes(randomImg)) {
                    randomImg = foodArray[Math.floor(Math.random() * foodArray.length)];
                    i -= 1
                } else {
                    randomImgArray.push(randomImg);
                }
                let imgSource = "https://source.unsplash.com/1600x900/?" + randomImgArray[i]
                let idName = "rec" + (i + 1);
                document.getElementById(idName).src = imgSource;
                //img text
                let textName = ".rec-text" + (i + 1);
                document.querySelector(textName).textContent = randomImgArray[i];
            }
        }
        //---------------------------- Category: Hobbies and activities ----------------------------
    } else if (index == 5) {
        document.querySelector(".interest").textContent = "Hobbies and activities";
        currCategory = "Hobbies and activities";
        //======================== switch recommendation image ========================
        if (prevCategory != currCategory) {
            let randomImgArray = [];
            for (let i = 0; i < 4; i++) {
                let randomImg = hobbyArray[Math.floor(Math.random() * hobbyArray.length)];
                if (randomImgArray.includes(randomImg)) {
                    randomImg = hobbyArray[Math.floor(Math.random() * hobbyArray.length)];
                    i -= 1;
                } else {
                    randomImgArray.push(randomImg);
                }
                let imgSource = "https://source.unsplash.com/1600x900/?" + randomImgArray[i]
                let idName = "rec" + (i + 1);
                document.getElementById(idName).src = imgSource;
                //img text
                let textName = ".rec-text" + (i + 1);
                document.querySelector(textName).textContent = randomImgArray[i];
            }
        }
        //---------------------------- Category: Shopping and Fashion ----------------------------
    } else if (index == 6 || index == 9) {
        document.querySelector(".interest").textContent = "Shopping and Fashion";
        currCategory = "Shopping and Fashion";
        //======================== switch recommendation image ========================
        if (prevCategory != currCategory) {
            let randomImgArray = [];
            for (let i = 0; i < 4; i++) {
                let randomImg = shopArray[Math.floor(Math.random() * shopArray.length)];
                if (randomImgArray.includes(randomImg)) {
                    randomImg = shopArray[Math.floor(Math.random() * shopArray.length)];
                    i -= 1;
                } else {
                    randomImgArray.push(randomImg);
                }
                let imgSource = "https://source.unsplash.com/1600x900/?" + randomImgArray[i];
                let idName = "rec" + (i + 1);
                document.getElementById(idName).src = imgSource;
                //img text
                let textName = ".rec-text" + (i + 1);
                document.querySelector(textName).textContent = randomImgArray[i];
            }
        }
        //---------------------------- Category: Sports and Outdoors ----------------------------
    } else if (index == 7) {
        document.querySelector(".interest").textContent = "Sports and Outdoors";
        currCategory = "Sports and Outdoors";
        //======================== switch recommendation image ========================
        if (prevCategory != currCategory) {
            let randomImgArray = [];
            for (let i = 0; i < 4; i++) {
                let randomImg = sportArray[Math.floor(Math.random() * sportArray.length)];
                if (randomImgArray.includes(randomImg)) {
                    randomImg = sportArray[Math.floor(Math.random() * sportArray.length)];
                    i -= 1;
                } else {
                    randomImgArray.push(randomImg);
                }
                let imgSource = "https://source.unsplash.com/1600x900/?" + randomImgArray[i]
                let idName = "rec" + (i + 1);
                document.getElementById(idName).src = imgSource;
                //img text
                let textName = ".rec-text" + (i + 1);
                document.querySelector(textName).textContent = randomImgArray[i];
            }
        }
        //---------------------------- Category: Technology ----------------------------
    } else if (index == 8) {
        document.querySelector(".interest").textContent = "Technology";
        currCategory = "Technology";
        //======================== switch recommendation image ========================
        if (prevCategory != currCategory) {
            let randomImgArray = [];
            for (let i = 0; i < 4; i++) {
                let randomImg = techArray[Math.floor(Math.random() * techArray.length)];
                if (randomImgArray.includes(randomImg)) {
                    randomImg = techArray[Math.floor(Math.random() * techArray.length)];
                    i -= 1;
                } else {
                    randomImgArray.push(randomImg);
                }
                let imgSource = "https://source.unsplash.com/1600x900/?" + randomImgArray[i];
                let idName = "rec" + (i + 1);
                document.getElementById(idName).src = imgSource;
                //img text
                let textName = ".rec-text" + (i + 1);
                document.querySelector(textName).textContent = randomImgArray[i];
            }
        }
    }
}
