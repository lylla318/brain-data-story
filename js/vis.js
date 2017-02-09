
  // Data: http://www.cdc.gov/nchs/nhis/data-questionnaires-documentation.htm

  // Hover over library: d3.tip at http://labratrevenge.com/d3-tip/



  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

  /////////////////////// ANIMATED TYPING CODE  ///////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////





  var captionLength = 0;

  setInterval ('cursorAnimation()', 600);

  captionEl = '#caption';





  // INDIV. FUNCTIONS



  var captionLength = 0;

  var caption = '';





  $(document).ready(function() {

      //setInterval ('cursorAnimation()', 600);

      captionEl = $('#caption');

      $('#test-typing').ready(function(){

            typeLineOne();

      });

  });



  function typeLineOne() {

      caption = "Poverty's Effect On The Brain: A Visual Story";

      type();

  }

  function type() {

      captionEl.html(caption.substr(0, captionLength++));

      if(captionLength < caption.length+1) {

          setTimeout('type()', 50);

      } else {

          captionLength = 0;

          caption = '';

      }

  }



  function testErasingEffect() {

      caption = captionEl.html();

      captionLength = caption.length;

      if (captionLength>0) {

          erase();

      } else {

          $('#caption').html("You didn't write anything to erase, but that's ok!");

          setTimeout('testErasingEffect()', 1000);

      }

  }



  function erase() {

      captionEl.html(caption.substr(0, captionLength--));

      if(captionLength >= 0) {

          setTimeout('erase()', 50);

      } else {

          captionLength = 0;

          caption = '';

      } 

  }



  function cursorAnimation() {

      $('#cursor').animate({

          opacity: 0

      }, 'swing').animate({

          opacity: 1

      }, 'swing');

  }







