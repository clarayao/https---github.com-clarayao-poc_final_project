let predictDiv = document.getElementById('prediction-explanation');
let predPosition = predictDiv.getBoundingClientRect();
let predCanvasWidth = predPosition.width;
let predCanvasHeight = predPosition.height;
let predX = predPosition.x;
let predY = predPosition.y;
console.log(businessTime);
// List of words
let size1 = 20
var myWords = [{word: "Running", size: "10"}, {word: "Surfing", size: size1}, {word: "Climbing", size: "50"}, {word: "Kiting", size: "30"}, {word: "Sailing", size: "20"}, {word: "Snowboarding", size: "60"} ]

// set the dimensions and margins of the graph
// var margin = {top: 10, right: 10, bottom: 10, left: 10};

// append the svg object to the body of the page
var svg = d3.select("#prediction-explanation").append("svg")
    .attr("width", predCanvasWidth)
    .attr("height", predCanvasHeight)
  .append("g")
    .attr("transform",
          "translate(0, 0)");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
  .size([predCanvasWidth, predCanvasHeight])
  .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
  .padding(5)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size; })      // font size of words
  .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .style("fill", "#69b3a2")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
}


//Pure p5.js
// var words = [
//     { word: "Business and Industry", size: businessTime },
//     { word: "Entertainment", size: 3 },
//     { word: "Family and relationships", size: 4 },
//     { word: "Fitness and wellness", size: 2 },
//     { word: "Food and drink", size: 3 },
//     { word: "Hobbies and activities", size: 4 },
//     { word: "Shopping and Fashion", size: 5 },
//     { word: "Sports and Outdoors", size: 2 },
//     { word: "Technology", size: 3 }
// ];
// let wordPos = [];
// let addCount = 0;
// let checkStatus = false;
// let sizeSum = 0;

// var wordCloudCanvas = function (sketch) {
//     sketch.setup = function () {
//         let cloudDiv = document.getElementById('prediction-explanation');
//         let positionCloud = cloudDiv.getBoundingClientRect();
//         let cloudCanvasWidth = positionCloud.width;
//         let cloudCanvasHeight = positionCloud.height;
//         let cloudCanvas = sketch.createCanvas(cloudCanvasWidth, cloudCanvasHeight);
//         cloudCanvas.parent("prediction-explanation");
//         // sketch.createCanvas(windowWidth, windowHeight);
        
//     }
//     sketch.draw = function () {
//         sketch.drawText();
//         // sketch.clear();
//     }
//     sketch.drawText = function () {
//         for (let i = 0; i < words.length; i++) {
//             sketch.textSize(words[i].size);
//             sizeSum += words[i].size;
//             let textX = sketch.random(sketch.width / 3, (sketch.width * 2) / 3);
//             let textY = sketch.random(sketch.height / 3, (sketch.height * 2) / 3);
//             sketch.textAlign(sketch.CENTER);
//             let txtWidth = sketch.textWidth(words[i].word);
//             let txtHeight = sketch.textAscent() - sketch.textDescent();
//             // console.log(words[i].word);
    
//             sketch.angleMode(sketch.DEGREES);
//             sketch.push();
//             sketch.translate(textX, textY);
//             let angle = sketch.random([90, 0]);
//             sketch.rotate(angle);
//             sketch.text(words[i].word, 0, 0);
//             sketch.pop();
//         }
//     }
// }
// new p5(wordCloudCanvas);