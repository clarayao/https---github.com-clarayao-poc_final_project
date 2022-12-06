//idle timer
let timer, currSeconds = 0;
let onBusDiv = onEntDiv = onFamDiv = onFitDiv = onFoodDiv = onHobDiv = onShopDiv1 = onSpoDiv = onTechDiv = onShopDiv2 = false;
let businessTime = entertainTime = familyTime = fitnessTime = foodTime = hobbyTime = shopTime1 = sportTime = techTime = shopTime2 = 0;

function resetTimer() {
    /* Hide the timer text */
    document.querySelector(".timerText").style.display = "none";

    /* Clear the previous interval */
    clearInterval(timer);

    /* Reset the seconds of the timer */
    currSeconds = 0;

    /* Set a new interval */
    timer = setInterval(startIdleTimer, 1000);
}

// Define the events that
// would reset the timer
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

    // Timer for each category
    document.getElementById("business-img").addEventListener("mouseenter", function(  ) {onBusDiv=true;});
    document.getElementById("business-img").addEventListener("mouseout", function(  ) {onBusDiv=false;});
    if (onBusDiv == true) {
        businessTime++;
    }

    document.getElementById("entertainment-img").addEventListener("mouseenter", function(  ) {onEntDiv=true;});
    document.getElementById("entertainment-img").addEventListener("mouseout", function(  ) {onEntDiv=false;});
    if (onEntDiv == true) {
        entertainTime++;
    }

    document.getElementById("family-img").addEventListener("mouseenter", function(  ) {onFamDiv=true;});
    document.getElementById("family-img").addEventListener("mouseout", function(  ) {onFamDiv=false;});
    if (onFamDiv == true) {
        familyTime++;
    }

    document.getElementById("fitness-img").addEventListener("mouseenter", function(  ) {onFitDiv=true;});
    document.getElementById("fitness-img").addEventListener("mouseout", function(  ) {onFitDiv=false;});
    if (onFitDiv == true) {
        fitnessTime++;
    }

    document.getElementById("food-img").addEventListener("mouseenter", function(  ) {onFoodDiv=true;});
    document.getElementById("food-img").addEventListener("mouseout", function(  ) {onFoodDiv=false;});
    if (onFoodDiv == true) {
        foodTime++;
    }

    document.getElementById("hobbies-img").addEventListener("mouseenter", function(  ) {onHobDiv=true;});
    document.getElementById("hobbies-img").addEventListener("mouseout", function(  ) {onHobDiv=false;});
    if (onHobDiv == true) {
        hobbyTime++;
    }

    document.getElementById("shopping1-img").addEventListener("mouseenter", function(  ) {onShopDiv1=true;});
    document.getElementById("shopping1-img").addEventListener("mouseout", function(  ) {onShopDiv1=false;});
    if (onShopDiv1 == true) {
        shopTime1++;
    }

    document.getElementById("sports-img").addEventListener("mouseenter", function(  ) {onSpoDiv=true;});
    document.getElementById("sports-img").addEventListener("mouseout", function(  ) {onSpoDiv=false;});
    if (onSpoDiv == true) {
        sportTime++;
    }

    document.getElementById("technology-img").addEventListener("mouseenter", function(  ) {onTechDiv=true;});
    document.getElementById("technology-img").addEventListener("mouseout", function(  ) {onTechDiv=false;});
    if (onTechDiv == true) {
        techTime++;
    }

    document.getElementById("shopping2-img").addEventListener("mouseenter", function(  ) {onShopDiv2=true;});
    document.getElementById("shopping2-img").addEventListener("mouseout", function(  ) {onShopDiv2=false;});
    if (onShopDiv2 == true) {
        shopTime2++;
    }

    // console.log("businessTime: ", businessTime);
    // console.log("entertainTime: ", entertainTime);
    // console.log("currSeconds: ", currSeconds);
}