var h = 25, // Height of heatmap tile

      w = 25; // Width of heatmap tile



  var transitionDuration = 750;



  var margin = {top: 20, right: 20, bottom: 10, left: 120};

    width = 500 - margin.left - margin.right,

    height = 550 - margin.top - margin.bottom;



  var ageList = ["2 Years Old", "3 Years Old", "4 Years Old", "5 Years Old", "6 Years Old", "7 Years Old", "8 Years Old", "9 Years Old", "10 Years Old", "11 Years Old", "12 Years Old", "13 Years Old", "14 Years Old", "15 Years Old", "16 Years Old", "17 Years Old"];



  var ratioList = ["<.50",".50 - .99", "1.00 - 1.49","1.50 - 1.99","2.00 - 2.49","2.50 - 2.99","3.00 - 3.49","3.50 - 3.99","4.00 - 4.49","4.50 - 5.00",">5.00"];



  var ratioListMike = ["<0.50","0.50-0.99", "1.00-1.49","1.50-1.99","2.00-2.49","2.50-2.99","3.00-3.49","3.50-3.99","4.00-4.49","4.50-5.00",">5.00"];



  var ratioIDs = ["lessthanpointfive","pointfivetoone", "onetoonepointfive","onepointfivetotwo",

  "twototwopointfive","twopointfivetothree","threetothreepointfive","threepointfivetofour",

  "fourtofourpointfive","fourpointfivetofive","fiveplus"];



  var ratioToId = {}



  for(var j=0; j< ratioIDs.length; j++){

      ratioToId[ratioListMike[j]] = ratioIDs[j]; 

    }



  //Contains reference to all of the heatmap blocks

  var heatmapBlocks = [];



  var svgheatmap = d3.select("#heatmap").append("svg")

    .attr("width", width + margin.left + margin.right)

    .attr("height", height + margin.top + margin.bottom)

    .append("g")

    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  var tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10,0])
    .html(function(d) {
      return "<div><span>Age:</span> <span style='color:white'>" + ageList[d.row] + "</span></div>" + "<div><span>FPL Ratio:</span> <span style='color:white'>" + ratioList[d.col] + "</span></div>" + "<div><span>% with Disorder:</span> <span style='color:white'>" + d3.round(d.score,3) + "</span></div>";
    });



  //Holds the heatmap scale for the current pro

  var heatMapScale;

  svgheatmap.call(tip);



  // Establish x-axis

  var xScale = d3.scale.ordinal()

    .rangeBands([0,ratioList.length * w]);

  var xAxis = d3.svg.axis()

    .orient("bottom");



  xScale.domain(ratioList);

  xAxis.scale(xScale);

  svgheatmap.append("g")

    .attr("class", "x axis")

    .call(xAxis)

    .selectAll("text")

      // .attr("y", 200)

      // .attr("dy", ".5em")

      .attr("x",-1* width-10)

      .attr("y",170)

      .attr("transform", "rotate(-65)")

      .style("text-anchor", "end");



  // Establish y-axis

  var yScale = d3.scale.ordinal()

    .rangeBands([0,ageList.length * h]);

  var yAxis = d3.svg.axis()

    .orient("left");

  yScale.domain(ageList);

  yAxis.scale(yScale);

  svgheatmap.append("g")

    .attr("class", "y axis")

    .call(yAxis)

    .style("text-anchor", "end");



  // Establish axes titles

  svgheatmap.append("text")

    .attr("x", 135)

    .attr("y", height-20)

    .style("text-anchor","middle")

    .text("Family Income as Fraction of Federal Poverty Line")

    .attr("fill", "white")

    .style("font-size","14px");



  svgheatmap.append("text")

    .attr("x", -1 * height/2.75)

    .attr("y", -100)

    .attr("transform", "rotate(-90)")

    .style("text-anchor","middle")

    .attr("fill","white")

    .style("font-size","14px")

    .text("Age of Child");



  var colorLow = '#bac2ff',

  colorHigh = '#00059f';



  var mapData = [];



  var datasets = ["data/ADHD.csv","data/Autism.csv","data/LearningDisability.csv"];

  var selectedDisorders = [false, false, false];



  //Holds the disorders that we want to plot

  var trendDisorders = ["ADDADHD"];

  //Holds the populations that we want to plot

  var trendPopulations = ["boys"];



  // Inputs: d = array of "ADDADHD","AutismSpecturm" and/or "LearningDisability", OR "allDisorders", sex = array of "boys" or "girls" or "allGenders"

  function init_heatmap (d, sex) {

    var sexIndex = 0;

    if (sex == "boys") {

      sexIndex = 1;

    } else if (sex == "girls") {

      sexIndex = 2;

    } else if (sex == "allGenders") {

      sexIndex = 0;

    };



    var data = "";

    if (d == "ADDADHD") {

      data = datasets[0];

      selectedDisorders[0] = true;

    } else if (d == "AutismSpectrum") {

      data = datasets[1];

      selectedDisorders[1] = true;

    } else if (d == "LearningDisability") {

      data = datasets[2];

      selectedDisorders[2] = true;

    }



    d3.csv(data,
      function (error, rows) {
        if (error) {
          console.log(error);
        };
        var maxValue = 0;

        rows.forEach(function (row) {

          if(row.Sex == sexIndex) {

            mapData.push({affected: Number(row.Affected), 

                      total: Number(row.Total),

                      row: Number(row.Age)-2, 

                      col: Number(row.Ratio)-1});

          };

        });



        mapData.forEach(function (row, i) {

          row.score = row.affected / row.total;



          if (row.score > maxValue) {

            maxValue = row.score;

          };

        });



        var colorScale = d3.scale.linear()

          .domain([0, maxValue])

          .range([colorLow, colorHigh]);



        var heatMap = svgheatmap.selectAll(".heatmap")

          .data(mapData, function (d) { 

            return d.col + ':' + d.row; 

          })

          .enter()

          .append("svg:rect")

            .attr("x",function (d) {

              return d.col * h;

            })

            .attr("y", function (d) {

              return d.row * w;

            })

            .attr("width", function (d) {

              return w;

            })

            .attr("height", function (d) {

              return h;

            })

            .style("fill", function (d) {

              return colorScale(d.score);

            })

            .attr("class", function (d){

              return ratioIDs[d.col] + "_heatmap";

            })

            .classed("heatmapHover",true)

            .on('mouseover',tip.show)

            .on('mouseout', tip.hide);

      });

  };



  function update_heatmap (d, sex) {

    d3.selectAll(".heatmapHover").remove();

    var sexIndex = 0;

    if (sex == "boys") {

      sexIndex = 1;

    } else if (sex == "girls") {

      sexIndex = 2;

    } else if (sex == "allGenders") {

      sexIndex = 0;

    };



    if (d.indexOf("ADDADHD") >= 0) {

      selectedDisorders[0] = true;

    } else {

      selectedDisorders[0] = false;

    }



    if (d.indexOf("AutismSpectrum") >= 0) {

      selectedDisorders[1] = true;

    } else {

      selectedDisorders[1] = false;

    }



    if (d.indexOf("LearningDisability") >= 0) {

      selectedDisorders[2] = true;

    } else {

      selectedDisorders[2] = false;

    }



    //clear mapData values

    mapData.forEach(function (row, i) {

      mapData[i].affected = 0;

      mapData[i].total = 0;

    })



    selectedDisorders.forEach(function (d, i) {

      if(d == true) {

        d3.csv(datasets[i],

        function (error, rows) {

          if (error) {

            console.log(error);

          };

          rows.forEach(function (row) {

            if(row.Sex == sexIndex) {

              mapData.forEach(function (r, i) {

                if(r.col == Number(row.Ratio)-1 && r.row == Number(row.Age)-2) {

                  mapData[i].affected += Number(row.Affected);

                  mapData[i].total += Number(row.Total);

                };

              });

            };

          });



          var maxValue = 0;



          mapData.forEach(function (row, i) {

            row.score = row.affected / row.total;



            if (row.score > maxValue) {

              maxValue = row.score;

            };

          });



          var colorScale = d3.scale.linear()

            .domain([0, maxValue])

            .range([colorLow, colorHigh]);



          var heatMap = svgheatmap.selectAll(".heatmap")

          .data(mapData, function (d) { 

            return d.col + ':' + d.row; 

          })

          .enter()

          .append("svg:rect")

            .attr("x",function (d) {

              return d.col * h;

            })

            .attr("y", function (d) {

              return d.row * w;

            })

            .attr("width", function (d) {

              return w;

            })

            .attr("height", function (d) {

              return h;

            })

            .style("fill", function (d) {

              return colorScale(d.score);

            })

            .attr("class", function (d){

              return ratioIDs[d.col] + "_heatmap";

            })

            .classed("heatmapHover",true)

            .on('mouseover',tip.show)

            .on('mouseout', tip.hide);

        });

      };

    });

  };



  var disorder = "ADHD.csv";

  var gender = 0; // 0 = both, 1 = male, 2 = female

  init_heatmap(trendDisorders, trendPopulations); // Initialize with ADHD/All genders







  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

  ////////////////////////////  LINE PLOT CODE  ///////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////


function leastSquares(points) {

var model = { intercept: 0, slope: 0 };


if (points.length == 0) { return model; }

if (points.length == 1) {

  model.slope = points[0].y / points[0].x;

  return model;

}



var meanX = d3.mean(points, function (d) { 

  return d.x;

});



var meanY = d3.mean(points, function (d) { 

  return d.y;

});



model.slope = d3.sum(points, function (d) {

  return (d.x - meanX) * (d.y - meanY);

});



model.slope /= d3.sum(points, function (d) {

  return (d.x - meanX) * (d.x - meanX);

});



model.intercept = meanY - model.slope * meanX;

return model;

}



var margin = {top: 50, right: 30, bottom: 150, left: 80},

  width = 700 - margin.left - margin.right,

  height = 500 - margin.top - margin.bottom;



var axisColor = "#d3d3d3";



var devData = {"<0.50":{"ADDADHD_boys":55.0,"ADDADHD_girls":15.0,"AutismSpectrum_boys":11.0,"AutismSpectrum_girls":2.0,"LearningDisability_boys":42.0,"LearningDisability_girls":23.0,"boys":416.0,"girls":371.0},

"0.50-0.99":{"ADDADHD_boys":91.0,"ADDADHD_girls":48.0,"AutismSpectrum_boys":27.0,"AutismSpectrum_girls":5.0,"LearningDisability_boys":83.0,"LearningDisability_girls":51.0,"boys":755.0,"girls":771.0},

"1.00-1.49":{"ADDADHD_boys":79.0,"ADDADHD_girls":40.0,"AutismSpectrum_boys":23.0,"AutismSpectrum_girls":9.0,"LearningDisability_boys":73.0,"LearningDisability_girls":42.0,"boys":729.0,"girls":746.0},

"1.50-1.99":{"ADDADHD_boys":74.0,"ADDADHD_girls":24.0,"AutismSpectrum_boys":22.0,"AutismSpectrum_girls":3.0,"LearningDisability_boys":50.0,"LearningDisability_girls":30.0,"boys":602.0,"girls":569.0},

"2.00-2.49":{"ADDADHD_boys":58.0,"ADDADHD_girls":23.0,"AutismSpectrum_boys":18.0,"AutismSpectrum_girls":6.0,"LearningDisability_boys":36.0,"LearningDisability_girls":18.0,"boys":501.0,"girls":475.0},

"2.50-2.99":{"ADDADHD_boys":39.0,"ADDADHD_girls":19.0,"AutismSpectrum_boys":10.0,"AutismSpectrum_girls":4.0,"LearningDisability_boys":33.0,"LearningDisability_girls":12.0,"boys":460.0,"girls":459.0},

"3.00-3.49":{"ADDADHD_boys":35.0,"ADDADHD_girls":14.0,"AutismSpectrum_boys":8.0,"AutismSpectrum_girls":2.0,"LearningDisability_boys":25.0,"LearningDisability_girls":12.0,"boys":403.0,"girls":362.0},

"3.50-3.99":{"ADDADHD_boys":20.0,"ADDADHD_girls":10.0,"AutismSpectrum_boys":9.0,"AutismSpectrum_girls":3.0,"LearningDisability_boys":17.0,"LearningDisability_girls":10.0,"boys":324.0,"girls":323.0},

"4.00-4.49":{"ADDADHD_boys":32.0,"ADDADHD_girls":13.0,"AutismSpectrum_boys":7.0,"AutismSpectrum_girls":1.0,"LearningDisability_boys":17.0,"LearningDisability_girls":12.0,"boys":279.0,"girls":273.0},

"4.50-5.00":{"ADDADHD_boys":24.0,"ADDADHD_girls":10.0,"AutismSpectrum_boys":5.0,"AutismSpectrum_girls":1.0,"LearningDisability_boys":19.0,"LearningDisability_girls":6.0,"boys":202.0,"girls":204.0},

">5.00":{"ADDADHD_boys":89.0,"ADDADHD_girls":40.0,"AutismSpectrum_boys":28.0,"AutismSpectrum_girls":10.0,"LearningDisability_boys":57.0,"LearningDisability_girls":31.0,"boys":1007.0,"girls":975.0}}





//removes element id from array

function removeItem(elementID,array){



var item = elementID.slice(0,-6);

var index = array.indexOf(item);



if (index > -1) {

  return array.splice(index, 1);

} else {

  return array;

}

}



//Adds an elementid name to an array

function addItem (elementID,array) {

var item = elementID.slice(0,-6);

array.push(item);

}



//Given an arbitrary number of object column names, sum the values in each row

function sumMerge(data,columns){

var toReturn = {};

  

for (var row in data){

    var rowSum = 0;

    columns.forEach(function(column){

      rowSum += data[row][column];

    });



    toReturn[row] = rowSum;

  }



return toReturn;

}



//Sum across genders and columns

function typeMerge(data,genders,columnTypes){

var toReturn = {};

  

for (var row in data){

    var rowSum = 0;

    columnTypes.forEach(function(type){

      genders.forEach(function(gender){

        rowSum += data[row][type + "_" + gender];

      });

    });



    toReturn[row] = rowSum;

  }



return toReturn;

}

//Returns an obeject where the values in num are divded by the corresponding

//values in denom

function divideMerge(num,denom){

var toReturn = {}

for(var key in num){

  toReturn[key] = num[key] / denom[key];

}

return toReturn;

}

//Sums data from an arbitrary number of disability counts and divides

//by the total number of children in each income group. Totals is also of 

//arbitrary so that we can plot boys vs girls

function mergeSets(disabilities,totals){

var disSummed = typeMerge(devData,totals,disabilities);

var totalSummed = sumMerge(devData,totals);



//Need to format this nicely for plotting

var percents = divideMerge(disSummed,totalSummed);



var toReturn = [];



for (key in percents){

  toReturn.push({"group" : key,

                 "percentDisabled" : percents[key]});

};

return toReturn;

}



function leastSquaresOrdinal(points, x_scale, y_scale) {

//Run a least squares regression with an ordinal x axis.

//Note that the output does not require scaling on its own

var model = { intercept: 0, slope: 0 };



//Transform x points so that we can run regression

points = points.map(function (d){

  return {"x" : x_scale(d.group), "y": y_scale(d.percentDisabled)}

});



if (points.length == 0) { return model; }

if (points.length == 1) {

  model.slope = points[0].y / points[0].x;

  return model;

}



var meanX = d3.mean(points, function (d) { 

  return d.x;

});



var meanY = d3.mean(points, function (d) { 

  return d.y;

});



model.slope = d3.sum(points, function (d) {

  return (d.x - meanX) * (d.y - meanY);

});



model.slope /= d3.sum(points, function (d) {

  return (d.x - meanX) * (d.x - meanX);

});



model.intercept = meanY - model.slope * meanX;



//Need to calculate SSR

var SSR = d3.sum(points.map(function (d){

  return Math.pow((model.slope * d.x + model.intercept) - d.y,2);

}));



var SST = d3.sum(points.map(function (d){

  return Math.pow((d.y - meanY),2);

}));



model.n = points.length;

model.rSquared = 1 - (SSR/SST);

model.fStat = ((model.rSquared)/((1-model.rSquared)/(model.n -2)));

model.p = 1 - jStat.centralF.cdf(model.fStat,1,model.n -1);



return model;

}



function plotTrend(data){

// Plots points on the axis
// Remove old points and axis, want to change this so that they transition
// Also probably want to make axis transition animated
// d3.selectAll(".datapoint").remove();
//Still need that x scale, let's keep it encapsulated

var groups = data.map(function(d){return d.group;})

var x = d3.scale.ordinal().domain(groups).rangePoints([0,width]);

var y_max = d3.max(data, function(d){return d.percentDisabled;});

var y_max_padded = y_max + 0.15 * y_max

var y = d3.scale.linear().range([height, 0])

                .domain([0, y_max_padded]);

var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

//Change the y axis

d3.select(".y_axis")

    .transition()

    .duration(transitionDuration)

    .call(yAxis);


var points = trends.selectAll(".datapoint")
  .data(data)
  .transition()
  .duration(transitionDuration)
  .attr("cx", function (d) { return x(d.group); })
  .attr("cy", function (d) { return y(d.percentDisabled); });

  // .attr("r", 10)

  // .attr("class","datapoint")

  // .style("fill", "PowderBlue");

var highlights = trends.selectAll(".highlight").data(data)
  .transition()
  .duration(transitionDuration)
  .attr("cx", function (d) { return x(d.group); })
  .attr("cy", function (d) { return y(d.percentDisabled); });

//Run regression and plot result
var model = leastSquaresOrdinal(data,x,y);
updateSig(model);


trends.select(".regression")
    .transition()
    .duration(transitionDuration)
    .attr("x1", 0)
    .attr("y1", model.intercept)
    .attr("x2", width)
    .attr("y2", (model.slope * width + model.intercept));
}



//Called when  we need to update the significance div

function updateSig(model){

var formatter = d3.format(".3f");

var pValue = formatter(model.p);

var pTarget = d3.select("#pvalue");

// var isig = d3.select("#isig");



if (pValue > 0.10){

  pTarget.text("This probably isn't significant. p = " + pValue + ", so by most standards this wouldn't count.           ")

      .style("color","#C0C0C0");

}else if (pValue > 0.05){

  pTarget.text("This trend might be significant. p = " + pValue + ", so some might call it significant. You're almost there.")

      .style("color","#b5dbe8");

}else{

  pTarget.text("Good job! It looks like you found a significant trend! p = " + pValue + ", so many scientists would call it significant.")

      .style("color","#00ff00");

}



}



//Called when we need to plot the data in trendDisorders and

//trendPopulations

//useful for transitions: http://bl.ocks.org/d3noob/7030f35b72de721622b8

function updateTrend(){

var merged = mergeSets(trendDisorders,trendPopulations);

plotTrend(merged);

}



//Just sets up the axis labels and plots an intitial trend

function init(){

//We want trends to be global

trends = d3.select("#trends")

  .append("svg")

      .attr("width", width + margin.left + margin.right + 20)

      .attr("height", height + margin.top + margin.bottom + 20)

      .attr("fill", axisColor)

  .append("g")

      .attr("transform", 

            "translate(" + margin.left + "," + margin.top + ")")

      .attr("fill", axisColor);





trends.append("text").attr("x", width /2)

                  .attr("y", height + 100)

                  .style("text-anchor","middle")

                  .text("Family Income as Fraction of Federal Poverty Line")

                  .attr("fill", axisColor)

                  .style("font-size","14px");



trends.append("text")

    .attr("transform", "rotate(-90)")

    .attr("y", -55 )

    .attr("x",  -1 * height/2)

    .style("text-anchor", "middle")

    .text("Percent With Disability")

    .style("font-size","14px");





trends.append("text")

    .attr("y", 5 )

    .attr("x", width/2)

    .style("text-anchor", "middle")

    .text("Impact of Income")

    .style("font-size","14px");



//Set up the intial data

var data = mergeSets(trendDisorders,trendPopulations);

var groups = data.map(function(d){return d.group;})

var x = d3.scale.ordinal().domain(groups).rangePoints([0,width]);

var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);

trends.append("g")

      .attr("class", "x_axis")

      .call(xAxis).attr("transform","translate(0,"+ height + ")")

          .selectAll("text")

          .style("font-size","14px")  

          .style("text-anchor", "end")

          .attr("dx", "-.8em")

          .attr("dy", ".15em")

          .attr("transform", function(d) {

              return "rotate(-65)" 

              });;



var y_max = d3.max(data, function(d){return d.percentDisabled;});

var y_max_padded = y_max + 0.15 * y_max;

var y = d3.scale.linear().range([height, 0])

                .domain([0, y_max_padded]);

//var formatPercent = d3.format("0.00%");

var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5).tickFormat(function(y){return y+"%";});

//var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5)



trends.append("g")

    .attr("class", "y_axis")

    .call(yAxis)

    .style("font-size","14px")

    .attr("stroke-width", 1);



var highlights = trends.selectAll(".highlight").data(data).enter()

  .append("circle")

  .attr("cx", function (d) { return x(d.group); })

  .attr("id", function (d) { return ratioToId[d.group] + "_highlight"; })

  .attr("cy", function (d) { return y(d.percentDisabled); })

  .attr("r", 13)

  .attr("class","highlight")

  .style("fill", "none");

    

var points = trends.selectAll(".circle").data(data).enter()

  .append("circle")

  .attr("cx", function (d) { return x(d.group); })

  .attr("id", function (d) { return ratioToId[d.group]; })

  .attr("cy", function (d) { return y(d.percentDisabled); })

  .attr("r", 10)

  .attr("class","datapoint")

  // .style("fill", "#00CD00");
  .style("fill", "#3333FF");





//Need to add empty boxes to use for hover events

var highlightBars = trends.selectAll(".highlightBars").data(data).enter()

  .append("rect")

  .attr("width", width / data.length)

  .attr("height",height)

  .attr("y", 0)

  .attr("x", function (d) { return x(d.group) - (width / data.length)/2; })

  .style("fill", "none")

  .style("pointer-events","all")

  .attr("class","highlightBars")

  .attr("id", function (d) { return ratioToId[d.group] + "_highlightBar"; });



//Run regression and plot result

var model = leastSquaresOrdinal(data,x,y);

updateSig(model);

var regressionLine = trends.append("line")

    .attr("class", "regression")

    .attr("x1", 0)

    .attr("y1", model.intercept)

    .attr("x2", width)

    .attr("y2", (model.slope * width + model.intercept))

    .style("stroke", "#d3d3d3");

}



//Initial display

init();

//Handle the toggle events

d3.selectAll(".toggle").on("click", function(d){

var button = d3.select(this);

var isDown = button.classed("down");

//Was a valid operation performed? If so, redraw

var goodToDraw = false;

//The user wants to remove these data, only proceed if there' at least one
//other item in the array

if(isDown){

  //Dealing with population parameter

  if(button.classed("disorderToggle") && trendDisorders.length >1){

    removeItem(button.attr("id"),trendDisorders);

    goodToDraw = true;

  }

  else if(button.classed("popToggle") && trendPopulations.length > 1){

    removeItem(button.attr("id"),trendPopulations);

    goodToDraw = true;



  }

}



//The user wants to add data

else if (!isDown){

  if(button.classed("disorderToggle")){

    //Did we come from the all state?

    if(d3.select("#allDisorders").classed("down")){

      d3.select("#allDisorders").classed("down",false);

      trendDisorders = [];

    }

    addItem(button.attr("id"),trendDisorders);

    goodToDraw = true;



  }else{

    if(d3.select("#allGenders").classed("down")){

      d3.select("#allGenders").classed("down",false);

    }

    d3.selectAll(".popToggle").classed("down",false);

    trendPopulations = [];

    addItem(button.attr("id"),trendPopulations);

    goodToDraw = true;

  }

}



//Was a valid operation performed?

if(goodToDraw){

  updateTrend();

  update_heatmap(trendDisorders,trendPopulations);

  //Now change the class of the button

  button.classed("down", (!isDown));

}



})



// Handle the All Disorder event

d3.select("#allDisorders").on("click",function(d){

var button = d3.select(this);

var isDown = button.classed("down");



if (isDown){

  //What should happen if the button is down and clicked? Maybe just plot one of the disorders?

}else{

  //User wants to plot all disorders

  //All buttons pop up

  d3.selectAll(".disorderToggle").classed("down",false);

  button.classed("down",true);

  trendDisorders = ["ADDADHD","AutismSpectrum","LearningDisability"];

  updateTrend();

  update_heatmap(trendDisorders,trendPopulations);

}



});



d3.select("#allGenders").on("click",function(d){

var button = d3.select(this);

var isDown = button.classed("down");



if (isDown){

  //What should happen if the button is down and clicked? Maybe just plot one of the disorders?

}else{

  //User wants to plot both genders

  //All buttons pop up

  d3.selectAll(".popToggle").classed("down",false);

  button.classed("down",true);

  trendPopulations = ["boys","girls"];

  updateTrend();

  update_heatmap(trendDisorders,trendPopulations);



}



});



//Handle the heatmap selection

d3.selectAll(".highlightBars").on("mouseover", function (d){

var selected = d3.select(this)

var type = d3.select(this).attr("id").slice(0,-13);

var typeRectClass = type + "_heatmap";



//Point highlight effect

d3.select("#" + type + "_highlight").style("fill", "white");

//Do the heatmap effect

d3.selectAll(".heatmapHover").

filter(":not(."+typeRectClass + ")")
          .transition()
          .duration(transitionDuration * 0.5)
          .style("opacity", 0.1);
});

d3.selectAll(".highlightBars").on("mouseout", function (d){
var type = d3.select(this).attr("id").slice(0,-13);;
var typeRectClass = type + "_heatmap";

//Point highlight effect

d3.select("#" + type + "_highlight").style("fill", "none");

d3.selectAll(".heatmapHover").
filter(":not(."+typeRectClass + ")")
          .transition()
          .duration(transitionDuration * 0.5)
          .style("opacity", 1);
});





  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

  ////////////////////////////  BRAIN VIZ CODE  ///////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

var prev_percentage = 200;
var where_on_stack = 1250; //num. initial nodes
var brain_color = "blue"

  var svg = d3.select("#brain2").append("svg")
        .attr("width", 1300)
        .attr("height", 1000)
        .attr('style', "background-image: url(data/brain2.svg); background-repeat: no-repeat;")
        .attr("x",25)
        .attr("y",25);

  svg.append("path")
    .attr("d", "M 50 200 L 100 200 L 160 350 ")
    .attr("stroke", brain_color)
    .attr("stroke-width", 2)
    .attr("fill", "none");

  svg.append("text")
     .attr("x", 70)
     .attr("y", 195)
     .attr("text-anchor","middle")
     .style("fill","white")
     .style("font-family","Inconsolata")
     .text("Frontal Lobe")
     .style("font-size","18px");


  // svg.append("text")
  //   .attr("x", 300)
  //   .attr("y", 300)
  //   .attr("dy", ".35em")
  //   .text("HOLAAA");

  svg.append("path")
    .attr("d", "M 260 100 L 310 100 L 330 260 ")
    .attr("stroke", brain_color)
    .attr("stroke-width", 2)
    .attr("fill", "none");

svg.append("text")
     .attr("x", 280)
     .attr("y", 95)
     .attr("text-anchor","middle")
     .style("fill","white")
     .style("font-family","Inconsolata")
     .text("Temporal Lobe")
     .style("font-size","18px");

  svg.append("path")
    .attr("d", "M 430 400 L 580 300 h 50 ")
    .attr("stroke", brain_color)
    .attr("stroke-width", 2)
    .attr("fill", "none");

  svg.append("text")
     .attr("x", 605)
     .attr("y", 295)
     .attr("text-anchor","middle")
     .style("fill","white")
     .style("font-family","Inconsolata")
     .text("Hippocampus")
     .style("font-size","18px");

  //Contains the percentge
  svg.append("rect")
      .attr('x',750)
      .attr("y",120)
      .attr("width",300)
      .attr("height",330)
      .attr("fill","black")
      .attr("stroke","#7E7E7E");

  //Start blurb
  svg.append("text")
     // .attr("id","brainPercent")
     .attr("x", 750 + (300/2))
     .attr("y", 5 + 210)
     .attr("text-anchor","middle")
     .style("fill","white")
     .style("font-family","Inconsolata")
     .style("font-weight","light")
     .text("Children at this level of poverty have only")
     .style("font-size","13px");


  //The Percentage that we want to display
  svg.append("text")
     .attr("id","brainPercent")
     .attr("x", 750 + (300/2))
     .attr("y", 140 + 210)
     .attr("text-anchor","middle")
     .style("fill","red")
     .style("font-family","Inconsolata")
     .text("98%")
     .style("font-size","175px");

  //End blurb
  svg.append("text")
     // .attr("id","brainPercent")
     .attr("x", 750 + (300/2))
     .attr("y", 175 + 210)
     .attr("text-anchor","middle")
     .style("fill","white")
     .style("font-family","Inconsolata")
     .text("of the average mass of grey matter.")
     .style("font-size","13px");


  var stackOn = new Array();
  var stackOff = new Array();

  function getRand(min, max) {
    return Math.random() * (max - min) + min;
  }

  var original_nodes = 5000;
  var stack = new Array();


//draw the nodes that will be changed, appending id's to each

var color = brain_color;
var r = 2;

for (var i=0 ; i < 5000 ; i++) {
randXs = [d3.random.normal(170, 35),d3.random.normal(315, 35),d3.random.normal(380, 35)]
randYs = [d3.random.normal(380, 35),d3.random.normal(300, 35),d3.random.normal(430, 35)]
if (i < 1334) {
  var randX = randXs[0];
  var randY = randYs[0];
} else if (i >= 1334 && i < 2666) {
  var randX = randXs[1];
  var randY = randYs[1];
} else if (i >= 2666 && i<4680) {
  var randX = randXs[2];
  var randY = randYs[2];
}else{
    //These are the ones that we're going to remove
    color = "#cd3700";
    var distibution = Math.floor(Math.random()*3);
    var randX = randXs[distibution];
    var randY = randYs[distibution];
    var r = 3;
}
var xVal = randX();
var yVal = randY();
//if (yVal > 380) { yVal = getRand(300,380); }
//if (xVal < 50) { xVal = getRand(80,200); }
stackOn.push("c"+i);
var circle = svg.append("circle")
  .attr("cx", xVal)
  .attr("cy", yVal)
  .attr("id","c"+i)
  .attr("r", r)
  .attr("fill",color);
} 

var data = [[100,-8.808],[150, -3.839],[200, -2.437]];
var result = regression('linear', data);
var slope = result.equation[0];
var yintcpt = result.equation[1];

function draw(percentage) {
var slope = 0.0637;
var yintcpt = -14.584;

var curr_delta_matter = (slope*percentage) + yintcpt;
var prev_delta_matter = (slope*prev_percentage) + yintcpt;
//Need to update the percentage display
var percentDisplay = d3.round(100 + curr_delta_matter);

var percTarget = d3.select("#brainPercent").transition().
    duration(transitionDuration/3).text(percentDisplay + "%");
prev_percentage = percentage;

var change_in_delta = curr_delta_matter - prev_delta_matter;
if (change_in_delta > 0  && stackOff.length > 0) {
  var num_to_add = Math.floor((change_in_delta/100) * 5000);
  for (var i=0 ; i < num_to_add ; i++) {
    var pointer = Math.floor((Math.random() * 30) + 1);
    if (pointer < 10) {
      var randX = d3.random.normal(170, 35);
      var randY = d3.random.normal(380, 35);
    } else if (i >= 10 && i < 20) {
      var randX = d3.random.normal(315, 35);
      var randY = d3.random.normal(300, 35);
    } else {
      var randX = d3.random.normal(380, 35);
      var randY = d3.random.normal(430, 35);
    }

    var xVal = randX();
    var yVal = randY();

    var nodeToAdd = stackOff.pop();
    stackOn.push(nodeToAdd);
    // console.log("add "+nodeToAdd);
    var circle = svg.append("circle")
      .attr("cx", xVal)
      .attr("cy", yVal)
      .attr("id",nodeToAdd)
      .attr("r", 3)
      .attr("fill",color);
  }

} else if (change_in_delta < 0 && stackOn.length > 0) {
  var num_to_rem = Math.abs(Math.floor((change_in_delta/100) * 5000));
  for (var i=0 ; i < num_to_rem ; i++) {
    var nodeToRem = stackOn.pop();
    stackOff.push(nodeToRem);
    // console.log("remove " + nodeToRem);
    d3.select("#"+nodeToRem).remove();
  }    
}
} 


d3.select('#hope').call(d3.slider().axis(true).min(100).max(200).step(5).value(200)
.on("slide", function(evt, value) {
  draw(value);
})); 


  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

  ////////////////////////////  SAT VIZ CODE  ///////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

var margin = {top: 50, right: 30, bottom: 150, left: 50},
  SATwidth = 700 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var axisColor = "white";

var SATdata = [{income: "$0 - $20,000", reading: 435,math:462,writing:429},
{income: "$20,000 - $40,000", reading:465, math:482,writing:455},
{income: "$40,000 - $60,000", reading:487,math:500,writing:474},
{income: "$60,000 - $80,000", reading:500, math:511, writing:486},
{income: "$80,000 - $100,000", reading:512, math:524, writing:499},
{income: "$100,000 - $120,000", reading:522, math:536, writing:511},
{income: "$120,000 - $140,000", reading:526, math:540, writing:515},
{income: "$140,000 - $160,000", reading:533, math:548, writing:523},
{income: "$160,000 - $200,000", reading:539, math:555, writing:531},
{income: "$200,000+", reading:565, math:586, writing:563}];

var SATselect = [true, true, true]; // selection based on buttons - reading, math, writing
var tests = ["reading", "math", "writing"]; // remains static
var incomes = ["$0 - $20,000","$20,000 - $40,000","$40,000 - $60,000","$60,000 - $80,000", "$80,000 - $100,000","$100,000 - $120,000","$120,000 - $140,000","$140,000 - $160,000", "$160,000 - $200,000","$200,000+"];

//Adds dataset based on SATselect indicator
function SATdatacalculate() {
var data = [];

SATdata.forEach( function (d, i) {
  data.push({income: d.income, score: 0});
});

SATselect.forEach( function (d, i) {
  if(d == true) {
    SATdata.forEach( function (j, k) {
      data[k].score += SATdata[k][tests[i]];
    });
  ;}
});

return data;
}

//Just sets up the axis labels and plots an intitial trend
function init_SAT(){
// Set up the intial data
data = SATdatacalculate();
maxScore = 0;
data.forEach( function (d) {
  if(d.score > maxScore) {
    maxScore = d.score;
  }
})

var x = d3.scale.ordinal()
  .rangeRoundBands([margin.left, SATwidth], .05);

var y = d3.scale.linear()
  .range([height, margin.top]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10);

var SATplot= d3.select("#SATscores").append("svg")
  .attr("id","SATplot")
  .attr("width", SATwidth + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data.map(function (d) { return d.income; }));
y.domain([0,maxScore]);

var tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-10,0])
  .html(function(d) {
    return "<div><span>Average Score:</span> <span style='color:white'>" + d.score + "</span></div>";
  });

SATplot.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
    .style("text-anchor", "end")
    .style("font-size", "10px")
    .attr("dx","-1.5em")
    .attr("dy", "-1em")
    .attr("transform", "rotate(-65)" );

SATplot.call(tip);

SATplot.append("g")
  .attr("class", "y axis")
  .attr("id","yaxis")
  .attr("transform", "translate(" + margin.left + ",0)")
  .transition()
  .duration(transitionDuration) 
  .call(yAxis)
  .selectAll("text")
    .style("text-anchor", "end")
    .style("font-size", "10px")
    .attr("dx","-.8em")
    .attr("dy", "-.55em");

SATplot.selectAll("bar")
  .data(data)
  .enter()
  .append("rect")
    .attr("class","bars")
    .attr("id", function (d, i) { return "rect-" +i; })
    .attr("x", function (d) { return x(d.income); })
    .attr("width", 35)
    .attr("y", function (d) { return y(d.score); })
    .attr("height", function (d) { return height - y(d.score); })
    .attr("fill","blue")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

SATplot.append("text")
  .attr("x", SATwidth /2)
  .attr("y", height+125)
  .style("text-anchor","middle")
  .text("Family Income of SAT Test Taker")
  .attr("fill", axisColor)
  .style("font-size","14px");

SATplot.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -10 )
  .attr("x",  -1 * (height + margin.top) /2)
  .style("text-anchor", "middle")
  .text("Mean SAT Score (out of 800)")
  .attr("fill", axisColor)
  .style("font-size","14px");

SATplot.append("text")
  .attr("y", 5 )
  .attr("x", SATwidth/2)
  .style("text-anchor", "middle")
  .text("Impact of Income on SAT Scores")
  .attr("fill", axisColor)
  .style("font-size","14px");
}

function update_SAT(){
d3.select("#SATplot").remove();

init_SAT();
}

init_SAT();


