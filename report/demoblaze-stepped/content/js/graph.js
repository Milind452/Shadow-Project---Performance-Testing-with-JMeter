/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 357.0, "series": [{"data": [[0.0, 342.0], [200.0, 22.0], [400.0, 1.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Buy phone-660", "isController": false}, {"data": [[300.0, 213.0], [600.0, 1.0], [1300.0, 1.0], [200.0, 102.0], [400.0, 45.0], [500.0, 3.0]], "isOverall": false, "label": "Laptop-672", "isController": false}, {"data": [[300.0, 105.0], [200.0, 234.0], [400.0, 24.0], [800.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Laptop-671", "isController": false}, {"data": [[0.0, 108.0], [300.0, 1.0], [1300.0, 2.0], [200.0, 36.0], [400.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "Buy monitor-736", "isController": false}, {"data": [[0.0, 195.0], [300.0, 13.0], [2400.0, 1.0], [1300.0, 2.0], [200.0, 149.0], [100.0, 3.0], [400.0, 3.0], [1000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Buy phone-624", "isController": false}, {"data": [[300.0, 33.0], [1300.0, 1.0], [200.0, 107.0], [400.0, 7.0], [500.0, 3.0]], "isOverall": false, "label": "Buy monitor-738", "isController": false}, {"data": [[300.0, 69.0], [1200.0, 1.0], [600.0, 2.0], [400.0, 67.0], [500.0, 12.0]], "isOverall": false, "label": "Buy monitor-737", "isController": false}, {"data": [[300.0, 181.0], [600.0, 1.0], [700.0, 1.0], [200.0, 135.0], [400.0, 40.0], [500.0, 9.0], [1000.0, 1.0]], "isOverall": false, "label": "Buy phone-663", "isController": false}, {"data": [[300.0, 95.0], [600.0, 2.0], [200.0, 234.0], [400.0, 34.0], [500.0, 3.0]], "isOverall": false, "label": "Buy phone-661", "isController": false}, {"data": [[300.0, 226.0], [600.0, 1.0], [700.0, 1.0], [200.0, 97.0], [400.0, 35.0], [900.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "Buy phone-662", "isController": false}, {"data": [[300.0, 95.0], [200.0, 29.0], [400.0, 20.0], [500.0, 3.0]], "isOverall": false, "label": "Logout-840", "isController": false}, {"data": [[300.0, 82.0], [600.0, 1.0], [200.0, 54.0], [400.0, 12.0], [500.0, 2.0]], "isOverall": false, "label": "Buy monitor-739", "isController": false}, {"data": [[0.0, 257.0], [300.0, 9.0], [1200.0, 1.0], [1300.0, 3.0], [200.0, 102.0], [400.0, 1.0], [100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Signup-581", "isController": false}, {"data": [[300.0, 215.0], [600.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [200.0, 109.0], [400.0, 31.0], [500.0, 4.0]], "isOverall": false, "label": "Buy laptop-712", "isController": false}, {"data": [[0.0, 125.0], [200.0, 22.0]], "isOverall": false, "label": "Place order-812", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 106.0], [200.0, 234.0], [400.0, 20.0], [500.0, 2.0]], "isOverall": false, "label": "Buy laptop-711", "isController": false}, {"data": [[0.0, 310.0], [300.0, 1.0], [200.0, 52.0]], "isOverall": false, "label": "Buy laptop-710", "isController": false}, {"data": [[300.0, 82.0], [200.0, 44.0], [400.0, 16.0], [1000.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Place order-814", "isController": false}, {"data": [[300.0, 43.0], [200.0, 96.0], [400.0, 7.0], [500.0, 1.0]], "isOverall": false, "label": "Place order-813", "isController": false}, {"data": [[0.0, 160.0], [300.0, 19.0], [700.0, 1.0], [200.0, 175.0], [1600.0, 1.0], [400.0, 6.0], [100.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Buy laptop-675", "isController": false}, {"data": [[300.0, 80.0], [1400.0, 1.0], [200.0, 54.0], [400.0, 10.0], [500.0, 2.0]], "isOverall": false, "label": "Place order-815", "isController": false}, {"data": [[300.0, 80.0], [200.0, 46.0], [400.0, 22.0], [500.0, 3.0]], "isOverall": false, "label": "Buy monitor-761", "isController": false}, {"data": [[300.0, 37.0], [200.0, 102.0], [400.0, 8.0], [500.0, 4.0]], "isOverall": false, "label": "Buy monitor-760", "isController": false}, {"data": [[300.0, 72.0], [600.0, 1.0], [200.0, 64.0], [400.0, 12.0], [500.0, 2.0]], "isOverall": false, "label": "Buy monitor-762", "isController": false}, {"data": [[300.0, 184.0], [200.0, 148.0], [400.0, 25.0], [500.0, 4.0]], "isOverall": false, "label": "Buy laptop-713", "isController": false}, {"data": [[300.0, 32.0], [1400.0, 2.0], [400.0, 65.0], [100.0, 38.0], [200.0, 9.0], [500.0, 5.0]], "isOverall": false, "label": "Buy monitor-724", "isController": false}, {"data": [[300.0, 153.0], [200.0, 173.0], [400.0, 37.0], [500.0, 8.0]], "isOverall": false, "label": "Login-614", "isController": false}, {"data": [[300.0, 232.0], [600.0, 1.0], [700.0, 1.0], [200.0, 82.0], [400.0, 48.0], [900.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "Login-613", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2400.0, 2.0], [200.0, 15.0], [900.0, 5.0], [1000.0, 13.0], [1100.0, 7.0], [300.0, 123.0], [1200.0, 1.0], [1400.0, 2.0], [1500.0, 4.0], [400.0, 45.0], [100.0, 150.0], [1600.0, 3.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Login-610", "isController": false}, {"data": [[300.0, 188.0], [200.0, 152.0], [400.0, 27.0], [500.0, 8.0]], "isOverall": false, "label": "Signup-591", "isController": false}, {"data": [[300.0, 84.0], [600.0, 1.0], [200.0, 265.0], [400.0, 19.0], [500.0, 4.0]], "isOverall": false, "label": "Login-612", "isController": false}, {"data": [[0.0, 339.0], [1200.0, 1.0], [200.0, 31.0], [100.0, 2.0]], "isOverall": false, "label": "Login-611", "isController": false}, {"data": [[300.0, 172.0], [1200.0, 1.0], [600.0, 7.0], [400.0, 163.0], [500.0, 33.0]], "isOverall": false, "label": "Signup-590", "isController": false}, {"data": [[300.0, 90.0], [600.0, 1.0], [200.0, 240.0], [400.0, 28.0], [500.0, 5.0], [1000.0, 1.0]], "isOverall": false, "label": "Buy laptop-689", "isController": false}, {"data": [[300.0, 81.0], [200.0, 251.0], [400.0, 30.0], [500.0, 2.0]], "isOverall": false, "label": "Buy laptop-688", "isController": false}, {"data": [[0.0, 322.0], [100.0, 2.0], [200.0, 41.0]], "isOverall": false, "label": "Buy laptop-687", "isController": false}, {"data": [[300.0, 76.0], [200.0, 58.0], [400.0, 14.0], [500.0, 1.0]], "isOverall": false, "label": "Cart-789", "isController": false}, {"data": [[300.0, 72.0], [200.0, 58.0], [400.0, 15.0], [500.0, 4.0]], "isOverall": false, "label": "Cart-788", "isController": false}, {"data": [[300.0, 68.0], [600.0, 1.0], [200.0, 65.0], [400.0, 13.0], [500.0, 2.0]], "isOverall": false, "label": "Cart-787", "isController": false}, {"data": [[300.0, 41.0], [200.0, 101.0], [400.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "Cart-786", "isController": false}, {"data": [[0.0, 240.0], [300.0, 11.0], [1300.0, 2.0], [700.0, 1.0], [200.0, 100.0], [400.0, 4.0], [100.0, 7.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Buy phone-645", "isController": false}, {"data": [[300.0, 41.0], [200.0, 103.0], [400.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "Cart-781", "isController": false}, {"data": [[300.0, 37.0], [200.0, 95.0], [400.0, 15.0], [500.0, 4.0]], "isOverall": false, "label": "Cart-780", "isController": false}, {"data": [[300.0, 78.0], [600.0, 7.0], [700.0, 2.0], [1400.0, 1.0], [400.0, 87.0], [200.0, 50.0], [100.0, 143.0], [800.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "Signup-563-1", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 105.0], [200.0, 241.0], [400.0, 20.0], [500.0, 2.0]], "isOverall": false, "label": "Buy phone-643", "isController": false}, {"data": [[300.0, 44.0], [600.0, 1.0], [200.0, 325.0], [400.0, 7.0]], "isOverall": false, "label": "Signup-563-0", "isController": false}, {"data": [[300.0, 276.0], [600.0, 2.0], [700.0, 1.0], [400.0, 56.0], [200.0, 29.0], [500.0, 5.0]], "isOverall": false, "label": "Buy phone-644", "isController": false}, {"data": [[0.0, 139.0], [300.0, 1.0], [1200.0, 1.0], [200.0, 10.0]], "isOverall": false, "label": "Buy monitor-759", "isController": false}, {"data": [[300.0, 157.0], [600.0, 1.0], [700.0, 1.0], [200.0, 168.0], [400.0, 33.0], [3500.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "Buy phone-641", "isController": false}, {"data": [[300.0, 35.0], [600.0, 1.0], [700.0, 1.0], [200.0, 100.0], [400.0, 11.0], [500.0, 1.0]], "isOverall": false, "label": "Cart-785", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 37.0], [200.0, 100.0], [400.0, 10.0], [500.0, 1.0]], "isOverall": false, "label": "Cart-784", "isController": false}, {"data": [[300.0, 114.0], [600.0, 1.0], [200.0, 13.0], [400.0, 18.0], [500.0, 4.0]], "isOverall": false, "label": "Cart-783", "isController": false}, {"data": [[300.0, 168.0], [700.0, 2.0], [200.0, 159.0], [400.0, 34.0], [800.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Buy phone-640", "isController": false}, {"data": [[300.0, 62.0], [600.0, 1.0], [200.0, 72.0], [800.0, 1.0], [400.0, 15.0]], "isOverall": false, "label": "Cart-782", "isController": false}, {"data": [[0.0, 357.0], [300.0, 1.0], [100.0, 2.0], [200.0, 15.0], [500.0, 1.0]], "isOverall": false, "label": "Signup-564", "isController": false}, {"data": [[300.0, 104.0], [1200.0, 1.0], [600.0, 1.0], [200.0, 234.0], [400.0, 20.0], [1000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Buy laptop-693", "isController": false}, {"data": [[0.0, 298.0], [300.0, 5.0], [100.0, 72.0], [200.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Signup-562", "isController": false}, {"data": [[300.0, 164.0], [700.0, 1.0], [200.0, 167.0], [400.0, 28.0], [500.0, 3.0]], "isOverall": false, "label": "Buy laptop-691", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 124.0], [700.0, 39.0], [800.0, 13.0], [400.0, 162.0], [1700.0, 1.0], [900.0, 6.0], [500.0, 28.0], [1000.0, 3.0]], "isOverall": false, "label": "Signup-563", "isController": false}, {"data": [[300.0, 162.0], [200.0, 151.0], [400.0, 44.0], [1000.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Buy laptop-690", "isController": false}, {"data": [[0.0, 139.0], [200.0, 8.0]], "isOverall": false, "label": "Logout-823", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 3.0], [300.0, 2.0], [200.0, 265.0], [100.0, 91.0], [400.0, 13.0]], "isOverall": false, "label": "Signup-560", "isController": false}, {"data": [[300.0, 84.0], [600.0, 1.0], [200.0, 262.0], [400.0, 19.0], [500.0, 4.0]], "isOverall": false, "label": "Buy phone-638", "isController": false}, {"data": [[0.0, 287.0], [300.0, 5.0], [100.0, 81.0], [200.0, 4.0]], "isOverall": false, "label": "Signup-561", "isController": false}, {"data": [[300.0, 98.0], [600.0, 1.0], [700.0, 1.0], [200.0, 246.0], [400.0, 19.0], [500.0, 5.0]], "isOverall": false, "label": "Buy phone-639", "isController": false}, {"data": [[0.0, 340.0], [300.0, 1.0], [100.0, 4.0], [200.0, 25.0]], "isOverall": false, "label": "Buy phone-637", "isController": false}, {"data": [[0.0, 306.0], [300.0, 1.0], [600.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [200.0, 49.0], [100.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "Buy laptop-695", "isController": false}, {"data": [[300.0, 203.0], [700.0, 2.0], [200.0, 117.0], [400.0, 36.0], [500.0, 3.0]], "isOverall": false, "label": "Monitor-721", "isController": false}, {"data": [[300.0, 270.0], [600.0, 1.0], [700.0, 1.0], [400.0, 62.0], [200.0, 23.0], [500.0, 6.0]], "isOverall": false, "label": "Buy laptop-694", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 98.0], [200.0, 230.0], [400.0, 28.0], [900.0, 1.0], [1000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Monitor-720", "isController": false}, {"data": [[1100.0, 18.0], [1200.0, 7.0], [1300.0, 3.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 5.0], [1000.0, 114.0]], "isOverall": false, "label": "Place order-793", "isController": false}, {"data": [[300.0, 30.0], [600.0, 5.0], [700.0, 2.0], [400.0, 75.0], [200.0, 3.0], [500.0, 33.0]], "isOverall": false, "label": "Place order-795", "isController": false}, {"data": [[300.0, 71.0], [200.0, 65.0], [400.0, 13.0], [500.0, 2.0]], "isOverall": false, "label": "Buy monitor-740", "isController": false}, {"data": [[300.0, 48.0], [200.0, 95.0], [400.0, 5.0]], "isOverall": false, "label": "Place order-794", "isController": false}, {"data": [[0.0, 121.0], [300.0, 1.0], [200.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "Place order-796", "isController": false}, {"data": [[0.0, 341.0], [100.0, 4.0], [200.0, 29.0]], "isOverall": false, "label": "Login-594", "isController": false}, {"data": [[300.0, 109.0], [600.0, 2.0], [700.0, 1.0], [400.0, 33.0], [200.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "Buy monitor-743", "isController": false}, {"data": [[300.0, 40.0], [200.0, 103.0], [400.0, 8.0]], "isOverall": false, "label": "Buy monitor-742", "isController": false}, {"data": [[300.0, 289.0], [600.0, 2.0], [400.0, 59.0], [200.0, 15.0], [500.0, 9.0]], "isOverall": false, "label": "Login-593", "isController": false}, {"data": [[0.0, 65.0], [300.0, 5.0], [1300.0, 3.0], [200.0, 69.0], [400.0, 4.0], [100.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "Cart-772", "isController": false}, {"data": [[300.0, 112.0], [1200.0, 1.0], [200.0, 231.0], [400.0, 25.0], [500.0, 5.0]], "isOverall": false, "label": "Login-592", "isController": false}, {"data": [[0.0, 99.0], [200.0, 45.0], [100.0, 5.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Buy monitor-744", "isController": false}, {"data": [[300.0, 221.0], [600.0, 1.0], [200.0, 101.0], [400.0, 43.0], [500.0, 5.0]], "isOverall": false, "label": "Phone-623", "isController": false}, {"data": [[300.0, 90.0], [200.0, 254.0], [400.0, 22.0], [800.0, 1.0], [1000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Phone-622", "isController": false}, {"data": [[0.0, 121.0], [300.0, 1.0], [200.0, 25.0]], "isOverall": false, "label": "Logout-839", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 3500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 19.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 22869.0, "series": [{"data": [[0.0, 22869.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 808.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 19.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 2.368888888888891, "minX": 1.60741866E12, "maxY": 19.515262515262542, "series": [{"data": [[1.60741884E12, 11.076409495548976], [1.60741902E12, 19.515262515262542], [1.60741866E12, 2.368888888888891], [1.60741896E12, 17.015669887699115], [1.60741914E12, 9.818137493905429], [1.60741908E12, 15.702153472854093], [1.60741878E12, 8.09551451187337], [1.6074192E12, 4.3346354166666705], [1.60741872E12, 5.138169257340245], [1.6074189E12, 14.048886317616452]], "isOverall": false, "label": "jp@gc - Stepping Thread Group (deprecated)", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6074192E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 49.0, "minX": 1.0, "maxY": 1210.5, "series": [{"data": [[2.0, 51.0], [8.0, 69.16666666666667], [9.0, 77.52941176470588], [10.0, 95.33333333333333], [11.0, 101.79999999999998], [3.0, 51.0], [12.0, 50.66666666666667], [13.0, 60.25], [14.0, 51.67857142857143], [15.0, 61.40624999999998], [1.0, 75.5], [4.0, 52.0], [16.0, 87.39130434782611], [17.0, 67.60714285714286], [18.0, 63.903225806451616], [19.0, 63.81818181818185], [5.0, 71.7], [20.0, 58.54545454545454], [6.0, 72.1], [7.0, 65.30769230769229]], "isOverall": false, "label": "Buy phone-660", "isController": false}, {"data": [[13.61684782608695, 67.88858695652179]], "isOverall": false, "label": "Buy phone-660-Aggregated", "isController": false}, {"data": [[2.0, 326.0], [8.0, 332.0714285714286], [9.0, 318.7058823529412], [10.0, 378.625], [11.0, 318.38095238095235], [3.0, 325.6], [12.0, 327.9523809523809], [13.0, 316.125], [14.0, 309.4074074074075], [15.0, 330.70370370370364], [1.0, 369.5], [4.0, 307.57142857142856], [16.0, 343.7142857142858], [17.0, 352.9285714285715], [18.0, 341.258064516129], [19.0, 363.45161290322585], [5.0, 304.14285714285717], [20.0, 357.5151515151515], [6.0, 344.5454545454545], [7.0, 324.1666666666667]], "isOverall": false, "label": "Laptop-672", "isController": false}, {"data": [[13.616438356164378, 337.0547945205483]], "isOverall": false, "label": "Laptop-672-Aggregated", "isController": false}, {"data": [[2.0, 263.3333333333333], [8.0, 268.07692307692315], [9.0, 288.0555555555555], [10.0, 282.4444444444444], [11.0, 296.38095238095235], [3.0, 276.5], [12.0, 295.15], [13.0, 276.69565217391306], [14.0, 279.1071428571429], [15.0, 286.7037037037037], [1.0, 287.5], [4.0, 278.33333333333337], [16.0, 306.4642857142857], [17.0, 290.0357142857143], [18.0, 343.46666666666664], [19.0, 343.57575757575745], [5.0, 270.12499999999994], [20.0, 339.51515151515144], [6.0, 303.40000000000003], [7.0, 301.5]], "isOverall": false, "label": "Laptop-671", "isController": false}, {"data": [[13.618528610354224, 302.0599455040873]], "isOverall": false, "label": "Laptop-671-Aggregated", "isController": false}, {"data": [[2.0, 159.0], [8.0, 128.0], [9.0, 53.14285714285714], [10.0, 142.2], [11.0, 94.1], [3.0, 149.5], [12.0, 91.80000000000001], [13.0, 146.33333333333334], [14.0, 167.0909090909091], [15.0, 125.10000000000001], [1.0, 252.0], [4.0, 52.0], [16.0, 114.25000000000001], [17.0, 66.91666666666667], [18.0, 135.92307692307693], [19.0, 206.18181818181822], [5.0, 152.75], [20.0, 205.5], [6.0, 156.75], [7.0, 51.0]], "isOverall": false, "label": "Buy monitor-736", "isController": false}, {"data": [[13.456953642384102, 130.08609271523176]], "isOverall": false, "label": "Buy monitor-736-Aggregated", "isController": false}, {"data": [[2.0, 237.25], [8.0, 225.16666666666663], [9.0, 197.8235294117647], [10.0, 235.50000000000009], [11.0, 151.64999999999998], [3.0, 165.25], [12.0, 184.2], [13.0, 245.99999999999997], [14.0, 178.46153846153845], [15.0, 148.5333333333333], [1.0, 288.0], [4.0, 209.57142857142856], [16.0, 146.60000000000002], [17.0, 167.73333333333335], [18.0, 125.43750000000001], [19.0, 118.72413793103446], [5.0, 208.3], [20.0, 149.05882352941177], [6.0, 270.0], [7.0, 295.33333333333337]], "isOverall": false, "label": "Buy phone-624", "isController": false}, {"data": [[13.554054054054056, 178.94594594594594]], "isOverall": false, "label": "Buy phone-624-Aggregated", "isController": false}, {"data": [[2.0, 265.0], [8.0, 258.57142857142856], [9.0, 284.0], [10.0, 271.3333333333333], [11.0, 272.33333333333337], [3.0, 269.5], [12.0, 276.19999999999993], [13.0, 280.40000000000003], [14.0, 275.90000000000003], [15.0, 267.1], [1.0, 258.0], [4.0, 264.3333333333333], [16.0, 302.23076923076917], [17.0, 315.00000000000006], [18.0, 422.41666666666663], [19.0, 341.76923076923083], [5.0, 282.25], [20.0, 355.84615384615387], [6.0, 266.5], [7.0, 313.6]], "isOverall": false, "label": "Buy monitor-738", "isController": false}, {"data": [[13.437086092715226, 304.66225165562906]], "isOverall": false, "label": "Buy monitor-738-Aggregated", "isController": false}, {"data": [[2.0, 427.0], [8.0, 405.5], [9.0, 412.1666666666667], [10.0, 446.6666666666667], [11.0, 403.77777777777777], [3.0, 392.5], [12.0, 423.90000000000003], [13.0, 411.77777777777777], [14.0, 400.0], [15.0, 434.33333333333337], [1.0, 386.0], [4.0, 378.0], [16.0, 419.0909090909091], [17.0, 426.66666666666663], [18.0, 434.74999999999994], [19.0, 513.3333333333334], [5.0, 382.75], [20.0, 467.5714285714285], [6.0, 423.0], [7.0, 411.5]], "isOverall": false, "label": "Buy monitor-737", "isController": false}, {"data": [[13.450331125827814, 429.6754966887418]], "isOverall": false, "label": "Buy monitor-737-Aggregated", "isController": false}, {"data": [[2.0, 325.6666666666667], [8.0, 318.15384615384613], [9.0, 314.22222222222223], [10.0, 315.7777777777778], [11.0, 313.71428571428567], [3.0, 330.66666666666663], [12.0, 340.10526315789474], [13.0, 343.6153846153846], [14.0, 303.3703703703705], [15.0, 308.49999999999994], [1.0, 382.5], [4.0, 303.83333333333337], [16.0, 348.41379310344826], [17.0, 314.8846153846154], [18.0, 355.8666666666667], [19.0, 376.0], [5.0, 301.625], [20.0, 362.63636363636346], [6.0, 307.4444444444445], [7.0, 354.7692307692307]], "isOverall": false, "label": "Buy phone-663", "isController": false}, {"data": [[13.611413043478263, 334.16304347826093]], "isOverall": false, "label": "Buy phone-663-Aggregated", "isController": false}, {"data": [[2.0, 276.3333333333333], [8.0, 272.5], [9.0, 290.88235294117646], [10.0, 289.2380952380953], [11.0, 288.09999999999997], [3.0, 267.0], [12.0, 288.4], [13.0, 292.34782608695656], [14.0, 288.92857142857144], [15.0, 291.86206896551727], [1.0, 294.5], [4.0, 277.0], [16.0, 301.00000000000006], [17.0, 322.42857142857144], [18.0, 342.3437499999999], [19.0, 337.0312499999999], [5.0, 277.4444444444445], [20.0, 346.5454545454546], [6.0, 310.4444444444445], [7.0, 289.57142857142856]], "isOverall": false, "label": "Buy phone-661", "isController": false}, {"data": [[13.60869565217391, 305.91304347826053]], "isOverall": false, "label": "Buy phone-661-Aggregated", "isController": false}, {"data": [[2.0, 362.6666666666667], [8.0, 316.25], [9.0, 321.29411764705884], [10.0, 330.84210526315786], [11.0, 324.2727272727273], [3.0, 312.0], [12.0, 313.45], [13.0, 311.695652173913], [14.0, 322.14285714285717], [15.0, 318.0], [1.0, 329.0], [4.0, 316.8], [16.0, 360.14285714285717], [17.0, 354.96296296296293], [18.0, 366.8], [19.0, 367.909090909091], [5.0, 334.3333333333333], [20.0, 371.090909090909], [6.0, 304.55555555555554], [7.0, 342.85714285714283]], "isOverall": false, "label": "Buy phone-662", "isController": false}, {"data": [[13.611413043478258, 339.2663043478261]], "isOverall": false, "label": "Buy phone-662-Aggregated", "isController": false}, {"data": [[2.0, 333.0], [8.0, 331.0], [9.0, 311.7142857142857], [10.0, 326.57142857142856], [11.0, 334.74999999999994], [3.0, 330.0], [12.0, 336.1111111111111], [13.0, 304.4444444444444], [14.0, 346.2], [15.0, 311.6363636363637], [4.0, 297.5], [16.0, 330.09090909090907], [17.0, 362.4615384615384], [18.0, 326.70000000000005], [19.0, 394.4666666666667], [5.0, 313.0], [20.0, 377.75], [6.0, 334.75], [7.0, 324.8]], "isOverall": false, "label": "Logout-840", "isController": false}, {"data": [[13.557823129251704, 340.013605442177]], "isOverall": false, "label": "Logout-840-Aggregated", "isController": false}, {"data": [[8.0, 319.2857142857143], [2.0, 359.0], [9.0, 303.57142857142856], [10.0, 304.2], [11.0, 301.2222222222222], [3.0, 313.0], [12.0, 307.8], [13.0, 307.5], [14.0, 314.4], [15.0, 342.59999999999997], [1.0, 325.0], [4.0, 318.3333333333333], [16.0, 326.7692307692308], [17.0, 336.90909090909093], [18.0, 371.84615384615387], [19.0, 352.4166666666667], [5.0, 329.5], [20.0, 370.3076923076923], [6.0, 296.0], [7.0, 320.8]], "isOverall": false, "label": "Buy monitor-739", "isController": false}, {"data": [[13.430463576158942, 329.9999999999999]], "isOverall": false, "label": "Buy monitor-739-Aggregated", "isController": false}, {"data": [[2.0, 260.0], [8.0, 140.49999999999997], [9.0, 143.75], [10.0, 226.6875], [11.0, 109.25], [3.0, 138.0], [12.0, 130.23076923076925], [13.0, 169.65217391304347], [14.0, 105.03846153846155], [15.0, 82.15384615384616], [1.0, 294.0], [4.0, 259.0], [16.0, 125.71874999999999], [17.0, 98.89655172413792], [18.0, 67.20689655172414], [19.0, 126.06451612903231], [5.0, 148.44444444444446], [20.0, 158.94117647058823], [6.0, 127.18181818181819], [7.0, 200.23076923076923]], "isOverall": false, "label": "Signup-581", "isController": false}, {"data": [[13.49468085106382, 134.0265957446808]], "isOverall": false, "label": "Signup-581-Aggregated", "isController": false}, {"data": [[2.0, 317.3333333333333], [8.0, 389.4666666666667], [9.0, 315.0666666666666], [10.0, 308.68750000000006], [11.0, 315.89473684210526], [3.0, 327.2], [12.0, 330.5769230769231], [13.0, 329.72727272727275], [14.0, 307.87500000000006], [15.0, 328.8846153846154], [1.0, 370.0], [4.0, 344.57142857142856], [16.0, 322.09677419354836], [17.0, 341.73333333333335], [18.0, 356.85714285714283], [19.0, 354.6875], [5.0, 328.22222222222223], [20.0, 355.7419354838709], [6.0, 317.0], [7.0, 312.4285714285714]], "isOverall": false, "label": "Buy laptop-712", "isController": false}, {"data": [[13.610497237569056, 334.63812154696126]], "isOverall": false, "label": "Buy laptop-712-Aggregated", "isController": false}, {"data": [[2.0, 50.5], [8.0, 85.16666666666667], [9.0, 85.42857142857143], [10.0, 80.14285714285714], [11.0, 98.11111111111111], [3.0, 50.333333333333336], [12.0, 120.66666666666666], [13.0, 69.9090909090909], [14.0, 87.75], [15.0, 103.30000000000001], [4.0, 118.33333333333334], [16.0, 78.8], [17.0, 68.25], [18.0, 104.08333333333331], [19.0, 67.76923076923077], [5.0, 51.666666666666664], [20.0, 83.23076923076923], [6.0, 103.25], [7.0, 50.5]], "isOverall": false, "label": "Place order-812", "isController": false}, {"data": [[13.551020408163263, 83.86394557823127]], "isOverall": false, "label": "Place order-812-Aggregated", "isController": false}, {"data": [[2.0, 289.0], [8.0, 286.40000000000003], [9.0, 277.8666666666667], [10.0, 285.8666666666667], [11.0, 278.38095238095246], [3.0, 300.0], [12.0, 284.76000000000005], [13.0, 271.04347826086945], [14.0, 283.18181818181824], [15.0, 282.962962962963], [1.0, 312.0], [4.0, 278.66666666666663], [16.0, 311.4838709677419], [17.0, 315.23333333333323], [18.0, 322.2758620689655], [19.0, 350.4516129032258], [5.0, 273.55555555555554], [20.0, 359.93750000000006], [6.0, 262.22222222222223], [7.0, 289.57142857142856]], "isOverall": false, "label": "Buy laptop-711", "isController": false}, {"data": [[13.630853994490352, 302.7245179063361]], "isOverall": false, "label": "Buy laptop-711-Aggregated", "isController": false}, {"data": [[2.0, 50.333333333333336], [8.0, 93.66666666666667], [9.0, 110.35714285714286], [10.0, 92.25000000000001], [11.0, 79.85714285714286], [3.0, 94.0], [12.0, 111.95833333333334], [13.0, 68.375], [14.0, 71.95454545454545], [15.0, 80.44444444444444], [1.0, 306.0], [4.0, 50.66666666666667], [16.0, 72.49999999999999], [17.0, 86.12499999999999], [18.0, 60.18518518518518], [19.0, 82.66666666666667], [5.0, 74.77777777777777], [20.0, 79.45161290322581], [6.0, 96.88888888888889], [7.0, 112.0]], "isOverall": false, "label": "Buy laptop-710", "isController": false}, {"data": [[13.636363636363633, 83.40771349862261]], "isOverall": false, "label": "Buy laptop-710-Aggregated", "isController": false}, {"data": [[2.0, 364.5], [8.0, 310.3333333333333], [9.0, 335.16666666666663], [10.0, 347.87499999999994], [11.0, 310.75], [3.0, 327.6666666666667], [12.0, 306.875], [13.0, 317.5454545454545], [14.0, 310.49999999999994], [15.0, 322.1], [4.0, 306.3333333333333], [16.0, 375.45454545454544], [17.0, 343.2307692307692], [18.0, 341.79999999999995], [19.0, 362.5], [5.0, 323.0], [20.0, 388.0769230769231], [6.0, 357.0], [7.0, 311.5]], "isOverall": false, "label": "Place order-814", "isController": false}, {"data": [[13.564625850340144, 338.91156462585036]], "isOverall": false, "label": "Place order-814-Aggregated", "isController": false}, {"data": [[2.0, 262.0], [8.0, 279.5], [9.0, 276.42857142857144], [10.0, 298.8571428571429], [11.0, 272.62499999999994], [3.0, 275.3333333333333], [12.0, 263.57142857142856], [13.0, 281.3636363636363], [14.0, 291.1666666666667], [15.0, 296.2], [4.0, 264.3333333333333], [16.0, 292.4], [17.0, 312.1538461538462], [18.0, 358.45454545454544], [19.0, 351.4615384615385], [5.0, 279.0], [20.0, 306.38461538461536], [6.0, 262.25], [7.0, 272.25]], "isOverall": false, "label": "Place order-813", "isController": false}, {"data": [[13.551020408163266, 298.47619047619065]], "isOverall": false, "label": "Place order-813-Aggregated", "isController": false}, {"data": [[2.0, 270.3333333333333], [8.0, 206.21428571428572], [9.0, 211.41176470588235], [10.0, 225.125], [11.0, 196.00000000000003], [3.0, 307.0], [12.0, 197.14285714285717], [13.0, 212.0], [14.0, 174.85185185185185], [15.0, 179.11111111111111], [1.0, 291.5], [4.0, 212.14285714285714], [16.0, 135.00000000000003], [17.0, 163.20689655172416], [18.0, 157.20000000000002], [19.0, 165.51612903225802], [5.0, 213.85714285714286], [20.0, 170.72727272727275], [6.0, 214.72727272727275], [7.0, 401.25]], "isOverall": false, "label": "Buy laptop-675", "isController": false}, {"data": [[13.613698630136984, 191.9616438356165]], "isOverall": false, "label": "Buy laptop-675-Aggregated", "isController": false}, {"data": [[2.0, 351.5], [8.0, 311.8], [9.0, 308.3333333333333], [10.0, 311.875], [11.0, 308.0], [3.0, 313.6666666666667], [12.0, 321.1111111111111], [13.0, 319.8888888888889], [14.0, 305.0909090909091], [15.0, 315.2], [4.0, 293.0], [16.0, 331.3636363636364], [17.0, 347.38461538461536], [18.0, 354.3], [19.0, 351.5], [5.0, 309.75], [20.0, 452.30769230769226], [6.0, 335.25], [7.0, 307.4]], "isOverall": false, "label": "Place order-815", "isController": false}, {"data": [[13.564625850340137, 336.7142857142858]], "isOverall": false, "label": "Place order-815-Aggregated", "isController": false}, {"data": [[8.0, 336.16666666666663], [2.0, 415.0], [9.0, 331.28571428571433], [10.0, 308.8571428571429], [11.0, 299.25], [3.0, 312.6666666666667], [12.0, 331.0], [13.0, 317.1111111111111], [14.0, 314.5454545454545], [15.0, 316.9], [1.0, 313.0], [4.0, 304.0], [16.0, 315.38461538461536], [17.0, 337.3636363636364], [18.0, 342.38461538461536], [19.0, 385.09090909090907], [5.0, 337.6666666666667], [20.0, 367.5], [6.0, 365.33333333333337], [7.0, 369.0]], "isOverall": false, "label": "Buy monitor-761", "isController": false}, {"data": [[13.450331125827816, 335.0132450331124]], "isOverall": false, "label": "Buy monitor-761-Aggregated", "isController": false}, {"data": [[8.0, 301.66666666666663], [2.0, 256.0], [9.0, 285.00000000000006], [10.0, 287.2857142857143], [11.0, 298.625], [3.0, 283.0], [12.0, 271.6666666666667], [13.0, 305.09999999999997], [14.0, 282.09999999999997], [15.0, 290.90909090909093], [1.0, 267.0], [4.0, 266.0], [16.0, 302.2307692307692], [17.0, 320.41666666666663], [18.0, 323.9166666666667], [19.0, 358.1818181818182], [5.0, 270.3333333333333], [20.0, 323.14285714285717], [6.0, 285.5], [7.0, 264.75]], "isOverall": false, "label": "Buy monitor-760", "isController": false}, {"data": [[13.4569536423841, 301.98675496688736]], "isOverall": false, "label": "Buy monitor-760-Aggregated", "isController": false}, {"data": [[8.0, 295.2], [2.0, 290.0], [9.0, 307.125], [10.0, 295.0], [11.0, 293.875], [3.0, 301.0], [12.0, 326.0], [13.0, 332.55555555555554], [14.0, 338.81818181818187], [15.0, 314.1], [1.0, 310.0], [4.0, 295.6666666666667], [16.0, 326.4166666666667], [17.0, 347.6666666666667], [18.0, 333.07692307692304], [19.0, 350.18181818181813], [5.0, 316.3333333333333], [20.0, 358.57142857142856], [6.0, 322.66666666666663], [7.0, 310.75]], "isOverall": false, "label": "Buy monitor-762", "isController": false}, {"data": [[13.463576158940398, 326.3509933774833]], "isOverall": false, "label": "Buy monitor-762-Aggregated", "isController": false}, {"data": [[2.0, 305.0], [8.0, 303.5333333333333], [9.0, 313.93333333333334], [10.0, 304.81249999999994], [11.0, 304.7894736842105], [3.0, 321.4], [12.0, 310.1923076923077], [13.0, 299.1818181818182], [14.0, 309.79166666666674], [15.0, 318.1538461538461], [1.0, 378.0], [4.0, 299.57142857142856], [16.0, 323.96666666666675], [17.0, 340.448275862069], [18.0, 362.89285714285717], [19.0, 341.61764705882354], [5.0, 302.44444444444446], [20.0, 350.3333333333334], [6.0, 299.625], [7.0, 318.71428571428567]], "isOverall": false, "label": "Buy laptop-713", "isController": false}, {"data": [[13.606648199445988, 323.3795013850416]], "isOverall": false, "label": "Buy laptop-713-Aggregated", "isController": false}, {"data": [[2.0, 396.0], [8.0, 436.2], [9.0, 340.0], [10.0, 383.16666666666663], [11.0, 286.0], [3.0, 415.0], [12.0, 354.70000000000005], [13.0, 331.99999999999994], [14.0, 351.6363636363636], [15.0, 385.0], [1.0, 415.0], [4.0, 393.6666666666667], [16.0, 362.66666666666663], [17.0, 334.91666666666663], [18.0, 421.49999999999994], [19.0, 298.0833333333333], [5.0, 355.75], [20.0, 300.00000000000006], [6.0, 678.75], [7.0, 362.33333333333337]], "isOverall": false, "label": "Buy monitor-724", "isController": false}, {"data": [[13.456953642384105, 360.4172185430463]], "isOverall": false, "label": "Buy monitor-724-Aggregated", "isController": false}, {"data": [[2.0, 307.25], [8.0, 323.3846153846154], [9.0, 311.0588235294117], [10.0, 301.29411764705884], [11.0, 288.2857142857143], [3.0, 303.0], [12.0, 313.7], [13.0, 303.88461538461536], [14.0, 319.6923076923078], [15.0, 312.5357142857143], [1.0, 321.0], [4.0, 316.25], [16.0, 330.0769230769231], [17.0, 333.66666666666663], [18.0, 350.9705882352941], [19.0, 371.7407407407408], [5.0, 321.6363636363636], [20.0, 361.4], [6.0, 316.8181818181818], [7.0, 320.83333333333337]], "isOverall": false, "label": "Login-614", "isController": false}, {"data": [[13.549865229110512, 326.95417789757414]], "isOverall": false, "label": "Login-614-Aggregated", "isController": false}, {"data": [[2.0, 368.0], [8.0, 309.07692307692315], [9.0, 314.1764705882353], [10.0, 321.70588235294116], [11.0, 313.9523809523809], [3.0, 311.0], [12.0, 320.4761904761905], [13.0, 333.2307692307692], [14.0, 326.75], [15.0, 317.1481481481481], [1.0, 342.5], [4.0, 332.5], [16.0, 314.40000000000003], [17.0, 359.92857142857133], [18.0, 366.20588235294116], [19.0, 371.6296296296296], [5.0, 315.99999999999994], [20.0, 389.8285714285714], [6.0, 327.5454545454545], [7.0, 333.5833333333333]], "isOverall": false, "label": "Login-613", "isController": false}, {"data": [[13.547169811320746, 338.78975741239884]], "isOverall": false, "label": "Login-613-Aggregated", "isController": false}, {"data": [[2.0, 396.3333333333333], [8.0, 450.5714285714286], [9.0, 451.4117647058824], [10.0, 371.77777777777777], [11.0, 341.90476190476187], [3.0, 805.5], [12.0, 450.8260869565217], [13.0, 450.24999999999994], [14.0, 398.60869565217394], [15.0, 429.1034482758621], [1.0, 418.0], [4.0, 595.375], [16.0, 302.6875], [17.0, 366.9642857142858], [18.0, 289.4516129032258], [19.0, 394.7857142857142], [5.0, 430.90909090909093], [20.0, 480.6285714285713], [6.0, 458.6363636363637], [7.0, 322.66666666666663]], "isOverall": false, "label": "Login-610", "isController": false}, {"data": [[13.518716577540111, 404.0588235294117]], "isOverall": false, "label": "Login-610-Aggregated", "isController": false}, {"data": [[2.0, 327.6666666666667], [8.0, 324.53333333333336], [9.0, 308.0], [10.0, 310.4444444444444], [11.0, 299.54999999999995], [3.0, 301.75], [12.0, 312.92], [13.0, 299.7727272727273], [14.0, 311.9615384615385], [15.0, 315.00000000000006], [1.0, 325.5], [4.0, 309.6666666666667], [16.0, 313.31249999999994], [17.0, 362.31034482758616], [18.0, 350.3103448275862], [19.0, 356.1666666666666], [5.0, 308.5], [20.0, 358.02857142857147], [6.0, 336.90000000000003], [7.0, 324.4615384615385]], "isOverall": false, "label": "Signup-591", "isController": false}, {"data": [[13.527999999999995, 326.9786666666668]], "isOverall": false, "label": "Signup-591-Aggregated", "isController": false}, {"data": [[2.0, 291.25], [8.0, 275.84615384615387], [9.0, 278.52941176470586], [10.0, 273.0555555555556], [11.0, 287.04761904761904], [3.0, 258.3333333333333], [12.0, 278.9090909090908], [13.0, 281.76], [14.0, 267.8181818181818], [15.0, 296.89655172413785], [1.0, 288.0], [4.0, 283.25], [16.0, 294.12903225806446], [17.0, 313.3076923076923], [18.0, 313.00000000000006], [19.0, 346.1851851851852], [5.0, 263.72727272727275], [20.0, 315.17142857142863], [6.0, 294.6363636363637], [7.0, 282.61538461538464]], "isOverall": false, "label": "Login-612", "isController": false}, {"data": [[13.52278820375335, 295.28418230563017]], "isOverall": false, "label": "Login-612-Aggregated", "isController": false}, {"data": [[2.0, 122.66666666666667], [8.0, 52.61538461538461], [9.0, 173.2941176470588], [10.0, 62.05555555555556], [11.0, 51.19047619047618], [3.0, 102.25], [12.0, 70.6086956521739], [13.0, 59.75000000000001], [14.0, 61.090909090909086], [15.0, 67.72413793103448], [1.0, 189.0], [4.0, 78.25], [16.0, 72.81250000000001], [17.0, 88.39285714285717], [18.0, 73.38709677419355], [19.0, 59.67857142857142], [5.0, 89.0909090909091], [20.0, 70.25714285714284], [6.0, 51.090909090909086], [7.0, 67.07692307692308]], "isOverall": false, "label": "Login-611", "isController": false}, {"data": [[13.514745308311, 73.97587131367298]], "isOverall": false, "label": "Login-611-Aggregated", "isController": false}, {"data": [[2.0, 387.0], [8.0, 413.93333333333334], [9.0, 400.12499999999994], [10.0, 413.94444444444446], [11.0, 414.04999999999995], [3.0, 399.4], [12.0, 404.04], [13.0, 406.9090909090909], [14.0, 404.0], [15.0, 431.73076923076917], [1.0, 449.5], [4.0, 400.99999999999994], [16.0, 442.7812500000001], [17.0, 467.6896551724138], [18.0, 453.55172413793105], [19.0, 437.83333333333337], [5.0, 399.1], [20.0, 459.3999999999999], [6.0, 425.3], [7.0, 415.46153846153845]], "isOverall": false, "label": "Signup-590", "isController": false}, {"data": [[13.49734042553191, 428.02925531914883]], "isOverall": false, "label": "Signup-590-Aggregated", "isController": false}, {"data": [[2.0, 277.6666666666667], [8.0, 271.07142857142856], [9.0, 275.5625], [10.0, 288.2352941176471], [11.0, 289.95454545454544], [3.0, 278.0], [12.0, 275.75], [13.0, 285.625], [14.0, 271.51851851851853], [15.0, 295.30769230769226], [1.0, 338.5], [4.0, 260.0], [16.0, 307.0], [17.0, 371.0], [18.0, 332.03333333333336], [19.0, 329.4193548387097], [5.0, 270.85714285714283], [20.0, 348.7575757575757], [6.0, 291.6363636363636], [7.0, 277.75000000000006]], "isOverall": false, "label": "Buy laptop-689", "isController": false}, {"data": [[13.616438356164384, 305.1041095890412]], "isOverall": false, "label": "Buy laptop-689-Aggregated", "isController": false}, {"data": [[2.0, 275.6666666666667], [8.0, 280.3571428571429], [9.0, 284.43749999999994], [10.0, 283.2352941176471], [11.0, 280.54545454545456], [3.0, 274.0], [12.0, 298.7619047619048], [13.0, 280.5652173913044], [14.0, 270.11111111111103], [15.0, 296.0400000000001], [1.0, 320.0], [4.0, 262.42857142857144], [16.0, 309.61290322580646], [17.0, 301.93333333333334], [18.0, 330.67857142857144], [19.0, 349.74193548387103], [5.0, 260.16666666666663], [20.0, 325.12121212121207], [6.0, 282.0833333333333], [7.0, 274.16666666666663]], "isOverall": false, "label": "Buy laptop-688", "isController": false}, {"data": [[13.645604395604389, 299.3406593406593]], "isOverall": false, "label": "Buy laptop-688-Aggregated", "isController": false}, {"data": [[2.0, 53.0], [8.0, 81.57142857142857], [9.0, 77.17647058823528], [10.0, 79.31249999999999], [11.0, 60.95238095238095], [3.0, 91.8], [12.0, 80.95238095238095], [13.0, 87.41666666666667], [14.0, 59.33333333333334], [15.0, 80.00000000000001], [1.0, 78.0], [4.0, 79.14285714285714], [16.0, 89.67857142857143], [17.0, 66.58620689655173], [18.0, 78.51612903225808], [19.0, 78.29999999999998], [5.0, 50.99999999999999], [20.0, 71.3030303030303], [6.0, 109.0], [7.0, 69.08333333333333]], "isOverall": false, "label": "Buy laptop-687", "isController": false}, {"data": [[13.61095890410958, 76.31232876712328]], "isOverall": false, "label": "Buy laptop-687-Aggregated", "isController": false}, {"data": [[2.0, 328.5], [8.0, 333.0], [9.0, 304.42857142857144], [10.0, 318.375], [11.0, 298.125], [3.0, 324.6666666666667], [12.0, 302.7142857142857], [13.0, 302.20000000000005], [14.0, 306.1818181818182], [15.0, 331.5833333333333], [4.0, 357.6666666666667], [16.0, 305.6363636363637], [17.0, 341.54545454545456], [18.0, 327.5833333333333], [19.0, 372.07692307692304], [5.0, 299.0], [20.0, 365.46153846153845], [6.0, 329.6], [7.0, 308.5]], "isOverall": false, "label": "Cart-789", "isController": false}, {"data": [[13.496644295302016, 326.6442953020134]], "isOverall": false, "label": "Cart-789-Aggregated", "isController": false}, {"data": [[2.0, 350.5], [8.0, 316.3333333333333], [9.0, 319.57142857142856], [10.0, 324.99999999999994], [11.0, 302.5], [3.0, 331.0], [12.0, 296.5], [13.0, 300.22222222222223], [14.0, 320.2727272727273], [15.0, 307.5833333333333], [4.0, 316.0], [16.0, 350.4545454545455], [17.0, 329.45454545454544], [18.0, 333.5833333333333], [19.0, 386.15384615384613], [5.0, 318.3333333333333], [20.0, 393.46153846153845], [6.0, 320.8], [7.0, 305.25]], "isOverall": false, "label": "Cart-788", "isController": false}, {"data": [[13.489932885906049, 332.0939597315437]], "isOverall": false, "label": "Cart-788-Aggregated", "isController": false}, {"data": [[2.0, 297.5], [8.0, 293.0], [9.0, 291.99999999999994], [10.0, 328.25], [11.0, 308.22222222222223], [3.0, 304.6666666666667], [12.0, 308.0], [13.0, 327.79999999999995], [14.0, 307.5833333333333], [15.0, 305.5], [4.0, 316.6666666666667], [16.0, 357.49999999999994], [17.0, 314.40000000000003], [18.0, 355.00000000000006], [19.0, 350.69230769230774], [5.0, 328.6666666666667], [20.0, 343.38461538461536], [6.0, 350.0], [7.0, 314.0]], "isOverall": false, "label": "Cart-787", "isController": false}, {"data": [[13.496644295302012, 326.1543624161075]], "isOverall": false, "label": "Cart-787-Aggregated", "isController": false}, {"data": [[2.0, 288.5], [8.0, 279.66666666666663], [9.0, 259.7142857142857], [10.0, 290.0], [11.0, 268.87499999999994], [3.0, 270.0], [12.0, 282.50000000000006], [13.0, 300.7777777777778], [14.0, 274.5454545454546], [15.0, 287.6666666666667], [4.0, 286.0], [16.0, 293.0909090909091], [17.0, 316.27272727272725], [18.0, 312.8181818181818], [19.0, 325.64285714285717], [5.0, 290.3333333333333], [20.0, 329.9230769230769], [6.0, 259.0], [7.0, 260.25]], "isOverall": false, "label": "Cart-786", "isController": false}, {"data": [[13.49664429530202, 294.295302013423]], "isOverall": false, "label": "Cart-786-Aggregated", "isController": false}, {"data": [[2.0, 221.5], [8.0, 164.08333333333334], [9.0, 162.05882352941177], [10.0, 214.3333333333334], [11.0, 132.15], [3.0, 229.4], [12.0, 116.8888888888889], [13.0, 140.49999999999997], [14.0, 158.71428571428572], [15.0, 127.65625], [1.0, 190.0], [4.0, 174.25], [16.0, 126.34782608695653], [17.0, 146.2142857142857], [18.0, 123.70967741935483], [19.0, 107.0], [5.0, 123.20000000000002], [20.0, 135.0], [6.0, 273.2], [7.0, 159.92307692307696]], "isOverall": false, "label": "Buy phone-645", "isController": false}, {"data": [[13.6141304347826, 146.32336956521738]], "isOverall": false, "label": "Buy phone-645-Aggregated", "isController": false}, {"data": [[8.0, 268.8], [2.0, 259.0], [9.0, 295.125], [10.0, 265.7142857142857], [11.0, 270.5], [3.0, 300.0], [12.0, 285.90000000000003], [13.0, 287.77777777777777], [14.0, 288.54545454545456], [15.0, 269.75], [1.0, 261.0], [4.0, 261.6666666666667], [16.0, 280.5], [17.0, 314.75], [18.0, 343.6923076923077], [19.0, 317.90909090909093], [5.0, 281.0], [20.0, 343.92857142857144], [6.0, 263.1666666666667], [7.0, 262.75]], "isOverall": false, "label": "Cart-781", "isController": false}, {"data": [[13.45033112582782, 295.5562913907285]], "isOverall": false, "label": "Cart-781-Aggregated", "isController": false}, {"data": [[8.0, 269.6], [2.0, 277.0], [9.0, 274.625], [10.0, 300.57142857142856], [11.0, 286.125], [3.0, 274.6666666666667], [12.0, 280.70000000000005], [13.0, 316.22222222222223], [14.0, 275.8181818181818], [15.0, 307.4545454545455], [1.0, 259.0], [4.0, 268.0], [16.0, 285.54545454545456], [17.0, 324.91666666666663], [18.0, 344.5], [19.0, 360.9], [5.0, 265.6666666666667], [20.0, 392.2142857142857], [6.0, 286.0], [7.0, 290.5]], "isOverall": false, "label": "Cart-780", "isController": false}, {"data": [[13.45033112582782, 309.9933774834436]], "isOverall": false, "label": "Cart-780-Aggregated", "isController": false}, {"data": [[2.0, 398.6666666666667], [8.0, 385.5625], [9.0, 305.82352941176464], [10.0, 280.8125], [11.0, 307.69999999999993], [3.0, 333.5], [12.0, 338.4230769230769], [13.0, 298.47826086956513], [14.0, 319.26923076923083], [15.0, 294.7307692307692], [1.0, 576.5], [4.0, 392.0], [16.0, 307.99999999999994], [17.0, 265.87096774193543], [18.0, 247.29629629629625], [19.0, 333.02941176470586], [5.0, 339.90000000000003], [20.0, 268.21875], [6.0, 350.22222222222223], [7.0, 371.1428571428571]], "isOverall": false, "label": "Signup-563-1", "isController": false}, {"data": [[13.477453580901857, 311.0053050397878]], "isOverall": false, "label": "Signup-563-1-Aggregated", "isController": false}, {"data": [[2.0, 297.75], [8.0, 268.6363636363637], [9.0, 272.29411764705884], [10.0, 340.57142857142856], [11.0, 280.42105263157896], [3.0, 269.0], [12.0, 274.33333333333337], [13.0, 275.0909090909091], [14.0, 292.89285714285717], [15.0, 290.54838709677415], [1.0, 295.0], [4.0, 305.0], [16.0, 307.5000000000001], [17.0, 305.8928571428571], [18.0, 314.84375000000006], [19.0, 345.8787878787879], [5.0, 287.2727272727273], [20.0, 329.24999999999994], [6.0, 273.4], [7.0, 273.07142857142856]], "isOverall": false, "label": "Buy phone-643", "isController": false}, {"data": [[13.58536585365854, 301.2303523035229]], "isOverall": false, "label": "Buy phone-643-Aggregated", "isController": false}, {"data": [[2.0, 290.3333333333333], [8.0, 290.4375], [9.0, 283.4117647058823], [10.0, 279.5625], [11.0, 283.54999999999995], [3.0, 310.6666666666667], [12.0, 287.73076923076917], [13.0, 287.17391304347825], [14.0, 291.73076923076934], [15.0, 292.42307692307685], [1.0, 314.5], [4.0, 274.625], [16.0, 291.9032258064516], [17.0, 276.5483870967742], [18.0, 283.92592592592587], [19.0, 286.23529411764696], [5.0, 289.9], [20.0, 278.90625000000006], [6.0, 283.44444444444446], [7.0, 276.85714285714283]], "isOverall": false, "label": "Signup-563-0", "isController": false}, {"data": [[13.477453580901857, 285.71618037135266]], "isOverall": false, "label": "Signup-563-0-Aggregated", "isController": false}, {"data": [[2.0, 357.25], [8.0, 350.8333333333333], [9.0, 350.1875], [10.0, 343.85714285714283], [11.0, 331.59999999999997], [3.0, 341.2], [12.0, 326.33333333333326], [13.0, 339.37500000000006], [14.0, 334.71428571428567], [15.0, 347.96875], [1.0, 350.0], [4.0, 348.0], [16.0, 343.9565217391304], [17.0, 368.75000000000006], [18.0, 365.65624999999994], [19.0, 390.65625], [5.0, 356.0], [20.0, 374.21212121212125], [6.0, 377.8], [7.0, 354.3571428571428]], "isOverall": false, "label": "Buy phone-644", "isController": false}, {"data": [[13.582655826558266, 354.6368563685636]], "isOverall": false, "label": "Buy phone-644-Aggregated", "isController": false}, {"data": [[8.0, 50.166666666666664], [2.0, 267.0], [9.0, 50.0], [10.0, 87.16666666666667], [11.0, 52.25], [3.0, 126.0], [12.0, 97.88888888888889], [13.0, 50.699999999999996], [14.0, 50.6], [15.0, 59.18181818181818], [1.0, 62.0], [4.0, 50.0], [16.0, 78.53846153846153], [17.0, 69.83333333333333], [18.0, 174.33333333333331], [19.0, 68.0], [5.0, 52.333333333333336], [20.0, 53.07692307692309], [6.0, 121.83333333333334], [7.0, 50.25]], "isOverall": false, "label": "Buy monitor-759", "isController": false}, {"data": [[13.443708609271523, 76.75496688741721]], "isOverall": false, "label": "Buy monitor-759-Aggregated", "isController": false}, {"data": [[2.0, 320.0], [8.0, 308.66666666666663], [9.0, 296.8823529411765], [10.0, 318.4], [11.0, 314.49999999999994], [3.0, 328.0], [12.0, 311.04761904761904], [13.0, 310.08695652173924], [14.0, 302.9999999999999], [15.0, 320.3225806451613], [1.0, 352.0], [4.0, 322.4], [16.0, 326.125], [17.0, 429.32142857142867], [18.0, 378.235294117647], [19.0, 343.3125000000001], [5.0, 304.45454545454544], [20.0, 375.6562500000001], [6.0, 317.3636363636363], [7.0, 316.5833333333333]], "isOverall": false, "label": "Buy phone-641", "isController": false}, {"data": [[13.593495934959353, 336.4308943089432]], "isOverall": false, "label": "Buy phone-641-Aggregated", "isController": false}, {"data": [[2.0, 276.5], [8.0, 296.0], [9.0, 270.2857142857143], [10.0, 285.125], [11.0, 284.5], [3.0, 280.0], [12.0, 277.875], [13.0, 275.22222222222223], [14.0, 301.3636363636364], [15.0, 296.41666666666674], [4.0, 266.6666666666667], [16.0, 290.6363636363637], [17.0, 288.2727272727273], [18.0, 386.25], [19.0, 343.53846153846155], [5.0, 276.6666666666667], [20.0, 341.84615384615387], [6.0, 266.4], [7.0, 265.25]], "isOverall": false, "label": "Cart-785", "isController": false}, {"data": [[13.489932885906043, 302.8590604026844]], "isOverall": false, "label": "Cart-785-Aggregated", "isController": false}, {"data": [[2.0, 289.5], [8.0, 440.5], [9.0, 284.2857142857143], [10.0, 277.8571428571429], [11.0, 284.1111111111111], [3.0, 300.3333333333333], [12.0, 295.375], [13.0, 275.0], [14.0, 291.1666666666667], [15.0, 309.5], [4.0, 272.0], [16.0, 305.3636363636364], [17.0, 300.09090909090907], [18.0, 318.08333333333337], [19.0, 334.75], [5.0, 269.3333333333333], [20.0, 318.7142857142857], [6.0, 316.8], [7.0, 267.75]], "isOverall": false, "label": "Cart-784", "isController": false}, {"data": [[13.51006711409396, 306.18120805369136]], "isOverall": false, "label": "Cart-784-Aggregated", "isController": false}, {"data": [[2.0, 439.5], [8.0, 320.8], [9.0, 313.875], [10.0, 317.5714285714286], [11.0, 318.44444444444446], [3.0, 348.0], [12.0, 331.77777777777777], [13.0, 332.0], [14.0, 344.81818181818187], [15.0, 364.91666666666663], [4.0, 334.6666666666667], [16.0, 331.3], [17.0, 345.5833333333333], [18.0, 351.3333333333333], [19.0, 419.16666666666663], [5.0, 330.6666666666667], [20.0, 384.8571428571429], [6.0, 345.6], [7.0, 338.75]], "isOverall": false, "label": "Cart-783", "isController": false}, {"data": [[13.506666666666666, 349.6400000000001]], "isOverall": false, "label": "Cart-783-Aggregated", "isController": false}, {"data": [[2.0, 304.5], [8.0, 300.66666666666663], [9.0, 312.8235294117647], [10.0, 297.85714285714283], [11.0, 306.157894736842], [3.0, 315.5], [12.0, 310.14285714285717], [13.0, 306.9090909090909], [14.0, 308.77777777777777], [15.0, 310.5483870967742], [1.0, 621.0], [4.0, 309.8], [16.0, 320.36000000000007], [17.0, 347.24999999999994], [18.0, 359.4242424242424], [19.0, 376.80645161290323], [5.0, 316.6363636363636], [20.0, 370.4545454545455], [6.0, 308.2], [7.0, 310.53846153846155]], "isOverall": false, "label": "Buy phone-640", "isController": false}, {"data": [[13.59349593495935, 329.5365853658535]], "isOverall": false, "label": "Buy phone-640-Aggregated", "isController": false}, {"data": [[8.0, 298.8333333333333], [2.0, 303.0], [9.0, 305.375], [10.0, 324.42857142857144], [11.0, 323.0], [3.0, 304.0], [12.0, 364.22222222222223], [13.0, 302.1111111111111], [14.0, 316.0], [15.0, 300.5833333333333], [1.0, 321.0], [4.0, 321.3333333333333], [16.0, 300.0], [17.0, 348.1666666666667], [18.0, 359.0], [19.0, 337.70000000000005], [5.0, 311.3333333333333], [20.0, 337.8666666666667], [6.0, 310.2], [7.0, 329.5]], "isOverall": false, "label": "Cart-782", "isController": false}, {"data": [[13.463576158940398, 325.07947019867566]], "isOverall": false, "label": "Cart-782-Aggregated", "isController": false}, {"data": [[2.0, 67.0], [8.0, 77.06250000000001], [9.0, 75.25], [10.0, 75.4375], [11.0, 73.55], [3.0, 66.33333333333334], [12.0, 72.03846153846153], [13.0, 93.52173913043478], [14.0, 72.1923076923077], [15.0, 64.88461538461539], [1.0, 85.5], [4.0, 88.625], [16.0, 68.1875], [17.0, 70.3103448275862], [18.0, 79.64285714285712], [19.0, 76.55882352941175], [5.0, 107.2], [20.0, 69.1875], [6.0, 63.7], [7.0, 64.69230769230771]], "isOverall": false, "label": "Signup-564", "isController": false}, {"data": [[13.486702127659571, 74.46808510638294]], "isOverall": false, "label": "Signup-564-Aggregated", "isController": false}, {"data": [[2.0, 276.0], [8.0, 281.31249999999994], [9.0, 341.2857142857143], [10.0, 282.6875], [11.0, 289.9545454545455], [3.0, 288.8], [12.0, 323.6521739130435], [13.0, 268.8260869565218], [14.0, 299.4583333333333], [15.0, 294.1923076923078], [1.0, 323.0], [4.0, 282.8571428571429], [16.0, 284.1], [17.0, 308.6451612903226], [18.0, 336.8518518518518], [19.0, 345.9411764705881], [5.0, 295.62499999999994], [20.0, 340.06451612903226], [6.0, 284.3333333333333], [7.0, 276.0769230769231]], "isOverall": false, "label": "Buy laptop-693", "isController": false}, {"data": [[13.639118457300265, 306.39669421487605]], "isOverall": false, "label": "Buy laptop-693-Aggregated", "isController": false}, {"data": [[2.0, 85.25], [8.0, 97.0], [9.0, 89.66666666666664], [10.0, 102.05555555555554], [11.0, 99.24999999999999], [3.0, 90.85714285714286], [12.0, 104.8076923076923], [13.0, 92.41666666666669], [14.0, 91.08], [15.0, 97.25925925925927], [1.0, 110.0], [4.0, 86.28571428571429], [16.0, 108.0], [17.0, 95.48387096774194], [18.0, 91.51851851851852], [19.0, 94.32352941176472], [5.0, 155.0], [20.0, 113.3125], [6.0, 95.875], [7.0, 91.6]], "isOverall": false, "label": "Signup-562", "isController": false}, {"data": [[13.480106100795764, 99.33952254641903]], "isOverall": false, "label": "Signup-562-Aggregated", "isController": false}, {"data": [[2.0, 307.6666666666667], [8.0, 312.2666666666667], [9.0, 301.13333333333327], [10.0, 310.375], [11.0, 317.34782608695645], [3.0, 302.0], [12.0, 306.0952380952381], [13.0, 307.21739130434776], [14.0, 309.91666666666674], [15.0, 317.3928571428571], [1.0, 337.0], [4.0, 307.5714285714286], [16.0, 331.4333333333332], [17.0, 351.51612903225805], [18.0, 324.61538461538464], [19.0, 354.14705882352933], [5.0, 309.57142857142856], [20.0, 332.19354838709677], [6.0, 304.1], [7.0, 314.46153846153845]], "isOverall": false, "label": "Buy laptop-691", "isController": false}, {"data": [[13.641873278236913, 322.6528925619833]], "isOverall": false, "label": "Buy laptop-691-Aggregated", "isController": false}, {"data": [[2.0, 689.3333333333334], [8.0, 676.1875], [9.0, 589.2941176470588], [10.0, 560.5], [11.0, 591.35], [3.0, 644.3333333333334], [12.0, 626.1923076923075], [13.0, 585.6956521739129], [14.0, 610.9999999999999], [15.0, 587.423076923077], [1.0, 891.0], [4.0, 666.625], [16.0, 599.9354838709679], [17.0, 542.4193548387096], [18.0, 531.3333333333335], [19.0, 619.3529411764706], [5.0, 629.9000000000001], [20.0, 547.2187500000001], [6.0, 633.8888888888889], [7.0, 648.2142857142858]], "isOverall": false, "label": "Signup-563", "isController": false}, {"data": [[13.477453580901857, 596.8143236074271]], "isOverall": false, "label": "Signup-563-Aggregated", "isController": false}, {"data": [[2.0, 343.0], [8.0, 298.5], [9.0, 305.5625], [10.0, 374.8823529411764], [11.0, 321.81818181818176], [3.0, 308.8], [12.0, 302.1904761904762], [13.0, 308.65217391304344], [14.0, 310.59259259259255], [15.0, 322.4230769230769], [1.0, 362.0], [4.0, 304.42857142857144], [16.0, 338.7586206896552], [17.0, 327.12903225806446], [18.0, 357.2142857142857], [19.0, 384.64516129032256], [5.0, 299.1666666666667], [20.0, 357.03124999999994], [6.0, 328.33333333333337], [7.0, 310.0]], "isOverall": false, "label": "Buy laptop-690", "isController": false}, {"data": [[13.628099173553716, 332.1542699724516]], "isOverall": false, "label": "Buy laptop-690-Aggregated", "isController": false}, {"data": [[2.0, 61.5], [8.0, 61.6], [9.0, 67.5], [10.0, 72.5], [11.0, 62.62500000000001], [3.0, 64.33333333333333], [12.0, 60.55555555555556], [13.0, 108.44444444444444], [14.0, 62.45454545454545], [15.0, 88.4], [4.0, 58.0], [16.0, 62.909090909090914], [17.0, 78.0], [18.0, 86.2], [19.0, 63.785714285714285], [5.0, 66.0], [20.0, 61.692307692307686], [6.0, 167.25], [7.0, 102.0]], "isOverall": false, "label": "Logout-823", "isController": false}, {"data": [[13.564625850340137, 74.9931972789116]], "isOverall": false, "label": "Logout-823-Aggregated", "isController": false}, {"data": [[2.0, 199.25], [8.0, 328.875], [9.0, 223.33333333333331], [10.0, 213.88888888888889], [11.0, 203.7], [3.0, 238.0], [12.0, 217.92307692307688], [13.0, 239.4090909090909], [14.0, 215.74074074074073], [15.0, 232.38461538461542], [1.0, 200.0], [4.0, 208.42857142857144], [16.0, 225.38709677419354], [17.0, 257.45161290322574], [18.0, 252.33333333333334], [19.0, 220.02941176470586], [5.0, 218.20000000000002], [20.0, 212.84375000000003], [6.0, 209.625], [7.0, 336.59999999999997]], "isOverall": false, "label": "Signup-560", "isController": false}, {"data": [[13.488063660477456, 234.58620689655186]], "isOverall": false, "label": "Signup-560-Aggregated", "isController": false}, {"data": [[2.0, 268.25], [8.0, 315.0833333333333], [9.0, 288.11111111111114], [10.0, 276.7368421052632], [11.0, 277.42857142857144], [3.0, 278.75], [12.0, 283.15000000000003], [13.0, 270.08695652173907], [14.0, 292.1851851851852], [15.0, 282.6333333333334], [1.0, 291.5], [4.0, 293.2857142857143], [16.0, 301.64000000000004], [17.0, 281.8333333333333], [18.0, 338.9677419354839], [19.0, 336.9999999999999], [5.0, 280.30000000000007], [20.0, 320.74193548387103], [6.0, 306.9090909090909], [7.0, 274.24999999999994]], "isOverall": false, "label": "Buy phone-638", "isController": false}, {"data": [[13.54324324324324, 297.718918918919]], "isOverall": false, "label": "Buy phone-638-Aggregated", "isController": false}, {"data": [[2.0, 89.25], [8.0, 90.49999999999999], [9.0, 92.33333333333333], [10.0, 129.83333333333331], [11.0, 95.5], [3.0, 92.85714285714285], [12.0, 105.5], [13.0, 95.99999999999999], [14.0, 93.8076923076923], [15.0, 97.50000000000001], [1.0, 109.0], [4.0, 86.00000000000001], [16.0, 115.38709677419352], [17.0, 105.9032258064516], [18.0, 94.85185185185183], [19.0, 98.41176470588236], [5.0, 92.4], [20.0, 89.65625], [6.0, 94.25], [7.0, 101.73333333333333]], "isOverall": false, "label": "Signup-561", "isController": false}, {"data": [[13.485411140583562, 99.63660477453577]], "isOverall": false, "label": "Signup-561-Aggregated", "isController": false}, {"data": [[2.0, 294.75], [8.0, 269.99999999999994], [9.0, 276.7222222222222], [10.0, 282.2631578947369], [11.0, 284.5238095238096], [3.0, 260.5], [12.0, 278.5], [13.0, 301.04347826086956], [14.0, 282.2962962962963], [15.0, 290.2], [1.0, 423.5], [4.0, 272.1666666666667], [16.0, 307.8], [17.0, 320.96551724137925], [18.0, 324.36363636363626], [19.0, 336.1874999999999], [5.0, 276.7272727272727], [20.0, 328.87096774193554], [6.0, 264.45454545454544], [7.0, 271.3636363636364]], "isOverall": false, "label": "Buy phone-639", "isController": false}, {"data": [[13.548648648648646, 299.8648648648649]], "isOverall": false, "label": "Buy phone-639-Aggregated", "isController": false}, {"data": [[2.0, 51.25], [8.0, 85.25], [9.0, 76.55555555555556], [10.0, 63.05263157894736], [11.0, 63.2], [3.0, 50.5], [12.0, 71.33333333333333], [13.0, 68.33333333333333], [14.0, 68.11538461538463], [15.0, 60.96666666666667], [1.0, 75.5], [4.0, 113.14285714285714], [16.0, 95.32000000000001], [17.0, 79.2], [18.0, 59.53125000000001], [19.0, 58.137931034482754], [5.0, 71.8], [20.0, 59.55882352941176], [6.0, 51.36363636363636], [7.0, 50.66666666666667]], "isOverall": false, "label": "Buy phone-637", "isController": false}, {"data": [[13.54864864864865, 68.15405405405406]], "isOverall": false, "label": "Buy phone-637-Aggregated", "isController": false}, {"data": [[2.0, 61.0], [8.0, 88.37499999999999], [9.0, 105.71428571428572], [10.0, 141.0625], [11.0, 78.0], [3.0, 103.6], [12.0, 135.08333333333334], [13.0, 125.00000000000003], [14.0, 61.68181818181818], [15.0, 87.55555555555557], [1.0, 323.0], [4.0, 91.00000000000001], [16.0, 79.89999999999999], [17.0, 99.5], [18.0, 77.0], [19.0, 125.66666666666667], [5.0, 84.5], [20.0, 84.12903225806454], [6.0, 277.55555555555554], [7.0, 77.00000000000001]], "isOverall": false, "label": "Buy laptop-695", "isController": false}, {"data": [[13.636363636363638, 101.93663911845735]], "isOverall": false, "label": "Buy laptop-695-Aggregated", "isController": false}, {"data": [[2.0, 326.3333333333333], [8.0, 316.59999999999997], [9.0, 307.7142857142857], [10.0, 326.25], [11.0, 314.20000000000005], [3.0, 326.8], [12.0, 300.0], [13.0, 308.2380952380953], [14.0, 335.96000000000004], [15.0, 315.03846153846155], [1.0, 320.0], [4.0, 345.5714285714286], [16.0, 333.12903225806446], [17.0, 344.0689655172414], [18.0, 370.99999999999994], [19.0, 350.51612903225805], [5.0, 326.33333333333326], [20.0, 351.46875000000006], [6.0, 333.7142857142857], [7.0, 338.86666666666673]], "isOverall": false, "label": "Monitor-721", "isController": false}, {"data": [[13.614958448753459, 332.23822714681455]], "isOverall": false, "label": "Monitor-721-Aggregated", "isController": false}, {"data": [[2.0, 391.6666666666667], [8.0, 341.43750000000006], [9.0, 330.14285714285717], [10.0, 331.6875], [11.0, 342.2857142857142], [3.0, 360.4], [12.0, 339.4166666666667], [13.0, 343.125], [14.0, 338.99999999999994], [15.0, 338.2222222222222], [1.0, 402.0], [4.0, 360.5714285714286], [16.0, 346.29999999999995], [17.0, 367.24999999999994], [18.0, 374.5185185185185], [19.0, 372.27272727272725], [5.0, 338.875], [20.0, 411.1612903225806], [6.0, 353.1111111111111], [7.0, 349.3076923076923]], "isOverall": false, "label": "Buy laptop-694", "isController": false}, {"data": [[13.636363636363638, 355.83471074380145]], "isOverall": false, "label": "Buy laptop-694-Aggregated", "isController": false}, {"data": [[2.0, 280.0], [8.0, 293.0], [9.0, 283.0666666666667], [10.0, 308.06249999999994], [11.0, 280.0526315789474], [3.0, 264.8], [12.0, 298.26923076923083], [13.0, 273.76190476190476], [14.0, 322.0], [15.0, 290.1481481481481], [1.0, 254.0], [4.0, 265.2857142857143], [16.0, 302.96666666666664], [17.0, 300.59999999999997], [18.0, 335.88888888888897], [19.0, 358.12500000000006], [5.0, 295.7777777777777], [20.0, 338.7812500000001], [6.0, 272.87500000000006], [7.0, 338.7857142857143]], "isOverall": false, "label": "Monitor-720", "isController": false}, {"data": [[13.614958448753466, 308.30193905817174]], "isOverall": false, "label": "Monitor-720-Aggregated", "isController": false}, {"data": [[2.0, 1210.5], [8.0, 1029.8333333333333], [9.0, 1051.8571428571427], [10.0, 1143.375], [11.0, 1036.625], [3.0, 1030.6666666666667], [12.0, 1073.4285714285713], [13.0, 1050.2], [14.0, 1039.3333333333335], [15.0, 1200.0], [4.0, 1033.5], [16.0, 1207.7], [17.0, 1030.1666666666665], [18.0, 1063.8333333333335], [19.0, 1043.0], [5.0, 1044.5], [20.0, 1050.6923076923078], [6.0, 1022.4], [7.0, 1026.75]], "isOverall": false, "label": "Place order-793", "isController": false}, {"data": [[13.489932885906047, 1074.1476510067107]], "isOverall": false, "label": "Place order-793-Aggregated", "isController": false}, {"data": [[2.0, 534.5], [8.0, 459.1666666666667], [9.0, 432.2857142857143], [10.0, 458.4285714285714], [11.0, 424.3333333333333], [3.0, 498.5], [12.0, 434.83333333333337], [13.0, 426.1818181818182], [14.0, 412.75000000000006], [15.0, 439.9], [4.0, 535.5], [16.0, 439.3], [17.0, 451.0], [18.0, 462.91666666666663], [19.0, 479.0], [5.0, 466.3333333333333], [20.0, 483.9230769230769], [6.0, 531.25], [7.0, 460.25]], "isOverall": false, "label": "Place order-795", "isController": false}, {"data": [[13.581081081081079, 455.135135135135]], "isOverall": false, "label": "Place order-795-Aggregated", "isController": false}, {"data": [[8.0, 313.2857142857143], [2.0, 422.0], [9.0, 318.00000000000006], [10.0, 288.0], [11.0, 299.0], [3.0, 308.6666666666667], [12.0, 316.77777777777777], [13.0, 307.5], [14.0, 324.1], [15.0, 303.79999999999995], [1.0, 323.0], [4.0, 323.6666666666667], [16.0, 312.92307692307696], [17.0, 328.90909090909093], [18.0, 341.46153846153845], [19.0, 327.3636363636364], [5.0, 292.5], [20.0, 383.28571428571433], [6.0, 296.5], [7.0, 312.4]], "isOverall": false, "label": "Buy monitor-740", "isController": false}, {"data": [[13.42384105960265, 322.48344370860934]], "isOverall": false, "label": "Buy monitor-740-Aggregated", "isController": false}, {"data": [[2.0, 300.5], [8.0, 300.16666666666663], [9.0, 285.7142857142857], [10.0, 291.8571428571429], [11.0, 295.55555555555554], [3.0, 262.0], [12.0, 269.0], [13.0, 294.7], [14.0, 279.58333333333337], [15.0, 293.45454545454544], [4.0, 286.25], [16.0, 309.1111111111111], [17.0, 292.2307692307692], [18.0, 322.25000000000006], [19.0, 320.23076923076917], [5.0, 256.5], [20.0, 345.23076923076917], [6.0, 260.8], [7.0, 262.5]], "isOverall": false, "label": "Place order-794", "isController": false}, {"data": [[13.574324324324326, 298.3310810810812]], "isOverall": false, "label": "Place order-794-Aggregated", "isController": false}, {"data": [[2.0, 171.0], [8.0, 135.5], [9.0, 63.57142857142858], [10.0, 94.71428571428572], [11.0, 109.1111111111111], [3.0, 67.0], [12.0, 65.5], [13.0, 120.54545454545453], [14.0, 122.49999999999999], [15.0, 74.80000000000001], [4.0, 218.75], [16.0, 91.0], [17.0, 102.33333333333333], [18.0, 66.41666666666667], [19.0, 112.76923076923076], [5.0, 133.66666666666669], [20.0, 97.46153846153845], [6.0, 110.5], [7.0, 61.75]], "isOverall": false, "label": "Place order-796", "isController": false}, {"data": [[13.557823129251698, 101.69387755102045]], "isOverall": false, "label": "Place order-796-Aggregated", "isController": false}, {"data": [[2.0, 64.0], [8.0, 77.4], [9.0, 75.25], [10.0, 123.00000000000001], [11.0, 63.57142857142857], [3.0, 67.5], [12.0, 65.8695652173913], [13.0, 81.41666666666666], [14.0, 66.37499999999999], [15.0, 70.28571428571428], [1.0, 83.0], [4.0, 86.66666666666667], [16.0, 94.71874999999999], [17.0, 102.14814814814817], [18.0, 95.28125], [19.0, 63.62068965517241], [5.0, 106.8], [20.0, 78.41176470588235], [6.0, 81.81818181818181], [7.0, 62.33333333333333]], "isOverall": false, "label": "Login-594", "isController": false}, {"data": [[13.510695187165759, 81.32887700534756]], "isOverall": false, "label": "Login-594-Aggregated", "isController": false}, {"data": [[8.0, 353.66666666666663], [2.0, 352.0], [9.0, 333.875], [10.0, 323.0], [11.0, 332.6666666666667], [3.0, 365.6666666666667], [12.0, 344.625], [13.0, 354.3], [14.0, 329.7], [15.0, 342.0], [1.0, 353.0], [4.0, 342.6666666666667], [16.0, 363.3846153846154], [17.0, 393.4166666666667], [18.0, 425.33333333333337], [19.0, 416.16666666666663], [5.0, 373.6666666666667], [20.0, 393.6923076923076], [6.0, 359.1666666666667], [7.0, 394.75]], "isOverall": false, "label": "Buy monitor-743", "isController": false}, {"data": [[13.437086092715228, 367.08609271523187]], "isOverall": false, "label": "Buy monitor-743-Aggregated", "isController": false}, {"data": [[8.0, 269.14285714285717], [2.0, 298.0], [9.0, 280.42857142857144], [10.0, 289.6666666666667], [11.0, 265.77777777777777], [3.0, 279.3333333333333], [12.0, 272.0], [13.0, 288.77777777777777], [14.0, 269.45454545454544], [15.0, 275.0], [1.0, 263.0], [4.0, 260.3333333333333], [16.0, 292.38461538461536], [17.0, 323.00000000000006], [18.0, 311.38461538461536], [19.0, 332.0833333333333], [5.0, 276.0], [20.0, 332.2307692307692], [6.0, 261.6], [7.0, 311.0]], "isOverall": false, "label": "Buy monitor-742", "isController": false}, {"data": [[13.430463576158937, 293.4768211920529]], "isOverall": false, "label": "Buy monitor-742-Aggregated", "isController": false}, {"data": [[2.0, 417.3333333333333], [8.0, 344.4666666666667], [9.0, 341.875], [10.0, 338.4444444444445], [11.0, 334.4761904761904], [3.0, 396.0], [12.0, 329.5652173913044], [13.0, 333.54166666666674], [14.0, 329.29166666666663], [15.0, 342.7142857142857], [1.0, 390.0], [4.0, 384.55555555555554], [16.0, 348.31250000000006], [17.0, 376.6666666666667], [18.0, 391.22580645161287], [19.0, 376.43333333333334], [5.0, 342.0], [20.0, 385.1764705882353], [6.0, 364.54545454545456], [7.0, 349.25]], "isOverall": false, "label": "Login-593", "isController": false}, {"data": [[13.51336898395722, 356.5989304812831]], "isOverall": false, "label": "Login-593-Aggregated", "isController": false}, {"data": [[8.0, 271.4], [2.0, 272.0], [9.0, 301.5], [10.0, 215.42857142857142], [11.0, 143.375], [3.0, 212.0], [12.0, 202.79999999999998], [13.0, 155.22222222222223], [14.0, 191.9090909090909], [15.0, 165.6], [1.0, 269.0], [4.0, 200.66666666666669], [16.0, 193.08333333333331], [17.0, 199.16666666666666], [18.0, 285.84615384615387], [19.0, 147.8181818181818], [5.0, 270.6666666666667], [20.0, 289.85714285714283], [6.0, 168.83333333333334], [7.0, 170.25]], "isOverall": false, "label": "Cart-772", "isController": false}, {"data": [[13.463576158940398, 211.97350993377478]], "isOverall": false, "label": "Cart-772-Aggregated", "isController": false}, {"data": [[2.0, 267.0], [8.0, 300.2666666666667], [9.0, 278.5], [10.0, 287.6666666666667], [11.0, 286.69999999999993], [3.0, 270.0], [12.0, 304.00000000000006], [13.0, 272.9583333333333], [14.0, 293.92], [15.0, 280.5769230769231], [1.0, 290.0], [4.0, 274.77777777777777], [16.0, 291.28124999999994], [17.0, 358.34482758620686], [18.0, 326.5862068965517], [19.0, 365.2903225806452], [5.0, 276.8], [20.0, 327.9117647058823], [6.0, 276.7], [7.0, 283.07692307692304]], "isOverall": false, "label": "Login-592", "isController": false}, {"data": [[13.521390374331549, 305.2620320855617]], "isOverall": false, "label": "Login-592-Aggregated", "isController": false}, {"data": [[8.0, 174.33333333333331], [2.0, 66.0], [9.0, 144.62500000000003], [10.0, 168.5], [11.0, 93.44444444444446], [3.0, 207.66666666666669], [12.0, 219.125], [13.0, 169.79999999999998], [14.0, 148.5], [15.0, 196.27272727272728], [1.0, 267.0], [4.0, 63.333333333333336], [16.0, 103.07692307692308], [17.0, 79.5], [18.0, 97.58333333333334], [19.0, 149.41666666666666], [5.0, 196.33333333333331], [20.0, 81.15384615384616], [6.0, 133.16666666666669], [7.0, 168.25]], "isOverall": false, "label": "Buy monitor-744", "isController": false}, {"data": [[13.437086092715228, 136.8874172185431]], "isOverall": false, "label": "Buy monitor-744-Aggregated", "isController": false}, {"data": [[2.0, 350.5], [8.0, 338.3333333333333], [9.0, 302.0], [10.0, 320.95], [11.0, 308.35], [3.0, 310.0], [12.0, 330.25], [13.0, 319.59999999999997], [14.0, 311.8846153846154], [15.0, 327.3666666666667], [1.0, 336.5], [4.0, 343.2857142857143], [16.0, 326.76000000000005], [17.0, 344.00000000000006], [18.0, 364.1874999999999], [19.0, 368.24999999999994], [5.0, 317.7272727272727], [20.0, 380.45714285714274], [6.0, 324.0909090909091], [7.0, 328.66666666666663]], "isOverall": false, "label": "Phone-623", "isController": false}, {"data": [[13.533692722371974, 336.3800539083559]], "isOverall": false, "label": "Phone-623-Aggregated", "isController": false}, {"data": [[2.0, 267.5], [8.0, 289.4166666666667], [9.0, 283.77777777777777], [10.0, 285.2631578947369], [11.0, 280.42857142857144], [3.0, 265.6666666666667], [12.0, 269.16666666666663], [13.0, 293.03846153846143], [14.0, 282.7307692307692], [15.0, 279.39285714285717], [1.0, 290.0], [4.0, 298.5], [16.0, 291.69230769230774], [17.0, 303.3666666666666], [18.0, 338.0882352941177], [19.0, 339.074074074074], [5.0, 269.09090909090907], [20.0, 332.00000000000006], [6.0, 339.8181818181818], [7.0, 275.41666666666674]], "isOverall": false, "label": "Phone-622", "isController": false}, {"data": [[13.541778975741238, 300.0566037735848]], "isOverall": false, "label": "Phone-622-Aggregated", "isController": false}, {"data": [[2.0, 155.5], [8.0, 92.0], [9.0, 117.28571428571428], [10.0, 82.85714285714285], [11.0, 50.25], [3.0, 120.66666666666666], [12.0, 97.33333333333333], [13.0, 74.66666666666667], [14.0, 109.18181818181819], [15.0, 54.7], [4.0, 49.0], [16.0, 121.09090909090908], [17.0, 84.69230769230771], [18.0, 92.2], [19.0, 96.28571428571429], [5.0, 105.25], [20.0, 82.3076923076923], [6.0, 50.0], [7.0, 93.4]], "isOverall": false, "label": "Logout-839", "isController": false}, {"data": [[13.557823129251702, 89.73469387755104]], "isOverall": false, "label": "Logout-839-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 20.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 2958.7166666666667, "minX": 1.60741866E12, "maxY": 2513776.933333333, "series": [{"data": [[1.60741884E12, 1566885.9833333334], [1.60741902E12, 2513776.933333333], [1.60741866E12, 288842.7], [1.60741896E12, 2244861.2666666666], [1.60741914E12, 1169548.0333333334], [1.60741908E12, 2122065.95], [1.60741878E12, 1163325.3166666667], [1.6074192E12, 571682.5666666667], [1.60741872E12, 684256.65], [1.6074189E12, 2125842.4166666665]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.60741884E12, 17779.283333333333], [1.60741902E12, 27013.083333333332], [1.60741866E12, 2958.7166666666667], [1.60741896E12, 25246.216666666667], [1.60741914E12, 13516.95], [1.60741908E12, 21769.266666666666], [1.60741878E12, 12493.383333333333], [1.6074192E12, 5074.0], [1.60741872E12, 7647.15], [1.6074189E12, 22803.716666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6074192E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 50.16666666666666, "minX": 1.60741866E12, "maxY": 1152.0, "series": [{"data": [[1.60741884E12, 93.1951219512195], [1.60741902E12, 61.18181818181817], [1.60741866E12, 58.0], [1.60741896E12, 77.33928571428572], [1.60741914E12, 78.09677419354838], [1.60741908E12, 59.24999999999999], [1.60741878E12, 58.79310344827586], [1.6074192E12, 51.0], [1.60741872E12, 74.44444444444444], [1.6074189E12, 57.41379310344827]], "isOverall": false, "label": "Buy phone-660", "isController": false}, {"data": [[1.60741884E12, 298.58974358974353], [1.60741902E12, 361.4126984126983], [1.60741866E12, 329.6666666666667], [1.60741896E12, 341.542372881356], [1.60741914E12, 400.71875], [1.60741908E12, 356.2156862745099], [1.60741878E12, 304.00000000000006], [1.6074192E12, 351.090909090909], [1.60741872E12, 309.8333333333333], [1.6074189E12, 302.375]], "isOverall": false, "label": "Laptop-672", "isController": false}, {"data": [[1.60741884E12, 263.2051282051282], [1.60741902E12, 341.7846153846154], [1.60741866E12, 270.14285714285717], [1.60741896E12, 310.86206896551727], [1.60741914E12, 342.6666666666667], [1.60741908E12, 321.52000000000004], [1.60741878E12, 264.20000000000005], [1.6074192E12, 318.0], [1.60741872E12, 264.70588235294116], [1.6074189E12, 265.7192982456141]], "isOverall": false, "label": "Laptop-671", "isController": false}, {"data": [[1.60741884E12, 76.94444444444446], [1.60741902E12, 205.8], [1.60741866E12, 256.0], [1.60741896E12, 103.88], [1.60741914E12, 115.00000000000003], [1.60741908E12, 128.1904761904762], [1.60741878E12, 84.0], [1.6074192E12, 93.0], [1.60741872E12, 128.75], [1.6074189E12, 145.61904761904762]], "isOverall": false, "label": "Buy monitor-736", "isController": false}, {"data": [[1.60741884E12, 216.2380952380952], [1.60741902E12, 135.09523809523807], [1.60741866E12, 257.2857142857143], [1.60741896E12, 153.15000000000006], [1.60741914E12, 136.76666666666665], [1.60741908E12, 184.01923076923072], [1.60741878E12, 270.7241379310345], [1.6074192E12, 146.08333333333334], [1.60741872E12, 271.1578947368421], [1.6074189E12, 164.2678571428572]], "isOverall": false, "label": "Buy phone-624", "isController": false}, {"data": [[1.60741884E12, 264.6666666666667], [1.60741902E12, 348.8076923076923], [1.60741866E12, 261.6666666666667], [1.60741896E12, 307.125], [1.60741914E12, 312.2307692307692], [1.60741908E12, 374.14285714285717], [1.60741878E12, 258.3333333333333], [1.6074192E12, 283.8], [1.60741872E12, 263.875], [1.6074189E12, 260.42857142857144]], "isOverall": false, "label": "Buy monitor-738", "isController": false}, {"data": [[1.60741884E12, 397.0555555555556], [1.60741902E12, 488.6923076923078], [1.60741866E12, 386.3333333333333], [1.60741896E12, 416.54166666666663], [1.60741914E12, 465.0769230769231], [1.60741908E12, 449.04761904761904], [1.60741878E12, 394.58333333333326], [1.6074192E12, 433.2], [1.60741872E12, 382.125], [1.6074189E12, 401.80952380952374]], "isOverall": false, "label": "Buy monitor-737", "isController": false}, {"data": [[1.60741884E12, 288.48717948717956], [1.60741902E12, 369.31818181818176], [1.60741866E12, 319.85714285714283], [1.60741896E12, 326.3103448275862], [1.60741914E12, 379.30303030303025], [1.60741908E12, 359.01960784313724], [1.60741878E12, 312.3333333333333], [1.6074192E12, 326.7], [1.60741872E12, 307.2352941176471], [1.6074189E12, 306.91228070175436]], "isOverall": false, "label": "Buy phone-663", "isController": false}, {"data": [[1.60741884E12, 264.73170731707313], [1.60741902E12, 341.86153846153843], [1.60741866E12, 268.14285714285717], [1.60741896E12, 311.91228070175436], [1.60741914E12, 337.7272727272728], [1.60741908E12, 350.0980392156863], [1.60741878E12, 262.5862068965517], [1.6074192E12, 335.90000000000003], [1.60741872E12, 262.16666666666674], [1.6074189E12, 265.8245614035088]], "isOverall": false, "label": "Buy phone-661", "isController": false}, {"data": [[1.60741884E12, 296.2926829268293], [1.60741902E12, 369.49999999999994], [1.60741866E12, 323.00000000000006], [1.60741896E12, 348.58620689655174], [1.60741914E12, 375.9393939393939], [1.60741908E12, 370.1764705882353], [1.60741878E12, 306.4], [1.6074192E12, 346.3], [1.60741872E12, 307.52941176470586], [1.6074189E12, 303.0545454545454]], "isOverall": false, "label": "Buy phone-662", "isController": false}, {"data": [[1.60741884E12, 304.875], [1.60741902E12, 387.03703703703707], [1.60741866E12, 318.0], [1.60741896E12, 336.0833333333333], [1.60741914E12, 377.6923076923077], [1.60741908E12, 360.15789473684214], [1.60741878E12, 305.1666666666667], [1.6074192E12, 335.0], [1.60741872E12, 313.0], [1.6074189E12, 301.4761904761905]], "isOverall": false, "label": "Logout-840", "isController": false}, {"data": [[1.60741884E12, 286.4444444444444], [1.60741902E12, 361.71999999999997], [1.60741866E12, 316.6666666666667], [1.60741896E12, 337.2], [1.60741914E12, 350.53846153846155], [1.60741908E12, 371.2727272727273], [1.60741878E12, 296.75], [1.6074192E12, 331.4], [1.60741872E12, 309.125], [1.6074189E12, 291.75]], "isOverall": false, "label": "Buy monitor-739", "isController": false}, {"data": [[1.60741884E12, 163.81818181818184], [1.60741902E12, 144.68750000000003], [1.60741866E12, 192.375], [1.60741896E12, 101.27868852459017], [1.60741914E12, 121.12499999999999], [1.60741908E12, 90.55769230769234], [1.60741878E12, 169.83870967741933], [1.6074192E12, 114.15384615384616], [1.60741872E12, 227.83333333333334], [1.6074189E12, 127.81132075471702]], "isOverall": false, "label": "Signup-581", "isController": false}, {"data": [[1.60741884E12, 295.53658536585374], [1.60741902E12, 355.2063492063491], [1.60741866E12, 325.3333333333333], [1.60741896E12, 333.688524590164], [1.60741914E12, 384.6857142857143], [1.60741908E12, 359.53061224489784], [1.60741878E12, 306.79310344827593], [1.6074192E12, 356.9], [1.60741872E12, 314.05882352941177], [1.6074189E12, 302.9607843137254]], "isOverall": false, "label": "Buy laptop-712", "isController": false}, {"data": [[1.60741884E12, 91.86666666666667], [1.60741902E12, 75.5], [1.60741866E12, 51.0], [1.60741896E12, 70.91666666666664], [1.60741914E12, 105.08333333333334], [1.60741908E12, 102.57142857142857], [1.60741878E12, 70.0], [1.6074192E12, 93.6], [1.60741872E12, 79.14285714285714], [1.6074189E12, 84.31818181818181]], "isOverall": false, "label": "Place order-812", "isController": false}, {"data": [[1.60741884E12, 261.7317073170732], [1.60741902E12, 355.2698412698414], [1.60741866E12, 267.33333333333337], [1.60741896E12, 303.8852459016394], [1.60741914E12, 323.9428571428571], [1.60741908E12, 329.84], [1.60741878E12, 265.58620689655163], [1.6074192E12, 309.0], [1.60741872E12, 263.47058823529414], [1.6074189E12, 265.3725490196079]], "isOverall": false, "label": "Buy laptop-711", "isController": false}, {"data": [[1.60741884E12, 82.58536585365857], [1.60741902E12, 81.61904761904762], [1.60741866E12, 93.33333333333333], [1.60741896E12, 75.42622950819668], [1.60741914E12, 118.23529411764706], [1.60741908E12, 77.94117647058825], [1.60741878E12, 101.79310344827586], [1.6074192E12, 114.60000000000001], [1.60741872E12, 62.94117647058823], [1.6074189E12, 67.15686274509805]], "isOverall": false, "label": "Buy laptop-710", "isController": false}, {"data": [[1.60741884E12, 301.8125], [1.60741902E12, 375.84615384615387], [1.60741866E12, 324.0], [1.60741896E12, 357.125], [1.60741914E12, 359.0833333333333], [1.60741908E12, 354.7], [1.60741878E12, 308.75], [1.6074192E12, 367.1666666666667], [1.60741872E12, 308.83333333333337], [1.6074189E12, 296.0000000000001]], "isOverall": false, "label": "Place order-814", "isController": false}, {"data": [[1.60741884E12, 262.93333333333334], [1.60741902E12, 328.9230769230769], [1.60741866E12, 260.6666666666667], [1.60741896E12, 319.3333333333334], [1.60741914E12, 304.0833333333333], [1.60741908E12, 331.3333333333333], [1.60741878E12, 268.8333333333333], [1.6074192E12, 283.8], [1.60741872E12, 261.14285714285717], [1.6074189E12, 266.0909090909091]], "isOverall": false, "label": "Place order-813", "isController": false}, {"data": [[1.60741884E12, 209.79487179487177], [1.60741902E12, 170.0], [1.60741866E12, 288.5], [1.60741896E12, 148.11864406779662], [1.60741914E12, 198.03125], [1.60741908E12, 169.58823529411765], [1.60741878E12, 287.83333333333337], [1.6074192E12, 241.8181818181818], [1.60741872E12, 215.66666666666666], [1.6074189E12, 188.23214285714283]], "isOverall": false, "label": "Buy laptop-675", "isController": false}, {"data": [[1.60741884E12, 294.0625], [1.60741902E12, 400.037037037037], [1.60741866E12, 312.3333333333333], [1.60741896E12, 338.70833333333337], [1.60741914E12, 347.00000000000006], [1.60741908E12, 357.8947368421053], [1.60741878E12, 298.25000000000006], [1.6074192E12, 344.0], [1.60741872E12, 301.5], [1.6074189E12, 293.4285714285714]], "isOverall": false, "label": "Place order-815", "isController": false}, {"data": [[1.60741884E12, 300.94444444444446], [1.60741902E12, 375.24], [1.60741866E12, 309.6666666666667], [1.60741896E12, 318.0799999999999], [1.60741914E12, 377.53846153846155], [1.60741908E12, 355.5238095238095], [1.60741878E12, 304.8181818181818], [1.6074192E12, 398.66666666666663], [1.60741872E12, 307.75000000000006], [1.6074189E12, 301.28571428571433]], "isOverall": false, "label": "Buy monitor-761", "isController": false}, {"data": [[1.60741884E12, 262.0555555555555], [1.60741902E12, 338.56], [1.60741866E12, 259.3333333333333], [1.60741896E12, 298.2], [1.60741914E12, 343.16666666666663], [1.60741908E12, 348.5], [1.60741878E12, 261.2727272727273], [1.6074192E12, 300.3333333333333], [1.60741872E12, 264.25], [1.6074189E12, 267.19047619047615]], "isOverall": false, "label": "Buy monitor-760", "isController": false}, {"data": [[1.60741884E12, 293.55555555555554], [1.60741902E12, 354.88000000000005], [1.60741866E12, 309.6666666666667], [1.60741896E12, 328.63999999999993], [1.60741914E12, 332.7692307692308], [1.60741908E12, 375.9523809523809], [1.60741878E12, 294.72727272727275], [1.6074192E12, 322.5], [1.60741872E12, 301.375], [1.6074189E12, 293.7619047619047]], "isOverall": false, "label": "Buy monitor-762", "isController": false}, {"data": [[1.60741884E12, 290.3658536585366], [1.60741902E12, 345.8253968253967], [1.60741866E12, 322.0], [1.60741896E12, 331.2166666666665], [1.60741914E12, 336.7428571428571], [1.60741908E12, 360.0204081632653], [1.60741878E12, 302.2758620689655], [1.6074192E12, 311.2], [1.60741872E12, 298.3529411764706], [1.6074189E12, 291.49019607843144]], "isOverall": false, "label": "Buy laptop-713", "isController": false}, {"data": [[1.60741884E12, 335.22222222222223], [1.60741902E12, 295.28], [1.60741866E12, 406.6666666666667], [1.60741896E12, 391.24], [1.60741914E12, 360.0769230769231], [1.60741908E12, 326.38095238095235], [1.60741878E12, 369.99999999999994], [1.6074192E12, 405.0], [1.60741872E12, 513.875], [1.6074189E12, 375.95238095238096]], "isOverall": false, "label": "Buy monitor-724", "isController": false}, {"data": [[1.60741884E12, 288.26829268292687], [1.60741902E12, 365.9032258064516], [1.60741866E12, 313.28571428571433], [1.60741896E12, 322.5081967213115], [1.60741914E12, 344.8275862068966], [1.60741908E12, 367.9622641509432], [1.60741878E12, 299.1], [1.6074192E12, 333.2307692307692], [1.60741872E12, 305.6842105263157], [1.6074189E12, 291.3214285714286]], "isOverall": false, "label": "Login-614", "isController": false}, {"data": [[1.60741884E12, 298.6666666666667], [1.60741902E12, 381.9032258064517], [1.60741866E12, 322.0], [1.60741896E12, 337.62295081967227], [1.60741914E12, 359.3103448275861], [1.60741908E12, 373.6603773584907], [1.60741878E12, 306.3333333333334], [1.6074192E12, 363.0769230769231], [1.60741872E12, 308.1578947368422], [1.6074189E12, 302.3818181818181]], "isOverall": false, "label": "Login-613", "isController": false}, {"data": [[1.60741884E12, 417.52272727272737], [1.60741902E12, 442.4761904761905], [1.60741866E12, 638.7142857142857], [1.60741896E12, 304.2295081967213], [1.60741914E12, 332.9677419354839], [1.60741908E12, 385.9056603773586], [1.60741878E12, 446.73333333333323], [1.6074192E12, 368.15384615384613], [1.60741872E12, 554.6315789473684], [1.6074189E12, 421.52830188679246]], "isOverall": false, "label": "Login-610", "isController": false}, {"data": [[1.60741884E12, 292.5777777777778], [1.60741902E12, 357.16923076923086], [1.60741866E12, 323.7142857142857], [1.60741896E12, 337.68852459016387], [1.60741914E12, 350.81249999999994], [1.60741908E12, 348.8076923076923], [1.60741878E12, 300.8], [1.6074192E12, 340.1666666666667], [1.60741872E12, 301.7894736842106], [1.6074189E12, 291.6538461538463]], "isOverall": false, "label": "Signup-591", "isController": false}, {"data": [[1.60741884E12, 260.11627906976736], [1.60741902E12, 328.67741935483883], [1.60741866E12, 269.5714285714286], [1.60741896E12, 293.42622950819674], [1.60741914E12, 322.6333333333333], [1.60741908E12, 330.2641509433962], [1.60741878E12, 262.0], [1.6074192E12, 312.8571428571429], [1.60741872E12, 263.52631578947376], [1.6074189E12, 265.962962962963]], "isOverall": false, "label": "Login-612", "isController": false}, {"data": [[1.60741884E12, 65.5681818181818], [1.60741902E12, 65.55555555555554], [1.60741866E12, 118.14285714285714], [1.60741896E12, 79.55737704918035], [1.60741914E12, 71.58064516129033], [1.60741908E12, 72.19230769230772], [1.60741878E12, 107.13333333333334], [1.6074192E12, 84.15384615384616], [1.60741872E12, 73.7894736842105], [1.6074189E12, 60.66037735849057]], "isOverall": false, "label": "Login-611", "isController": false}, {"data": [[1.60741884E12, 389.65909090909093], [1.60741902E12, 449.4461538461538], [1.60741866E12, 401.85714285714283], [1.60741896E12, 449.6065573770491], [1.60741914E12, 458.15624999999994], [1.60741908E12, 463.6923076923078], [1.60741878E12, 388.3548387096775], [1.6074192E12, 444.2307692307692], [1.60741872E12, 385.3684210526316], [1.6074189E12, 392.9230769230768]], "isOverall": false, "label": "Signup-590", "isController": false}, {"data": [[1.60741884E12, 262.0], [1.60741902E12, 340.6190476190475], [1.60741866E12, 268.83333333333337], [1.60741896E12, 326.61016949152537], [1.60741914E12, 319.56250000000006], [1.60741908E12, 344.41176470588243], [1.60741878E12, 262.9], [1.6074192E12, 318.45454545454544], [1.60741872E12, 261.5555555555556], [1.6074189E12, 266.32142857142867]], "isOverall": false, "label": "Buy laptop-689", "isController": false}, {"data": [[1.60741884E12, 263.1951219512195], [1.60741902E12, 337.04687499999994], [1.60741866E12, 274.3333333333333], [1.60741896E12, 299.6101694915254], [1.60741914E12, 330.57575757575756], [1.60741908E12, 336.76000000000005], [1.60741878E12, 261.6785714285713], [1.6074192E12, 292.4], [1.60741872E12, 262.7777777777777], [1.6074189E12, 264.4909090909091]], "isOverall": false, "label": "Buy laptop-688", "isController": false}, {"data": [[1.60741884E12, 67.64102564102562], [1.60741902E12, 74.63492063492066], [1.60741866E12, 95.33333333333333], [1.60741896E12, 73.64406779661017], [1.60741914E12, 77.28125000000001], [1.60741908E12, 75.921568627451], [1.60741878E12, 80.69999999999999], [1.6074192E12, 50.81818181818182], [1.60741872E12, 97.38888888888889], [1.6074189E12, 80.69642857142858]], "isOverall": false, "label": "Buy laptop-687", "isController": false}, {"data": [[1.60741884E12, 290.68750000000006], [1.60741902E12, 368.7692307692308], [1.60741866E12, 312.6666666666667], [1.60741896E12, 312.9090909090909], [1.60741914E12, 348.6666666666667], [1.60741908E12, 352.95454545454555], [1.60741878E12, 298.25], [1.6074192E12, 354.0], [1.60741872E12, 312.42857142857144], [1.6074189E12, 294.34782608695645]], "isOverall": false, "label": "Cart-789", "isController": false}, {"data": [[1.60741884E12, 290.4117647058824], [1.60741902E12, 389.8076923076923], [1.60741866E12, 322.3333333333333], [1.60741896E12, 321.04545454545456], [1.60741914E12, 354.25], [1.60741908E12, 355.5454545454545], [1.60741878E12, 296.6666666666667], [1.6074192E12, 352.16666666666663], [1.60741872E12, 303.0], [1.6074189E12, 296.0454545454545]], "isOverall": false, "label": "Cart-788", "isController": false}, {"data": [[1.60741884E12, 291.125], [1.60741902E12, 347.03846153846155], [1.60741866E12, 307.3333333333333], [1.60741896E12, 334.9090909090909], [1.60741914E12, 342.75], [1.60741908E12, 359.09090909090907], [1.60741878E12, 294.5833333333333], [1.6074192E12, 355.5], [1.60741872E12, 305.7142857142857], [1.6074189E12, 295.8695652173913]], "isOverall": false, "label": "Cart-787", "isController": false}, {"data": [[1.60741884E12, 262.1764705882353], [1.60741902E12, 326.92307692307685], [1.60741866E12, 267.6666666666667], [1.60741896E12, 308.50000000000006], [1.60741914E12, 306.83333333333337], [1.60741908E12, 317.86363636363643], [1.60741878E12, 260.75], [1.6074192E12, 293.6666666666667], [1.60741872E12, 263.7142857142857], [1.6074189E12, 267.7727272727273]], "isOverall": false, "label": "Cart-786", "isController": false}, {"data": [[1.60741884E12, 173.8571428571429], [1.60741902E12, 120.99999999999996], [1.60741866E12, 281.57142857142856], [1.60741896E12, 145.4642857142857], [1.60741914E12, 111.1935483870968], [1.60741908E12, 123.30769230769229], [1.60741878E12, 184.9655172413793], [1.6074192E12, 121.20000000000002], [1.60741872E12, 216.16666666666669], [1.6074189E12, 142.3859649122807]], "isOverall": false, "label": "Buy phone-645", "isController": false}, {"data": [[1.60741884E12, 262.22222222222223], [1.60741902E12, 332.48], [1.60741866E12, 265.0], [1.60741896E12, 316.08333333333337], [1.60741914E12, 308.84615384615387], [1.60741908E12, 313.6363636363637], [1.60741878E12, 264.00000000000006], [1.6074192E12, 292.5], [1.60741872E12, 259.625], [1.6074189E12, 265.0]], "isOverall": false, "label": "Cart-781", "isController": false}, {"data": [[1.60741884E12, 264.11111111111114], [1.60741902E12, 379.1666666666667], [1.60741866E12, 259.3333333333333], [1.60741896E12, 308.6], [1.60741914E12, 326.61538461538464], [1.60741908E12, 354.7727272727272], [1.60741878E12, 264.2727272727273], [1.6074192E12, 300.66666666666663], [1.60741872E12, 261.875], [1.6074189E12, 266.90476190476187]], "isOverall": false, "label": "Cart-780", "isController": false}, {"data": [[1.60741884E12, 316.340909090909], [1.60741902E12, 299.9846153846154], [1.60741866E12, 363.375], [1.60741896E12, 278.88709677419354], [1.60741914E12, 327.3636363636364], [1.60741908E12, 286.9000000000001], [1.60741878E12, 358.3548387096775], [1.6074192E12, 380.53846153846155], [1.60741872E12, 353.44444444444446], [1.6074189E12, 303.1509433962264]], "isOverall": false, "label": "Signup-563-1", "isController": false}, {"data": [[1.60741884E12, 286.1162790697675], [1.60741902E12, 338.578125], [1.60741866E12, 287.7142857142857], [1.60741896E12, 302.7068965517241], [1.60741914E12, 309.9677419354838], [1.60741908E12, 327.90384615384613], [1.60741878E12, 266.7586206896552], [1.6074192E12, 321.3636363636364], [1.60741872E12, 262.6111111111112], [1.6074189E12, 267.01785714285717]], "isOverall": false, "label": "Buy phone-643", "isController": false}, {"data": [[1.60741884E12, 287.5454545454545], [1.60741902E12, 282.78461538461534], [1.60741866E12, 288.875], [1.60741896E12, 285.8196721311477], [1.60741914E12, 278.6470588235294], [1.60741908E12, 279.6], [1.60741878E12, 285.16129032258067], [1.6074192E12, 309.66666666666674], [1.60741872E12, 276.8888888888889], [1.6074189E12, 295.2222222222222]], "isOverall": false, "label": "Signup-563-0", "isController": false}, {"data": [[1.60741884E12, 319.23255813953494], [1.60741902E12, 382.30769230769226], [1.60741866E12, 362.7142857142857], [1.60741896E12, 354.8771929824561], [1.60741914E12, 376.6129032258064], [1.60741908E12, 381.5576923076923], [1.60741878E12, 334.6551724137931], [1.6074192E12, 377.7272727272727], [1.60741872E12, 345.9444444444444], [1.6074189E12, 319.8928571428572]], "isOverall": false, "label": "Buy phone-644", "isController": false}, {"data": [[1.60741884E12, 89.17647058823529], [1.60741902E12, 60.240000000000016], [1.60741866E12, 59.0], [1.60741896E12, 123.88], [1.60741914E12, 50.16666666666666], [1.60741908E12, 62.45454545454545], [1.60741878E12, 50.5], [1.6074192E12, 122.66666666666666], [1.60741872E12, 104.0], [1.6074189E12, 54.476190476190474]], "isOverall": false, "label": "Buy monitor-759", "isController": false}, {"data": [[1.60741884E12, 289.1627906976744], [1.60741902E12, 360.09523809523813], [1.60741866E12, 319.4285714285714], [1.60741896E12, 386.89830508474574], [1.60741914E12, 354.7096774193549], [1.60741908E12, 359.32692307692304], [1.60741878E12, 296.7857142857143], [1.6074192E12, 338.00000000000006], [1.60741872E12, 304.94736842105266], [1.6074189E12, 293.87500000000017]], "isOverall": false, "label": "Buy phone-641", "isController": false}, {"data": [[1.60741884E12, 262.0588235294118], [1.60741902E12, 342.6923076923077], [1.60741866E12, 264.6666666666667], [1.60741896E12, 332.2608695652174], [1.60741914E12, 322.91666666666663], [1.60741908E12, 327.38095238095235], [1.60741878E12, 264.9166666666667], [1.6074192E12, 284.6666666666667], [1.60741872E12, 264.7142857142857], [1.6074189E12, 265.22727272727275]], "isOverall": false, "label": "Cart-785", "isController": false}, {"data": [[1.60741884E12, 261.50000000000006], [1.60741902E12, 326.1153846153847], [1.60741866E12, 260.3333333333333], [1.60741896E12, 295.47826086956525], [1.60741914E12, 413.8333333333333], [1.60741908E12, 344.047619047619], [1.60741878E12, 262.9166666666667], [1.6074192E12, 345.0], [1.60741872E12, 262.42857142857144], [1.6074189E12, 266.904761904762]], "isOverall": false, "label": "Cart-784", "isController": false}, {"data": [[1.60741884E12, 311.83333333333337], [1.60741902E12, 400.69230769230774], [1.60741866E12, 357.6666666666667], [1.60741896E12, 333.86956521739137], [1.60741914E12, 338.25], [1.60741908E12, 388.77272727272725], [1.60741878E12, 322.75], [1.6074192E12, 378.16666666666663], [1.60741872E12, 329.2857142857143], [1.6074189E12, 314.4761904761905]], "isOverall": false, "label": "Cart-783", "isController": false}, {"data": [[1.60741884E12, 289.69767441860466], [1.60741902E12, 373.5312500000001], [1.60741866E12, 319.0], [1.60741896E12, 336.91379310344814], [1.60741914E12, 339.64516129032256], [1.60741908E12, 354.0], [1.60741878E12, 295.5], [1.6074192E12, 377.27272727272725], [1.60741872E12, 302.1578947368421], [1.6074189E12, 292.142857142857]], "isOverall": false, "label": "Buy phone-640", "isController": false}, {"data": [[1.60741884E12, 324.2222222222223], [1.60741902E12, 337.80000000000007], [1.60741866E12, 311.3333333333333], [1.60741896E12, 321.5], [1.60741914E12, 353.76923076923083], [1.60741908E12, 350.909090909091], [1.60741878E12, 297.9166666666667], [1.6074192E12, 318.8333333333333], [1.60741872E12, 305.42857142857144], [1.6074189E12, 295.76190476190476]], "isOverall": false, "label": "Cart-782", "isController": false}, {"data": [[1.60741884E12, 67.97727272727273], [1.60741902E12, 73.34374999999999], [1.60741866E12, 71.5], [1.60741896E12, 76.83870967741937], [1.60741914E12, 75.49999999999999], [1.60741908E12, 63.01960784313725], [1.60741878E12, 78.12903225806451], [1.6074192E12, 80.07692307692307], [1.60741872E12, 87.50000000000001], [1.6074189E12, 81.33962264150945]], "isOverall": false, "label": "Signup-564", "isController": false}, {"data": [[1.60741884E12, 283.9268292682927], [1.60741902E12, 343.13846153846146], [1.60741866E12, 268.8333333333333], [1.60741896E12, 309.9666666666666], [1.60741914E12, 323.2058823529411], [1.60741908E12, 317.91836734693885], [1.60741878E12, 295.99999999999994], [1.6074192E12, 338.6], [1.60741872E12, 264.7058823529412], [1.6074189E12, 269.7884615384616]], "isOverall": false, "label": "Buy laptop-693", "isController": false}, {"data": [[1.60741884E12, 100.88636363636365], [1.60741902E12, 103.72307692307692], [1.60741866E12, 92.22222222222223], [1.60741896E12, 96.9344262295082], [1.60741914E12, 99.29411764705883], [1.60741908E12, 98.19999999999996], [1.60741878E12, 93.90322580645159], [1.6074192E12, 125.0], [1.60741872E12, 104.11764705882354], [1.6074189E12, 93.7037037037037]], "isOverall": false, "label": "Signup-562", "isController": false}, {"data": [[1.60741884E12, 289.29268292682934], [1.60741902E12, 343.67692307692306], [1.60741866E12, 311.83333333333337], [1.60741896E12, 322.65517241379297], [1.60741914E12, 347.72727272727275], [1.60741908E12, 364.38000000000005], [1.60741878E12, 298.2142857142857], [1.6074192E12, 303.1], [1.60741872E12, 306.9444444444444], [1.6074189E12, 291.44444444444446]], "isOverall": false, "label": "Buy laptop-691", "isController": false}, {"data": [[1.60741884E12, 603.9318181818182], [1.60741902E12, 582.8615384615383], [1.60741866E12, 652.5], [1.60741896E12, 564.5], [1.60741914E12, 606.2727272727274], [1.60741908E12, 566.56], [1.60741878E12, 643.7419354838712], [1.6074192E12, 687.4615384615386], [1.60741872E12, 630.4444444444445], [1.6074189E12, 598.9622641509433]], "isOverall": false, "label": "Signup-563", "isController": false}, {"data": [[1.60741884E12, 313.1219512195122], [1.60741902E12, 370.6190476190477], [1.60741866E12, 317.1666666666667], [1.60741896E12, 330.0666666666667], [1.60741914E12, 346.27272727272725], [1.60741908E12, 363.18], [1.60741878E12, 297.2142857142857], [1.6074192E12, 341.1], [1.60741872E12, 304.8333333333333], [1.6074189E12, 293.9259259259259]], "isOverall": false, "label": "Buy laptop-690", "isController": false}, {"data": [[1.60741884E12, 66.0625], [1.60741902E12, 62.77777777777778], [1.60741866E12, 63.333333333333336], [1.60741896E12, 72.33333333333333], [1.60741914E12, 63.46153846153846], [1.60741908E12, 95.89473684210526], [1.60741878E12, 80.58333333333334], [1.6074192E12, 61.333333333333336], [1.60741872E12, 134.5], [1.6074189E12, 74.14285714285714]], "isOverall": false, "label": "Logout-823", "isController": false}, {"data": [[1.60741884E12, 213.9545454545454], [1.60741902E12, 216.54545454545456], [1.60741866E12, 226.88888888888889], [1.60741896E12, 237.36065573770486], [1.60741914E12, 206.8285714285714], [1.60741908E12, 247.53061224489798], [1.60741878E12, 341.8709677419355], [1.6074192E12, 225.2727272727273], [1.60741872E12, 203.58823529411765], [1.6074189E12, 227.90740740740748]], "isOverall": false, "label": "Signup-560", "isController": false}, {"data": [[1.60741884E12, 260.904761904762], [1.60741902E12, 329.12500000000006], [1.60741866E12, 271.00000000000006], [1.60741896E12, 300.2033898305085], [1.60741914E12, 335.67741935483866], [1.60741908E12, 324.1372549019607], [1.60741878E12, 263.48275862068965], [1.6074192E12, 343.6666666666667], [1.60741872E12, 262.2105263157894], [1.6074189E12, 265.01785714285705]], "isOverall": false, "label": "Buy phone-638", "isController": false}, {"data": [[1.60741884E12, 113.61363636363637], [1.60741902E12, 94.1666666666667], [1.60741866E12, 93.77777777777779], [1.60741896E12, 108.59016393442624], [1.60741914E12, 95.2285714285714], [1.60741908E12, 96.53061224489795], [1.60741878E12, 97.3225806451613], [1.6074192E12, 90.09090909090908], [1.60741872E12, 91.82352941176472], [1.6074189E12, 97.20370370370372]], "isOverall": false, "label": "Signup-561", "isController": false}, {"data": [[1.60741884E12, 262.1190476190476], [1.60741902E12, 332.5873015873016], [1.60741866E12, 272.8571428571429], [1.60741896E12, 304.3050847457627], [1.60741914E12, 313.4193548387097], [1.60741908E12, 346.9038461538461], [1.60741878E12, 264.1034482758621], [1.6074192E12, 311.6666666666667], [1.60741872E12, 263.36842105263156], [1.6074189E12, 267.25]], "isOverall": false, "label": "Buy phone-639", "isController": false}, {"data": [[1.60741884E12, 67.33333333333333], [1.60741902E12, 58.904761904761905], [1.60741866E12, 58.42857142857143], [1.60741896E12, 80.59999999999998], [1.60741914E12, 71.16129032258065], [1.60741908E12, 64.78431372549021], [1.60741878E12, 66.72413793103449], [1.6074192E12, 67.41666666666667], [1.60741872E12, 74.47368421052633], [1.6074189E12, 67.21428571428572]], "isOverall": false, "label": "Buy phone-637", "isController": false}, {"data": [[1.60741884E12, 118.31707317073173], [1.60741902E12, 105.54687499999999], [1.60741866E12, 142.66666666666669], [1.60741896E12, 87.84999999999998], [1.60741914E12, 99.61764705882352], [1.60741908E12, 81.2], [1.60741878E12, 96.34482758620689], [1.6074192E12, 81.4], [1.60741872E12, 186.1764705882353], [1.6074189E12, 97.11538461538466]], "isOverall": false, "label": "Buy laptop-695", "isController": false}, {"data": [[1.60741884E12, 295.8571428571429], [1.60741902E12, 351.0], [1.60741866E12, 307.66666666666663], [1.60741896E12, 342.7457627118643], [1.60741914E12, 349.25714285714287], [1.60741908E12, 357.18], [1.60741878E12, 303.2413793103448], [1.6074192E12, 386.3], [1.60741872E12, 307.25000000000006], [1.6074189E12, 307.35294117647055]], "isOverall": false, "label": "Monitor-721", "isController": false}, {"data": [[1.60741884E12, 323.36585365853665], [1.60741902E12, 391.10937500000006], [1.60741866E12, 366.5], [1.60741896E12, 361.85], [1.60741914E12, 363.61764705882354], [1.60741908E12, 370.8], [1.60741878E12, 332.62068965517244], [1.6074192E12, 379.7], [1.60741872E12, 340.94117647058823], [1.6074189E12, 323.5961538461537]], "isOverall": false, "label": "Buy laptop-694", "isController": false}, {"data": [[1.60741884E12, 262.07317073170725], [1.60741902E12, 348.45312499999994], [1.60741866E12, 258.5], [1.60741896E12, 303.6440677966102], [1.60741914E12, 371.2285714285714], [1.60741908E12, 333.2040816326529], [1.60741878E12, 263.82758620689657], [1.6074192E12, 308.80000000000007], [1.60741872E12, 263.5882352941176], [1.6074189E12, 279.31372549019613]], "isOverall": false, "label": "Monitor-720", "isController": false}, {"data": [[1.60741884E12, 1101.9375], [1.60741902E12, 1046.8461538461536], [1.60741866E12, 1152.0], [1.60741896E12, 1119.6086956521738], [1.60741914E12, 1039.1666666666665], [1.60741908E12, 1055.227272727273], [1.60741878E12, 1041.8333333333335], [1.6074192E12, 1024.5], [1.60741872E12, 1035.0], [1.6074189E12, 1109.681818181818]], "isOverall": false, "label": "Place order-793", "isController": false}, {"data": [[1.60741884E12, 422.4666666666667], [1.60741902E12, 481.46153846153845], [1.60741866E12, 513.0], [1.60741896E12, 435.16666666666674], [1.60741914E12, 468.9166666666667], [1.60741908E12, 490.45454545454544], [1.60741878E12, 441.25], [1.6074192E12, 531.4], [1.60741872E12, 505.1428571428571], [1.6074189E12, 391.68181818181813]], "isOverall": false, "label": "Place order-795", "isController": false}, {"data": [[1.60741884E12, 290.5555555555555], [1.60741902E12, 358.67999999999995], [1.60741866E12, 315.0], [1.60741896E12, 323.88000000000005], [1.60741914E12, 342.0], [1.60741908E12, 343.6818181818182], [1.60741878E12, 297.91666666666663], [1.6074192E12, 334.4], [1.60741872E12, 297.62500000000006], [1.6074189E12, 291.05000000000007]], "isOverall": false, "label": "Buy monitor-740", "isController": false}, {"data": [[1.60741884E12, 261.06250000000006], [1.60741902E12, 332.7307692307692], [1.60741866E12, 262.0], [1.60741896E12, 294.5217391304348], [1.60741914E12, 340.83333333333337], [1.60741908E12, 334.5], [1.60741878E12, 264.1666666666667], [1.6074192E12, 299.0], [1.60741872E12, 258.0], [1.6074189E12, 265.68181818181813]], "isOverall": false, "label": "Place order-794", "isController": false}, {"data": [[1.60741884E12, 91.93333333333334], [1.60741902E12, 105.11538461538461], [1.60741866E12, 64.66666666666667], [1.60741896E12, 86.66666666666667], [1.60741914E12, 98.66666666666669], [1.60741908E12, 86.47619047619048], [1.60741878E12, 81.66666666666667], [1.6074192E12, 189.2], [1.60741872E12, 150.57142857142856], [1.6074189E12, 117.4090909090909]], "isOverall": false, "label": "Place order-796", "isController": false}, {"data": [[1.60741884E12, 88.13636363636365], [1.60741902E12, 71.60317460317461], [1.60741866E12, 71.71428571428571], [1.60741896E12, 100.70491803278686], [1.60741914E12, 71.70967741935482], [1.60741908E12, 78.73584905660377], [1.60741878E12, 69.19999999999999], [1.6074192E12, 79.76923076923079], [1.60741872E12, 96.68421052631578], [1.6074189E12, 76.16981132075472]], "isOverall": false, "label": "Login-594", "isController": false}, {"data": [[1.60741884E12, 318.764705882353], [1.60741902E12, 404.48], [1.60741866E12, 371.6666666666667], [1.60741896E12, 393.04], [1.60741914E12, 372.4166666666667], [1.60741908E12, 389.1818181818182], [1.60741878E12, 347.75], [1.6074192E12, 355.66666666666663], [1.60741872E12, 357.125], [1.6074189E12, 322.047619047619]], "isOverall": false, "label": "Buy monitor-743", "isController": false}, {"data": [[1.60741884E12, 260.5], [1.60741902E12, 332.16], [1.60741866E12, 264.0], [1.60741896E12, 305.32000000000005], [1.60741914E12, 316.99999999999994], [1.60741908E12, 310.9545454545455], [1.60741878E12, 264.1666666666667], [1.6074192E12, 285.6], [1.60741872E12, 262.0], [1.6074189E12, 262.04999999999995]], "isOverall": false, "label": "Buy monitor-742", "isController": false}, {"data": [[1.60741884E12, 313.56818181818187], [1.60741902E12, 382.19047619047615], [1.60741866E12, 402.71428571428567], [1.60741896E12, 372.90163934426226], [1.60741914E12, 378.2903225806452], [1.60741908E12, 372.6981132075473], [1.60741878E12, 333.3333333333334], [1.6074192E12, 380.5384615384615], [1.60741872E12, 354.7894736842106], [1.6074189E12, 316.20754716981145]], "isOverall": false, "label": "Login-593", "isController": false}, {"data": [[1.60741884E12, 209.38888888888889], [1.60741902E12, 227.35999999999999], [1.60741866E12, 280.6666666666667], [1.60741896E12, 224.92], [1.60741914E12, 115.53846153846155], [1.60741908E12, 161.14285714285714], [1.60741878E12, 351.09090909090907], [1.6074192E12, 132.33333333333334], [1.60741872E12, 246.0], [1.6074189E12, 218.09523809523807]], "isOverall": false, "label": "Cart-772", "isController": false}, {"data": [[1.60741884E12, 263.99999999999994], [1.60741902E12, 345.7384615384615], [1.60741866E12, 272.85714285714283], [1.60741896E12, 322.45901639344265], [1.60741914E12, 351.875], [1.60741908E12, 326.2156862745098], [1.60741878E12, 265.4], [1.6074192E12, 296.33333333333337], [1.60741872E12, 263.3157894736842], [1.6074189E12, 265.71153846153857]], "isOverall": false, "label": "Login-592", "isController": false}, {"data": [[1.60741884E12, 151.76470588235293], [1.60741902E12, 113.92], [1.60741866E12, 272.6666666666667], [1.60741896E12, 90.79999999999998], [1.60741914E12, 153.91666666666669], [1.60741908E12, 121.81818181818181], [1.60741878E12, 171.16666666666669], [1.6074192E12, 63.83333333333333], [1.60741872E12, 166.625], [1.6074189E12, 183.66666666666663]], "isOverall": false, "label": "Buy monitor-744", "isController": false}, {"data": [[1.60741884E12, 301.12195121951225], [1.60741902E12, 375.031746031746], [1.60741866E12, 320.42857142857144], [1.60741896E12, 338.56666666666683], [1.60741914E12, 363.29999999999995], [1.60741908E12, 359.51923076923066], [1.60741878E12, 302.8], [1.6074192E12, 358.15384615384613], [1.60741872E12, 309.42105263157896], [1.6074189E12, 304.5357142857142]], "isOverall": false, "label": "Phone-623", "isController": false}, {"data": [[1.60741884E12, 265.92682926829275], [1.60741902E12, 335.08064516129025], [1.60741866E12, 271.99999999999994], [1.60741896E12, 307.52459016393453], [1.60741914E12, 318.44827586206884], [1.60741908E12, 327.69811320754707], [1.60741878E12, 263.40000000000003], [1.6074192E12, 294.99999999999994], [1.60741872E12, 304.94736842105254], [1.6074189E12, 265.1071428571427]], "isOverall": false, "label": "Phone-622", "isController": false}, {"data": [[1.60741884E12, 91.0], [1.60741902E12, 89.55555555555557], [1.60741866E12, 191.66666666666669], [1.60741896E12, 101.20833333333334], [1.60741914E12, 51.69230769230769], [1.60741908E12, 83.57894736842105], [1.60741878E12, 123.16666666666667], [1.6074192E12, 85.33333333333334], [1.60741872E12, 50.833333333333336], [1.6074189E12, 83.71428571428572]], "isOverall": false, "label": "Logout-839", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6074192E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 50.16666666666666, "minX": 1.60741866E12, "maxY": 615.8571428571428, "series": [{"data": [[1.60741884E12, 93.17073170731709], [1.60741902E12, 61.13636363636362], [1.60741866E12, 58.0], [1.60741896E12, 77.33928571428572], [1.60741914E12, 78.09677419354838], [1.60741908E12, 59.24999999999999], [1.60741878E12, 58.79310344827586], [1.6074192E12, 51.0], [1.60741872E12, 74.44444444444444], [1.6074189E12, 57.41379310344827]], "isOverall": false, "label": "Buy phone-660", "isController": false}, {"data": [[1.60741884E12, 298.5128205128205], [1.60741902E12, 361.3650793650793], [1.60741866E12, 329.6666666666667], [1.60741896E12, 341.5254237288137], [1.60741914E12, 400.71875], [1.60741908E12, 356.1960784313726], [1.60741878E12, 304.00000000000006], [1.6074192E12, 350.90909090909093], [1.60741872E12, 309.8333333333333], [1.6074189E12, 302.3571428571428]], "isOverall": false, "label": "Laptop-672", "isController": false}, {"data": [[1.60741884E12, 263.2051282051282], [1.60741902E12, 341.7846153846154], [1.60741866E12, 270.14285714285717], [1.60741896E12, 310.86206896551727], [1.60741914E12, 342.6666666666667], [1.60741908E12, 321.52000000000004], [1.60741878E12, 264.20000000000005], [1.6074192E12, 318.0], [1.60741872E12, 264.70588235294116], [1.6074189E12, 265.7192982456141]], "isOverall": false, "label": "Laptop-671", "isController": false}, {"data": [[1.60741884E12, 76.94444444444446], [1.60741902E12, 205.75999999999993], [1.60741866E12, 256.0], [1.60741896E12, 103.84], [1.60741914E12, 114.92307692307693], [1.60741908E12, 128.1904761904762], [1.60741878E12, 83.83333333333334], [1.6074192E12, 93.0], [1.60741872E12, 128.62499999999997], [1.6074189E12, 145.57142857142858]], "isOverall": false, "label": "Buy monitor-736", "isController": false}, {"data": [[1.60741884E12, 215.69047619047615], [1.60741902E12, 134.5873015873016], [1.60741866E12, 256.85714285714283], [1.60741896E12, 152.6166666666667], [1.60741914E12, 136.13333333333333], [1.60741908E12, 183.40384615384622], [1.60741878E12, 270.2068965517242], [1.6074192E12, 145.58333333333334], [1.60741872E12, 270.63157894736844], [1.6074189E12, 163.76785714285714]], "isOverall": false, "label": "Buy phone-624", "isController": false}, {"data": [[1.60741884E12, 264.6666666666667], [1.60741902E12, 348.8076923076923], [1.60741866E12, 261.6666666666667], [1.60741896E12, 307.125], [1.60741914E12, 312.2307692307692], [1.60741908E12, 374.14285714285717], [1.60741878E12, 258.3333333333333], [1.6074192E12, 283.8], [1.60741872E12, 263.875], [1.6074189E12, 260.42857142857144]], "isOverall": false, "label": "Buy monitor-738", "isController": false}, {"data": [[1.60741884E12, 397.0555555555556], [1.60741902E12, 488.6923076923078], [1.60741866E12, 386.3333333333333], [1.60741896E12, 416.54166666666663], [1.60741914E12, 465.0769230769231], [1.60741908E12, 449.04761904761904], [1.60741878E12, 394.58333333333326], [1.6074192E12, 433.2], [1.60741872E12, 382.125], [1.6074189E12, 401.80952380952374]], "isOverall": false, "label": "Buy monitor-737", "isController": false}, {"data": [[1.60741884E12, 288.4615384615385], [1.60741902E12, 369.2727272727273], [1.60741866E12, 319.85714285714283], [1.60741896E12, 326.2758620689655], [1.60741914E12, 379.24242424242414], [1.60741908E12, 358.98039215686276], [1.60741878E12, 312.3], [1.6074192E12, 326.7], [1.60741872E12, 307.1764705882353], [1.6074189E12, 306.859649122807]], "isOverall": false, "label": "Buy phone-663", "isController": false}, {"data": [[1.60741884E12, 264.73170731707313], [1.60741902E12, 341.86153846153843], [1.60741866E12, 268.14285714285717], [1.60741896E12, 311.91228070175436], [1.60741914E12, 337.7272727272728], [1.60741908E12, 350.0980392156863], [1.60741878E12, 262.5862068965517], [1.6074192E12, 335.90000000000003], [1.60741872E12, 262.16666666666674], [1.6074189E12, 265.8245614035088]], "isOverall": false, "label": "Buy phone-661", "isController": false}, {"data": [[1.60741884E12, 296.2682926829268], [1.60741902E12, 369.4393939393939], [1.60741866E12, 323.00000000000006], [1.60741896E12, 348.551724137931], [1.60741914E12, 375.9090909090908], [1.60741908E12, 370.11764705882354], [1.60741878E12, 306.3333333333333], [1.6074192E12, 346.2], [1.60741872E12, 307.4705882352941], [1.6074189E12, 303.0363636363636]], "isOverall": false, "label": "Buy phone-662", "isController": false}, {"data": [[1.60741884E12, 304.81249999999994], [1.60741902E12, 387.03703703703707], [1.60741866E12, 318.0], [1.60741896E12, 336.04166666666663], [1.60741914E12, 377.6923076923077], [1.60741908E12, 360.0526315789473], [1.60741878E12, 305.0833333333333], [1.6074192E12, 335.0], [1.60741872E12, 313.0], [1.6074189E12, 301.4761904761905]], "isOverall": false, "label": "Logout-840", "isController": false}, {"data": [[1.60741884E12, 286.4444444444444], [1.60741902E12, 361.71999999999997], [1.60741866E12, 316.6666666666667], [1.60741896E12, 337.2], [1.60741914E12, 350.53846153846155], [1.60741908E12, 371.2727272727273], [1.60741878E12, 296.75], [1.6074192E12, 331.2], [1.60741872E12, 309.125], [1.6074189E12, 291.75]], "isOverall": false, "label": "Buy monitor-739", "isController": false}, {"data": [[1.60741884E12, 163.81818181818184], [1.60741902E12, 144.65624999999997], [1.60741866E12, 192.375], [1.60741896E12, 101.26229508196718], [1.60741914E12, 121.06250000000001], [1.60741908E12, 90.53846153846156], [1.60741878E12, 169.8064516129032], [1.6074192E12, 114.00000000000001], [1.60741872E12, 227.7777777777778], [1.6074189E12, 127.77358490566034]], "isOverall": false, "label": "Signup-581", "isController": false}, {"data": [[1.60741884E12, 295.53658536585374], [1.60741902E12, 355.1904761904762], [1.60741866E12, 325.3333333333333], [1.60741896E12, 333.67213114754094], [1.60741914E12, 384.6857142857143], [1.60741908E12, 359.51020408163254], [1.60741878E12, 306.7586206896552], [1.6074192E12, 356.9], [1.60741872E12, 314.0], [1.6074189E12, 302.9019607843137]], "isOverall": false, "label": "Buy laptop-712", "isController": false}, {"data": [[1.60741884E12, 91.86666666666667], [1.60741902E12, 75.5], [1.60741866E12, 51.0], [1.60741896E12, 70.91666666666664], [1.60741914E12, 104.99999999999999], [1.60741908E12, 102.57142857142857], [1.60741878E12, 69.91666666666667], [1.6074192E12, 93.6], [1.60741872E12, 79.14285714285714], [1.6074189E12, 84.31818181818181]], "isOverall": false, "label": "Place order-812", "isController": false}, {"data": [[1.60741884E12, 261.7317073170732], [1.60741902E12, 355.2698412698414], [1.60741866E12, 267.33333333333337], [1.60741896E12, 303.8852459016394], [1.60741914E12, 323.9428571428571], [1.60741908E12, 329.84], [1.60741878E12, 265.58620689655163], [1.6074192E12, 309.0], [1.60741872E12, 263.47058823529414], [1.6074189E12, 265.3725490196079]], "isOverall": false, "label": "Buy laptop-711", "isController": false}, {"data": [[1.60741884E12, 82.56097560975613], [1.60741902E12, 81.52380952380953], [1.60741866E12, 93.33333333333333], [1.60741896E12, 75.39344262295079], [1.60741914E12, 118.17647058823529], [1.60741908E12, 77.94117647058825], [1.60741878E12, 101.79310344827586], [1.6074192E12, 114.60000000000001], [1.60741872E12, 62.88235294117648], [1.6074189E12, 67.15686274509805]], "isOverall": false, "label": "Buy laptop-710", "isController": false}, {"data": [[1.60741884E12, 301.8125], [1.60741902E12, 375.8076923076924], [1.60741866E12, 324.0], [1.60741896E12, 357.125], [1.60741914E12, 359.0833333333333], [1.60741908E12, 354.65000000000003], [1.60741878E12, 308.5833333333333], [1.6074192E12, 367.1666666666667], [1.60741872E12, 308.66666666666663], [1.6074189E12, 295.9545454545454]], "isOverall": false, "label": "Place order-814", "isController": false}, {"data": [[1.60741884E12, 262.93333333333334], [1.60741902E12, 328.9230769230769], [1.60741866E12, 260.6666666666667], [1.60741896E12, 319.3333333333334], [1.60741914E12, 304.0833333333333], [1.60741908E12, 331.3333333333333], [1.60741878E12, 268.8333333333333], [1.6074192E12, 283.8], [1.60741872E12, 261.14285714285717], [1.6074189E12, 266.0909090909091]], "isOverall": false, "label": "Place order-813", "isController": false}, {"data": [[1.60741884E12, 209.33333333333334], [1.60741902E12, 169.46031746031753], [1.60741866E12, 288.1666666666667], [1.60741896E12, 147.5254237288136], [1.60741914E12, 197.43749999999997], [1.60741908E12, 169.15686274509804], [1.60741878E12, 287.2666666666667], [1.6074192E12, 241.1818181818182], [1.60741872E12, 215.11111111111111], [1.6074189E12, 187.74999999999997]], "isOverall": false, "label": "Buy laptop-675", "isController": false}, {"data": [[1.60741884E12, 294.0], [1.60741902E12, 399.99999999999994], [1.60741866E12, 312.3333333333333], [1.60741896E12, 338.66666666666674], [1.60741914E12, 346.92307692307696], [1.60741908E12, 357.8947368421053], [1.60741878E12, 298.25000000000006], [1.6074192E12, 344.0], [1.60741872E12, 301.5], [1.6074189E12, 293.4285714285714]], "isOverall": false, "label": "Place order-815", "isController": false}, {"data": [[1.60741884E12, 300.77777777777777], [1.60741902E12, 375.1600000000001], [1.60741866E12, 309.6666666666667], [1.60741896E12, 318.04], [1.60741914E12, 377.53846153846155], [1.60741908E12, 355.5238095238095], [1.60741878E12, 304.8181818181818], [1.6074192E12, 398.66666666666663], [1.60741872E12, 307.75000000000006], [1.6074189E12, 301.28571428571433]], "isOverall": false, "label": "Buy monitor-761", "isController": false}, {"data": [[1.60741884E12, 262.0555555555555], [1.60741902E12, 338.56], [1.60741866E12, 259.3333333333333], [1.60741896E12, 298.2], [1.60741914E12, 343.16666666666663], [1.60741908E12, 348.5], [1.60741878E12, 261.2727272727273], [1.6074192E12, 300.3333333333333], [1.60741872E12, 264.25], [1.6074189E12, 267.19047619047615]], "isOverall": false, "label": "Buy monitor-760", "isController": false}, {"data": [[1.60741884E12, 293.5], [1.60741902E12, 354.84], [1.60741866E12, 309.6666666666667], [1.60741896E12, 328.6], [1.60741914E12, 332.7692307692308], [1.60741908E12, 375.9523809523809], [1.60741878E12, 294.72727272727275], [1.6074192E12, 322.5], [1.60741872E12, 301.25], [1.6074189E12, 293.7619047619047]], "isOverall": false, "label": "Buy monitor-762", "isController": false}, {"data": [[1.60741884E12, 290.2926829268293], [1.60741902E12, 345.8253968253967], [1.60741866E12, 322.0], [1.60741896E12, 331.1833333333333], [1.60741914E12, 336.68571428571425], [1.60741908E12, 359.9591836734694], [1.60741878E12, 302.2758620689655], [1.6074192E12, 311.2], [1.60741872E12, 298.2352941176471], [1.6074189E12, 291.4313725490196]], "isOverall": false, "label": "Buy laptop-713", "isController": false}, {"data": [[1.60741884E12, 334.5], [1.60741902E12, 294.68000000000006], [1.60741866E12, 406.0], [1.60741896E12, 390.7199999999999], [1.60741914E12, 359.46153846153857], [1.60741908E12, 325.8571428571429], [1.60741878E12, 369.41666666666663], [1.6074192E12, 404.8], [1.60741872E12, 512.9999999999999], [1.6074189E12, 375.3333333333333]], "isOverall": false, "label": "Buy monitor-724", "isController": false}, {"data": [[1.60741884E12, 288.219512195122], [1.60741902E12, 365.88709677419354], [1.60741866E12, 313.28571428571433], [1.60741896E12, 322.5081967213115], [1.60741914E12, 344.7931034482759], [1.60741908E12, 367.92452830188665], [1.60741878E12, 299.06666666666666], [1.6074192E12, 333.15384615384613], [1.60741872E12, 305.63157894736844], [1.6074189E12, 291.30357142857144]], "isOverall": false, "label": "Login-614", "isController": false}, {"data": [[1.60741884E12, 298.6666666666667], [1.60741902E12, 381.87096774193554], [1.60741866E12, 322.0], [1.60741896E12, 337.59016393442636], [1.60741914E12, 359.3103448275861], [1.60741908E12, 373.64150943396237], [1.60741878E12, 306.3333333333334], [1.6074192E12, 362.9230769230769], [1.60741872E12, 308.1578947368422], [1.6074189E12, 302.3454545454546]], "isOverall": false, "label": "Login-613", "isController": false}, {"data": [[1.60741884E12, 396.52272727272737], [1.60741902E12, 421.12698412698404], [1.60741866E12, 615.8571428571428], [1.60741896E12, 281.8852459016395], [1.60741914E12, 312.1290322580645], [1.60741908E12, 364.66037735849056], [1.60741878E12, 425.4], [1.6074192E12, 347.23076923076917], [1.60741872E12, 532.9473684210527], [1.6074189E12, 400.33962264150944]], "isOverall": false, "label": "Login-610", "isController": false}, {"data": [[1.60741884E12, 292.5777777777778], [1.60741902E12, 357.13846153846157], [1.60741866E12, 323.57142857142856], [1.60741896E12, 337.67213114754094], [1.60741914E12, 350.75000000000006], [1.60741908E12, 348.7884615384615], [1.60741878E12, 300.76666666666665], [1.6074192E12, 340.0], [1.60741872E12, 301.7894736842106], [1.6074189E12, 291.59615384615387]], "isOverall": false, "label": "Signup-591", "isController": false}, {"data": [[1.60741884E12, 260.11627906976736], [1.60741902E12, 328.67741935483883], [1.60741866E12, 269.5714285714286], [1.60741896E12, 293.42622950819674], [1.60741914E12, 322.6333333333333], [1.60741908E12, 330.2641509433962], [1.60741878E12, 262.0], [1.6074192E12, 312.8571428571429], [1.60741872E12, 263.52631578947376], [1.6074189E12, 265.962962962963]], "isOverall": false, "label": "Login-612", "isController": false}, {"data": [[1.60741884E12, 65.5681818181818], [1.60741902E12, 65.52380952380952], [1.60741866E12, 118.0], [1.60741896E12, 79.55737704918035], [1.60741914E12, 71.58064516129033], [1.60741908E12, 72.19230769230772], [1.60741878E12, 107.06666666666665], [1.6074192E12, 84.15384615384616], [1.60741872E12, 73.73684210526315], [1.6074189E12, 60.66037735849057]], "isOverall": false, "label": "Login-611", "isController": false}, {"data": [[1.60741884E12, 389.65909090909093], [1.60741902E12, 449.4461538461538], [1.60741866E12, 401.85714285714283], [1.60741896E12, 449.6065573770491], [1.60741914E12, 458.15624999999994], [1.60741908E12, 463.6923076923078], [1.60741878E12, 388.3548387096775], [1.6074192E12, 444.2307692307692], [1.60741872E12, 385.3684210526316], [1.6074189E12, 392.9230769230768]], "isOverall": false, "label": "Signup-590", "isController": false}, {"data": [[1.60741884E12, 262.0], [1.60741902E12, 340.6190476190475], [1.60741866E12, 268.83333333333337], [1.60741896E12, 326.61016949152537], [1.60741914E12, 319.56250000000006], [1.60741908E12, 344.41176470588243], [1.60741878E12, 262.9], [1.6074192E12, 318.45454545454544], [1.60741872E12, 261.5555555555556], [1.6074189E12, 266.32142857142867]], "isOverall": false, "label": "Buy laptop-689", "isController": false}, {"data": [[1.60741884E12, 263.17073170731715], [1.60741902E12, 337.04687499999994], [1.60741866E12, 274.3333333333333], [1.60741896E12, 299.6101694915254], [1.60741914E12, 330.57575757575756], [1.60741908E12, 336.76000000000005], [1.60741878E12, 261.6785714285713], [1.6074192E12, 292.4], [1.60741872E12, 262.7777777777777], [1.6074189E12, 264.4909090909091]], "isOverall": false, "label": "Buy laptop-688", "isController": false}, {"data": [[1.60741884E12, 67.61538461538461], [1.60741902E12, 74.60317460317458], [1.60741866E12, 95.33333333333333], [1.60741896E12, 73.64406779661017], [1.60741914E12, 77.28125000000001], [1.60741908E12, 75.88235294117648], [1.60741878E12, 80.66666666666664], [1.6074192E12, 50.81818181818182], [1.60741872E12, 97.38888888888889], [1.6074189E12, 80.67857142857143]], "isOverall": false, "label": "Buy laptop-687", "isController": false}, {"data": [[1.60741884E12, 290.68750000000006], [1.60741902E12, 368.7307692307693], [1.60741866E12, 312.3333333333333], [1.60741896E12, 312.9090909090909], [1.60741914E12, 348.5833333333333], [1.60741908E12, 352.95454545454555], [1.60741878E12, 298.25], [1.6074192E12, 354.0], [1.60741872E12, 312.42857142857144], [1.6074189E12, 294.30434782608694]], "isOverall": false, "label": "Cart-789", "isController": false}, {"data": [[1.60741884E12, 290.3529411764706], [1.60741902E12, 389.7692307692307], [1.60741866E12, 322.3333333333333], [1.60741896E12, 321.0000000000001], [1.60741914E12, 354.25], [1.60741908E12, 355.49999999999994], [1.60741878E12, 296.6666666666667], [1.6074192E12, 352.16666666666663], [1.60741872E12, 303.0], [1.6074189E12, 296.0454545454545]], "isOverall": false, "label": "Cart-788", "isController": false}, {"data": [[1.60741884E12, 291.125], [1.60741902E12, 347.03846153846155], [1.60741866E12, 307.3333333333333], [1.60741896E12, 334.8636363636364], [1.60741914E12, 342.75], [1.60741908E12, 359.09090909090907], [1.60741878E12, 294.49999999999994], [1.6074192E12, 355.5], [1.60741872E12, 305.7142857142857], [1.6074189E12, 295.8695652173913]], "isOverall": false, "label": "Cart-787", "isController": false}, {"data": [[1.60741884E12, 262.1764705882353], [1.60741902E12, 326.92307692307685], [1.60741866E12, 267.6666666666667], [1.60741896E12, 308.50000000000006], [1.60741914E12, 306.83333333333337], [1.60741908E12, 317.86363636363643], [1.60741878E12, 260.75], [1.6074192E12, 293.6666666666667], [1.60741872E12, 263.7142857142857], [1.6074189E12, 267.7727272727273]], "isOverall": false, "label": "Cart-786", "isController": false}, {"data": [[1.60741884E12, 173.42857142857142], [1.60741902E12, 120.53030303030302], [1.60741866E12, 280.8571428571429], [1.60741896E12, 145.00000000000003], [1.60741914E12, 110.6774193548387], [1.60741908E12, 122.7692307692308], [1.60741878E12, 184.62068965517238], [1.6074192E12, 120.8], [1.60741872E12, 215.66666666666669], [1.6074189E12, 141.91228070175438]], "isOverall": false, "label": "Buy phone-645", "isController": false}, {"data": [[1.60741884E12, 262.22222222222223], [1.60741902E12, 332.48], [1.60741866E12, 265.0], [1.60741896E12, 316.08333333333337], [1.60741914E12, 308.84615384615387], [1.60741908E12, 313.6363636363637], [1.60741878E12, 264.00000000000006], [1.6074192E12, 292.5], [1.60741872E12, 259.625], [1.6074189E12, 265.0]], "isOverall": false, "label": "Cart-781", "isController": false}, {"data": [[1.60741884E12, 264.11111111111114], [1.60741902E12, 379.1666666666667], [1.60741866E12, 259.3333333333333], [1.60741896E12, 308.6], [1.60741914E12, 326.61538461538464], [1.60741908E12, 354.7727272727272], [1.60741878E12, 264.2727272727273], [1.6074192E12, 300.66666666666663], [1.60741872E12, 261.875], [1.6074189E12, 266.90476190476187]], "isOverall": false, "label": "Cart-780", "isController": false}, {"data": [[1.60741884E12, 315.8863636363636], [1.60741902E12, 299.4307692307693], [1.60741866E12, 362.875], [1.60741896E12, 278.40322580645153], [1.60741914E12, 326.8787878787878], [1.60741908E12, 286.4000000000001], [1.60741878E12, 357.87096774193543], [1.6074192E12, 380.0], [1.60741872E12, 352.88888888888897], [1.6074189E12, 302.73584905660374]], "isOverall": false, "label": "Signup-563-1", "isController": false}, {"data": [[1.60741884E12, 286.1162790697675], [1.60741902E12, 338.578125], [1.60741866E12, 287.7142857142857], [1.60741896E12, 302.7068965517241], [1.60741914E12, 309.9677419354838], [1.60741908E12, 327.90384615384613], [1.60741878E12, 266.7586206896552], [1.6074192E12, 321.3636363636364], [1.60741872E12, 262.6111111111112], [1.6074189E12, 267.01785714285717]], "isOverall": false, "label": "Buy phone-643", "isController": false}, {"data": [[1.60741884E12, 287.5454545454545], [1.60741902E12, 282.78461538461534], [1.60741866E12, 288.875], [1.60741896E12, 285.8196721311477], [1.60741914E12, 278.6470588235294], [1.60741908E12, 279.6], [1.60741878E12, 285.16129032258067], [1.6074192E12, 309.66666666666674], [1.60741872E12, 276.8888888888889], [1.6074189E12, 295.2222222222222]], "isOverall": false, "label": "Signup-563-0", "isController": false}, {"data": [[1.60741884E12, 319.23255813953494], [1.60741902E12, 382.30769230769226], [1.60741866E12, 362.7142857142857], [1.60741896E12, 354.8771929824561], [1.60741914E12, 376.6129032258064], [1.60741908E12, 381.5576923076923], [1.60741878E12, 334.6551724137931], [1.6074192E12, 377.7272727272727], [1.60741872E12, 345.9444444444444], [1.6074189E12, 319.8928571428572]], "isOverall": false, "label": "Buy phone-644", "isController": false}, {"data": [[1.60741884E12, 89.17647058823529], [1.60741902E12, 60.19999999999999], [1.60741866E12, 58.666666666666664], [1.60741896E12, 123.83999999999997], [1.60741914E12, 50.16666666666666], [1.60741908E12, 62.40909090909092], [1.60741878E12, 50.416666666666664], [1.6074192E12, 122.5], [1.60741872E12, 104.0], [1.6074189E12, 54.476190476190474]], "isOverall": false, "label": "Buy monitor-759", "isController": false}, {"data": [[1.60741884E12, 289.1627906976744], [1.60741902E12, 360.09523809523813], [1.60741866E12, 319.4285714285714], [1.60741896E12, 386.86440677966095], [1.60741914E12, 354.6129032258064], [1.60741908E12, 359.2307692307691], [1.60741878E12, 296.7500000000001], [1.6074192E12, 338.00000000000006], [1.60741872E12, 304.94736842105266], [1.6074189E12, 293.857142857143]], "isOverall": false, "label": "Buy phone-641", "isController": false}, {"data": [[1.60741884E12, 262.0588235294118], [1.60741902E12, 342.6923076923077], [1.60741866E12, 264.6666666666667], [1.60741896E12, 332.2608695652174], [1.60741914E12, 322.91666666666663], [1.60741908E12, 327.38095238095235], [1.60741878E12, 264.9166666666667], [1.6074192E12, 284.6666666666667], [1.60741872E12, 264.7142857142857], [1.6074189E12, 265.22727272727275]], "isOverall": false, "label": "Cart-785", "isController": false}, {"data": [[1.60741884E12, 261.4444444444444], [1.60741902E12, 326.1153846153847], [1.60741866E12, 260.3333333333333], [1.60741896E12, 295.47826086956525], [1.60741914E12, 413.8333333333333], [1.60741908E12, 344.047619047619], [1.60741878E12, 262.9166666666667], [1.6074192E12, 345.0], [1.60741872E12, 262.42857142857144], [1.6074189E12, 266.904761904762]], "isOverall": false, "label": "Cart-784", "isController": false}, {"data": [[1.60741884E12, 311.7777777777777], [1.60741902E12, 400.69230769230774], [1.60741866E12, 357.6666666666667], [1.60741896E12, 333.86956521739137], [1.60741914E12, 338.0], [1.60741908E12, 388.77272727272725], [1.60741878E12, 322.75], [1.6074192E12, 378.16666666666663], [1.60741872E12, 329.2857142857143], [1.6074189E12, 314.4761904761905]], "isOverall": false, "label": "Cart-783", "isController": false}, {"data": [[1.60741884E12, 289.69767441860466], [1.60741902E12, 373.51562499999994], [1.60741866E12, 319.0], [1.60741896E12, 336.91379310344814], [1.60741914E12, 339.6129032258064], [1.60741908E12, 353.9807692307693], [1.60741878E12, 295.5], [1.6074192E12, 377.27272727272725], [1.60741872E12, 302.1578947368421], [1.6074189E12, 292.142857142857]], "isOverall": false, "label": "Buy phone-640", "isController": false}, {"data": [[1.60741884E12, 324.1666666666667], [1.60741902E12, 337.80000000000007], [1.60741866E12, 311.3333333333333], [1.60741896E12, 321.41666666666674], [1.60741914E12, 353.76923076923083], [1.60741908E12, 350.909090909091], [1.60741878E12, 297.9166666666667], [1.6074192E12, 318.8333333333333], [1.60741872E12, 305.42857142857144], [1.6074189E12, 295.7142857142857]], "isOverall": false, "label": "Cart-782", "isController": false}, {"data": [[1.60741884E12, 67.52272727272725], [1.60741902E12, 72.84375], [1.60741866E12, 70.875], [1.60741896E12, 76.35483870967742], [1.60741914E12, 75.24999999999999], [1.60741908E12, 62.58823529411767], [1.60741878E12, 77.51612903225806], [1.6074192E12, 79.69230769230771], [1.60741872E12, 87.05555555555556], [1.6074189E12, 80.75471698113208]], "isOverall": false, "label": "Signup-564", "isController": false}, {"data": [[1.60741884E12, 283.9268292682927], [1.60741902E12, 343.13846153846146], [1.60741866E12, 268.8333333333333], [1.60741896E12, 309.9666666666666], [1.60741914E12, 323.2058823529411], [1.60741908E12, 317.91836734693885], [1.60741878E12, 295.99999999999994], [1.6074192E12, 338.5], [1.60741872E12, 264.7058823529412], [1.6074189E12, 269.7884615384616]], "isOverall": false, "label": "Buy laptop-693", "isController": false}, {"data": [[1.60741884E12, 100.88636363636365], [1.60741902E12, 103.66153846153848], [1.60741866E12, 92.22222222222223], [1.60741896E12, 96.88524590163937], [1.60741914E12, 99.26470588235296], [1.60741908E12, 98.19999999999996], [1.60741878E12, 93.83870967741933], [1.6074192E12, 125.0], [1.60741872E12, 104.05882352941175], [1.6074189E12, 93.66666666666664]], "isOverall": false, "label": "Signup-562", "isController": false}, {"data": [[1.60741884E12, 289.2439024390244], [1.60741902E12, 343.6615384615384], [1.60741866E12, 311.6666666666667], [1.60741896E12, 322.6379310344827], [1.60741914E12, 347.72727272727275], [1.60741908E12, 364.36], [1.60741878E12, 298.2142857142857], [1.6074192E12, 303.1], [1.60741872E12, 306.7777777777778], [1.6074189E12, 291.4259259259258]], "isOverall": false, "label": "Buy laptop-691", "isController": false}, {"data": [[1.60741884E12, 287.5454545454545], [1.60741902E12, 282.78461538461534], [1.60741866E12, 288.875], [1.60741896E12, 285.5645161290323], [1.60741914E12, 278.8181818181818], [1.60741908E12, 279.6], [1.60741878E12, 285.16129032258067], [1.6074192E12, 306.84615384615387], [1.60741872E12, 276.8888888888889], [1.6074189E12, 295.6981132075471]], "isOverall": false, "label": "Signup-563", "isController": false}, {"data": [[1.60741884E12, 313.1219512195122], [1.60741902E12, 370.57142857142856], [1.60741866E12, 317.1666666666667], [1.60741896E12, 330.0666666666667], [1.60741914E12, 346.24242424242425], [1.60741908E12, 363.11999999999995], [1.60741878E12, 297.2142857142857], [1.6074192E12, 341.1], [1.60741872E12, 304.77777777777777], [1.6074189E12, 293.8888888888888]], "isOverall": false, "label": "Buy laptop-690", "isController": false}, {"data": [[1.60741884E12, 65.5625], [1.60741902E12, 62.55555555555555], [1.60741866E12, 63.0], [1.60741896E12, 71.79166666666666], [1.60741914E12, 63.07692307692308], [1.60741908E12, 95.36842105263156], [1.60741878E12, 80.0], [1.6074192E12, 60.833333333333336], [1.60741872E12, 134.0], [1.6074189E12, 73.71428571428572]], "isOverall": false, "label": "Logout-823", "isController": false}, {"data": [[1.60741884E12, 213.93181818181822], [1.60741902E12, 216.5151515151515], [1.60741866E12, 226.88888888888889], [1.60741896E12, 237.34426229508196], [1.60741914E12, 206.8], [1.60741908E12, 247.48979591836738], [1.60741878E12, 341.6451612903225], [1.6074192E12, 225.2727272727273], [1.60741872E12, 203.58823529411765], [1.6074189E12, 227.88888888888897]], "isOverall": false, "label": "Signup-560", "isController": false}, {"data": [[1.60741884E12, 260.904761904762], [1.60741902E12, 329.12500000000006], [1.60741866E12, 271.00000000000006], [1.60741896E12, 300.2033898305085], [1.60741914E12, 335.67741935483866], [1.60741908E12, 324.1372549019607], [1.60741878E12, 263.48275862068965], [1.6074192E12, 343.6666666666667], [1.60741872E12, 262.157894736842], [1.6074189E12, 265.01785714285705]], "isOverall": false, "label": "Buy phone-638", "isController": false}, {"data": [[1.60741884E12, 113.5909090909091], [1.60741902E12, 94.13636363636368], [1.60741866E12, 93.77777777777779], [1.60741896E12, 108.57377049180332], [1.60741914E12, 95.2285714285714], [1.60741908E12, 96.53061224489795], [1.60741878E12, 97.25806451612904], [1.6074192E12, 90.09090909090908], [1.60741872E12, 91.82352941176472], [1.6074189E12, 97.16666666666664]], "isOverall": false, "label": "Signup-561", "isController": false}, {"data": [[1.60741884E12, 262.1190476190476], [1.60741902E12, 332.5873015873016], [1.60741866E12, 272.8571428571429], [1.60741896E12, 304.3050847457627], [1.60741914E12, 313.4193548387097], [1.60741908E12, 346.9038461538461], [1.60741878E12, 264.1034482758621], [1.6074192E12, 311.6666666666667], [1.60741872E12, 263.36842105263156], [1.6074189E12, 267.25]], "isOverall": false, "label": "Buy phone-639", "isController": false}, {"data": [[1.60741884E12, 67.33333333333333], [1.60741902E12, 58.904761904761905], [1.60741866E12, 58.42857142857143], [1.60741896E12, 80.58333333333337], [1.60741914E12, 71.16129032258065], [1.60741908E12, 64.78431372549021], [1.60741878E12, 66.72413793103449], [1.6074192E12, 67.41666666666667], [1.60741872E12, 74.42105263157896], [1.6074189E12, 67.21428571428572]], "isOverall": false, "label": "Buy phone-637", "isController": false}, {"data": [[1.60741884E12, 117.6829268292683], [1.60741902E12, 105.109375], [1.60741866E12, 142.33333333333334], [1.60741896E12, 87.33333333333331], [1.60741914E12, 99.17647058823529], [1.60741908E12, 80.59999999999998], [1.60741878E12, 95.9655172413793], [1.6074192E12, 80.69999999999999], [1.60741872E12, 185.8235294117647], [1.6074189E12, 96.71153846153847]], "isOverall": false, "label": "Buy laptop-695", "isController": false}, {"data": [[1.60741884E12, 295.8571428571429], [1.60741902E12, 350.9682539682539], [1.60741866E12, 307.66666666666663], [1.60741896E12, 342.69491525423723], [1.60741914E12, 349.25714285714287], [1.60741908E12, 357.1600000000001], [1.60741878E12, 303.2413793103448], [1.6074192E12, 386.19999999999993], [1.60741872E12, 307.25000000000006], [1.6074189E12, 307.35294117647055]], "isOverall": false, "label": "Monitor-721", "isController": false}, {"data": [[1.60741884E12, 323.36585365853665], [1.60741902E12, 391.10937500000006], [1.60741866E12, 366.5], [1.60741896E12, 361.85], [1.60741914E12, 363.61764705882354], [1.60741908E12, 370.8], [1.60741878E12, 332.5862068965517], [1.6074192E12, 379.7], [1.60741872E12, 340.94117647058823], [1.6074189E12, 323.5961538461537]], "isOverall": false, "label": "Buy laptop-694", "isController": false}, {"data": [[1.60741884E12, 262.07317073170725], [1.60741902E12, 348.45312499999994], [1.60741866E12, 258.5], [1.60741896E12, 303.6271186440679], [1.60741914E12, 371.2285714285714], [1.60741908E12, 333.2040816326529], [1.60741878E12, 263.82758620689657], [1.6074192E12, 308.80000000000007], [1.60741872E12, 263.5882352941176], [1.6074189E12, 279.31372549019613]], "isOverall": false, "label": "Monitor-720", "isController": false}, {"data": [[1.60741884E12, 508.5624999999999], [1.60741902E12, 449.76923076923083], [1.60741866E12, 541.6666666666666], [1.60741896E12, 526.1304347826086], [1.60741914E12, 450.91666666666663], [1.60741908E12, 461.2272727272727], [1.60741878E12, 445.5833333333333], [1.6074192E12, 437.0], [1.60741872E12, 437.28571428571433], [1.6074189E12, 512.5454545454546]], "isOverall": false, "label": "Place order-793", "isController": false}, {"data": [[1.60741884E12, 422.4666666666667], [1.60741902E12, 481.46153846153845], [1.60741866E12, 512.6666666666666], [1.60741896E12, 435.16666666666674], [1.60741914E12, 468.9166666666667], [1.60741908E12, 490.45454545454544], [1.60741878E12, 441.25], [1.6074192E12, 531.4], [1.60741872E12, 504.99999999999994], [1.6074189E12, 391.68181818181813]], "isOverall": false, "label": "Place order-795", "isController": false}, {"data": [[1.60741884E12, 290.5555555555555], [1.60741902E12, 358.67999999999995], [1.60741866E12, 315.0], [1.60741896E12, 323.88000000000005], [1.60741914E12, 342.0], [1.60741908E12, 343.6363636363637], [1.60741878E12, 297.83333333333337], [1.6074192E12, 334.4], [1.60741872E12, 297.62500000000006], [1.6074189E12, 291.00000000000006]], "isOverall": false, "label": "Buy monitor-740", "isController": false}, {"data": [[1.60741884E12, 261.06250000000006], [1.60741902E12, 332.7307692307692], [1.60741866E12, 262.0], [1.60741896E12, 294.5217391304348], [1.60741914E12, 340.83333333333337], [1.60741908E12, 334.5], [1.60741878E12, 264.1666666666667], [1.6074192E12, 299.0], [1.60741872E12, 258.0], [1.6074189E12, 265.68181818181813]], "isOverall": false, "label": "Place order-794", "isController": false}, {"data": [[1.60741884E12, 91.53333333333335], [1.60741902E12, 104.61538461538461], [1.60741866E12, 64.33333333333333], [1.60741896E12, 86.45833333333333], [1.60741914E12, 98.24999999999999], [1.60741908E12, 85.95238095238096], [1.60741878E12, 81.08333333333333], [1.6074192E12, 188.4], [1.60741872E12, 150.0], [1.6074189E12, 116.90909090909089]], "isOverall": false, "label": "Place order-796", "isController": false}, {"data": [[1.60741884E12, 87.68181818181817], [1.60741902E12, 70.95238095238098], [1.60741866E12, 71.14285714285715], [1.60741896E12, 100.26229508196724], [1.60741914E12, 71.2258064516129], [1.60741908E12, 78.16981132075472], [1.60741878E12, 68.63333333333334], [1.6074192E12, 79.3076923076923], [1.60741872E12, 96.05263157894738], [1.6074189E12, 75.77358490566037]], "isOverall": false, "label": "Login-594", "isController": false}, {"data": [[1.60741884E12, 318.764705882353], [1.60741902E12, 404.48], [1.60741866E12, 371.6666666666667], [1.60741896E12, 393.04], [1.60741914E12, 372.4166666666667], [1.60741908E12, 389.1818181818182], [1.60741878E12, 347.75], [1.6074192E12, 355.66666666666663], [1.60741872E12, 357.125], [1.6074189E12, 322.047619047619]], "isOverall": false, "label": "Buy monitor-743", "isController": false}, {"data": [[1.60741884E12, 260.5], [1.60741902E12, 332.16], [1.60741866E12, 264.0], [1.60741896E12, 305.32000000000005], [1.60741914E12, 316.99999999999994], [1.60741908E12, 310.9545454545455], [1.60741878E12, 264.1666666666667], [1.6074192E12, 285.6], [1.60741872E12, 262.0], [1.6074189E12, 262.04999999999995]], "isOverall": false, "label": "Buy monitor-742", "isController": false}, {"data": [[1.60741884E12, 313.54545454545456], [1.60741902E12, 382.1587301587302], [1.60741866E12, 402.71428571428567], [1.60741896E12, 372.88524590163934], [1.60741914E12, 378.2903225806452], [1.60741908E12, 372.67924528301893], [1.60741878E12, 333.29999999999995], [1.6074192E12, 380.5384615384615], [1.60741872E12, 354.7368421052632], [1.6074189E12, 316.20754716981145]], "isOverall": false, "label": "Login-593", "isController": false}, {"data": [[1.60741884E12, 208.83333333333334], [1.60741902E12, 226.72], [1.60741866E12, 280.3333333333333], [1.60741896E12, 224.08], [1.60741914E12, 114.92307692307692], [1.60741908E12, 160.52380952380955], [1.60741878E12, 350.5454545454545], [1.6074192E12, 131.83333333333334], [1.60741872E12, 245.375], [1.6074189E12, 217.52380952380955]], "isOverall": false, "label": "Cart-772", "isController": false}, {"data": [[1.60741884E12, 263.99999999999994], [1.60741902E12, 345.7384615384615], [1.60741866E12, 272.85714285714283], [1.60741896E12, 322.45901639344265], [1.60741914E12, 351.875], [1.60741908E12, 326.2156862745098], [1.60741878E12, 265.4], [1.6074192E12, 296.33333333333337], [1.60741872E12, 263.3157894736842], [1.6074189E12, 265.71153846153857]], "isOverall": false, "label": "Login-592", "isController": false}, {"data": [[1.60741884E12, 151.35294117647058], [1.60741902E12, 113.44000000000001], [1.60741866E12, 272.0], [1.60741896E12, 90.11999999999999], [1.60741914E12, 153.33333333333331], [1.60741908E12, 121.45454545454545], [1.60741878E12, 170.50000000000003], [1.6074192E12, 63.5], [1.60741872E12, 166.25], [1.6074189E12, 183.1904761904762]], "isOverall": false, "label": "Buy monitor-744", "isController": false}, {"data": [[1.60741884E12, 301.0975609756098], [1.60741902E12, 374.98412698412693], [1.60741866E12, 320.2857142857143], [1.60741896E12, 338.56666666666683], [1.60741914E12, 363.29999999999995], [1.60741908E12, 359.49999999999994], [1.60741878E12, 302.8], [1.6074192E12, 358.0769230769231], [1.60741872E12, 309.42105263157896], [1.6074189E12, 304.5000000000001]], "isOverall": false, "label": "Phone-623", "isController": false}, {"data": [[1.60741884E12, 265.92682926829275], [1.60741902E12, 335.08064516129025], [1.60741866E12, 271.99999999999994], [1.60741896E12, 307.52459016393453], [1.60741914E12, 318.44827586206884], [1.60741908E12, 327.69811320754707], [1.60741878E12, 263.40000000000003], [1.6074192E12, 294.99999999999994], [1.60741872E12, 304.94736842105254], [1.6074189E12, 265.1071428571427]], "isOverall": false, "label": "Phone-622", "isController": false}, {"data": [[1.60741884E12, 91.0], [1.60741902E12, 89.55555555555557], [1.60741866E12, 191.66666666666669], [1.60741896E12, 101.20833333333334], [1.60741914E12, 51.69230769230769], [1.60741908E12, 83.5263157894737], [1.60741878E12, 123.16666666666667], [1.6074192E12, 85.33333333333334], [1.60741872E12, 50.833333333333336], [1.6074189E12, 83.66666666666666]], "isOverall": false, "label": "Logout-839", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6074192E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.60741866E12, "maxY": 1.9166666666666665, "series": [{"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-660", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Laptop-672", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Laptop-671", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-736", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-624", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-738", "isController": false}, {"data": [[1.60741884E12, 0.8888888888888887], [1.60741902E12, 0.9615384615384615], [1.60741866E12, 1.0], [1.60741896E12, 1.0], [1.60741914E12, 1.0], [1.60741908E12, 1.2857142857142863], [1.60741878E12, 1.0833333333333335], [1.6074192E12, 1.0], [1.60741872E12, 1.125], [1.6074189E12, 1.1904761904761907]], "isOverall": false, "label": "Buy monitor-737", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-663", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-661", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-662", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Logout-840", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-739", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Signup-581", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-712", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Place order-812", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-711", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-710", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Place order-814", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Place order-813", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-675", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Place order-815", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-761", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-760", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-762", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-713", "isController": false}, {"data": [[1.60741884E12, 1.1666666666666667], [1.60741902E12, 1.2400000000000002], [1.60741866E12, 1.6666666666666667], [1.60741896E12, 1.4000000000000004], [1.60741914E12, 1.0769230769230769], [1.60741908E12, 1.6190476190476188], [1.60741878E12, 1.9166666666666665], [1.6074192E12, 1.0], [1.60741872E12, 1.25], [1.6074189E12, 1.0952380952380956]], "isOverall": false, "label": "Buy monitor-724", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Login-614", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Login-613", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Login-610", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Signup-591", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Login-612", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Login-611", "isController": false}, {"data": [[1.60741884E12, 1.1136363636363633], [1.60741902E12, 1.1076923076923075], [1.60741866E12, 1.0], [1.60741896E12, 1.6065573770491806], [1.60741914E12, 1.2812500000000002], [1.60741908E12, 1.0000000000000004], [1.60741878E12, 1.1612903225806455], [1.6074192E12, 1.2307692307692308], [1.60741872E12, 1.0526315789473686], [1.6074189E12, 1.0192307692307692]], "isOverall": false, "label": "Signup-590", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-689", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-688", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-687", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-789", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-788", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-787", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-786", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-645", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-781", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-780", "isController": false}, {"data": [[1.60741884E12, 1.0454545454545459], [1.60741902E12, 1.1692307692307695], [1.60741866E12, 1.0], [1.60741896E12, 1.370967741935484], [1.60741914E12, 1.090909090909091], [1.60741908E12, 1.0799999999999998], [1.60741878E12, 0.935483870967742], [1.6074192E12, 1.3076923076923077], [1.60741872E12, 1.1111111111111114], [1.6074189E12, 1.150943396226415]], "isOverall": false, "label": "Signup-563-1", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-643", "isController": false}, {"data": [[1.60741884E12, 1.0454545454545459], [1.60741902E12, 1.1076923076923075], [1.60741866E12, 1.625], [1.60741896E12, 1.540983606557377], [1.60741914E12, 0.9999999999999999], [1.60741908E12, 1.1400000000000008], [1.60741878E12, 1.0645161290322582], [1.6074192E12, 1.0], [1.60741872E12, 1.4444444444444444], [1.6074189E12, 1.1666666666666665]], "isOverall": false, "label": "Signup-563-0", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-644", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-759", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-641", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-785", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-784", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-783", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-640", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-782", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Signup-564", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-693", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Signup-562", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-691", "isController": false}, {"data": [[1.60741884E12, 1.0454545454545459], [1.60741902E12, 1.1076923076923075], [1.60741866E12, 1.625], [1.60741896E12, 1.532258064516129], [1.60741914E12, 0.9999999999999999], [1.60741908E12, 1.1400000000000008], [1.60741878E12, 1.0645161290322582], [1.6074192E12, 1.0], [1.60741872E12, 1.4444444444444444], [1.6074189E12, 1.169811320754717]], "isOverall": false, "label": "Signup-563", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-690", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Logout-823", "isController": false}, {"data": [[1.60741884E12, 1.7045454545454548], [1.60741902E12, 1.2272727272727273], [1.60741866E12, 1.3333333333333333], [1.60741896E12, 1.229508196721312], [1.60741914E12, 1.3142857142857147], [1.60741908E12, 1.1224489795918373], [1.60741878E12, 1.3548387096774195], [1.6074192E12, 1.0], [1.60741872E12, 1.1764705882352944], [1.6074189E12, 1.1666666666666665]], "isOverall": false, "label": "Signup-560", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-638", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Signup-561", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-639", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy phone-637", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-695", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Monitor-721", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy laptop-694", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Monitor-720", "isController": false}, {"data": [[1.60741884E12, 1.0625], [1.60741902E12, 1.230769230769231], [1.60741866E12, 1.0], [1.60741896E12, 1.0434782608695652], [1.60741914E12, 1.0], [1.60741908E12, 1.1818181818181823], [1.60741878E12, 1.333333333333333], [1.6074192E12, 1.1666666666666665], [1.60741872E12, 1.2857142857142856], [1.6074189E12, 1.3181818181818183]], "isOverall": false, "label": "Place order-793", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Place order-795", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-740", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Place order-794", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Place order-796", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Login-594", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-743", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-742", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Login-593", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Cart-772", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Login-592", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Buy monitor-744", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Phone-623", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Phone-622", "isController": false}, {"data": [[1.60741884E12, 0.0], [1.60741902E12, 0.0], [1.60741866E12, 0.0], [1.60741896E12, 0.0], [1.60741914E12, 0.0], [1.60741908E12, 0.0], [1.60741878E12, 0.0], [1.6074192E12, 0.0], [1.60741872E12, 0.0], [1.6074189E12, 0.0]], "isOverall": false, "label": "Logout-839", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6074192E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 47.0, "minX": 1.60741866E12, "maxY": 3524.0, "series": [{"data": [[1.60741884E12, 1667.0], [1.60741902E12, 2490.0], [1.60741866E12, 2087.0], [1.60741896E12, 3524.0], [1.60741914E12, 1316.0], [1.60741908E12, 2406.0], [1.60741878E12, 1675.0], [1.6074192E12, 1040.0], [1.60741872E12, 1562.0], [1.6074189E12, 1615.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.60741884E12, 48.0], [1.60741902E12, 48.0], [1.60741866E12, 49.0], [1.60741896E12, 49.0], [1.60741914E12, 48.0], [1.60741908E12, 49.0], [1.60741878E12, 48.0], [1.6074192E12, 48.0], [1.60741872E12, 48.0], [1.6074189E12, 49.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.60741884E12, 48.0], [1.60741902E12, 49.0], [1.60741866E12, 49.0], [1.60741896E12, 49.0], [1.60741914E12, 49.0], [1.60741908E12, 49.0], [1.60741878E12, 48.0], [1.6074192E12, 48.613100073337556], [1.60741872E12, 48.474100110530856], [1.6074189E12, 49.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.60741884E12, 48.0], [1.60741902E12, 48.91199951171875], [1.60741866E12, 49.0], [1.60741896E12, 49.0], [1.60741914E12, 48.49399975538253], [1.60741908E12, 49.0], [1.60741878E12, 48.0], [1.6074192E12, 48.30549990832806], [1.60741872E12, 48.010499861836436], [1.6074189E12, 49.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.60741884E12, 47.0], [1.60741902E12, 47.0], [1.60741866E12, 49.0], [1.60741896E12, 47.0], [1.60741914E12, 47.0], [1.60741908E12, 47.0], [1.60741878E12, 47.0], [1.6074192E12, 47.0], [1.60741872E12, 48.0], [1.6074189E12, 47.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.60741884E12, 268.0], [1.60741902E12, 313.0], [1.60741866E12, 278.0], [1.60741896E12, 289.0], [1.60741914E12, 305.0], [1.60741908E12, 306.0], [1.60741878E12, 271.0], [1.6074192E12, 298.0], [1.60741872E12, 271.0], [1.6074189E12, 272.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6074192E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 264.0, "minX": 2.0, "maxY": 341.0, "series": [{"data": [[2.0, 341.0], [3.0, 322.0], [4.0, 309.0], [5.0, 293.5], [6.0, 309.0], [7.0, 270.0], [8.0, 271.5], [9.0, 273.0], [10.0, 284.0], [11.0, 307.5], [12.0, 289.5], [13.0, 288.0], [14.0, 273.5], [15.0, 295.0], [16.0, 276.0], [17.0, 273.0], [18.0, 285.5], [19.0, 295.0], [20.0, 285.5], [21.0, 277.0], [22.0, 271.5], [23.0, 293.5], [24.0, 271.5], [25.0, 306.0], [26.0, 282.5], [27.0, 276.0], [28.0, 283.5], [29.0, 288.0], [30.0, 273.5], [31.0, 293.0], [32.0, 279.5], [33.0, 287.0], [34.0, 286.5], [35.0, 279.0], [37.0, 280.5], [36.0, 295.5], [39.0, 278.0], [38.0, 280.0], [41.0, 277.0], [40.0, 326.0], [43.0, 285.0], [42.0, 290.5], [44.0, 279.0], [45.0, 275.0], [46.0, 276.0], [47.0, 269.0], [48.0, 291.5], [49.0, 292.0], [51.0, 280.0], [50.0, 278.0], [52.0, 277.0], [53.0, 276.0], [54.0, 288.0], [55.0, 290.0], [56.0, 287.5], [57.0, 276.0], [59.0, 298.0], [58.0, 288.0], [61.0, 291.0], [60.0, 294.5], [63.0, 280.5], [62.0, 291.0], [67.0, 283.0], [64.0, 285.0], [65.0, 293.0], [66.0, 293.5], [69.0, 298.5], [68.0, 292.5], [70.0, 287.0], [71.0, 299.5], [73.0, 298.0], [72.0, 300.0], [75.0, 287.0], [74.0, 307.5], [77.0, 264.0], [78.0, 272.5], [79.0, 307.0], [80.0, 278.5], [81.0, 301.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 81.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 264.0, "minX": 2.0, "maxY": 341.0, "series": [{"data": [[2.0, 341.0], [3.0, 322.0], [4.0, 309.0], [5.0, 288.0], [6.0, 309.0], [7.0, 270.0], [8.0, 271.5], [9.0, 273.0], [10.0, 283.0], [11.0, 307.0], [12.0, 285.5], [13.0, 288.0], [14.0, 270.0], [15.0, 294.0], [16.0, 276.0], [17.0, 273.0], [18.0, 278.5], [19.0, 291.0], [20.0, 283.0], [21.0, 276.0], [22.0, 271.0], [23.0, 285.5], [24.0, 270.5], [25.0, 305.0], [26.0, 279.5], [27.0, 276.0], [28.0, 277.5], [29.0, 287.0], [30.0, 273.0], [31.0, 292.5], [32.0, 279.0], [33.0, 287.0], [34.0, 284.5], [35.0, 279.0], [37.0, 278.0], [36.0, 295.0], [39.0, 277.0], [38.0, 279.5], [41.0, 274.0], [40.0, 322.0], [43.0, 284.0], [42.0, 287.5], [44.0, 278.0], [45.0, 273.0], [46.0, 276.0], [47.0, 269.0], [48.0, 291.0], [49.0, 291.0], [51.0, 279.0], [50.0, 276.5], [52.0, 276.0], [53.0, 273.0], [54.0, 287.0], [55.0, 289.0], [56.0, 286.0], [57.0, 274.5], [59.0, 297.0], [58.0, 287.0], [61.0, 290.0], [60.0, 292.0], [63.0, 279.0], [62.0, 290.0], [67.0, 281.0], [64.0, 284.0], [65.0, 291.0], [66.0, 293.0], [69.0, 295.0], [68.0, 288.0], [70.0, 285.5], [71.0, 295.0], [73.0, 296.0], [72.0, 294.0], [75.0, 287.0], [74.0, 303.5], [77.0, 264.0], [78.0, 271.0], [79.0, 305.5], [80.0, 273.5], [81.0, 293.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 81.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6074186E12, "maxY": 68.25, "series": [{"data": [[1.60741884E12, 44.983333333333334], [1.60741902E12, 68.25], [1.60741866E12, 7.566666666666666], [1.60741896E12, 63.85], [1.60741914E12, 34.11666666666667], [1.60741908E12, 54.833333333333336], [1.6074186E12, 0.016666666666666666], [1.60741878E12, 31.633333333333333], [1.6074192E12, 12.666666666666666], [1.60741872E12, 19.333333333333332], [1.6074189E12, 57.68333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6074192E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.60741866E12, "maxY": 67.16666666666667, "series": [{"data": [[1.60741884E12, 44.2], [1.60741902E12, 67.16666666666667], [1.60741866E12, 7.366666666666666], [1.60741896E12, 62.8], [1.60741914E12, 33.61666666666667], [1.60741908E12, 54.11666666666667], [1.60741878E12, 31.066666666666666], [1.6074192E12, 12.6], [1.60741872E12, 19.0], [1.6074189E12, 56.71666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.13333333333333333], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5666666666666667], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.5166666666666667], [1.6074192E12, 0.2], [1.60741872E12, 0.3], [1.6074189E12, 0.9]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6074192E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.05, "minX": 1.60741866E12, "maxY": 1.1, "series": [{"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.1], [1.60741866E12, 0.15], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5833333333333334], [1.60741908E12, 0.8166666666666667], [1.60741878E12, 0.5166666666666667], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.9]], "isOverall": false, "label": "Signup-560-success", "isController": false}, {"data": [[1.60741884E12, 0.7], [1.60741902E12, 1.05], [1.60741866E12, 0.1], [1.60741896E12, 0.9833333333333333], [1.60741914E12, 0.5833333333333334], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.26666666666666666], [1.6074189E12, 0.85]], "isOverall": false, "label": "Monitor-721-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5333333333333333], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.5166666666666667], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.8666666666666667]], "isOverall": false, "label": "Signup-590-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.35], [1.60741878E12, 0.18333333333333332], [1.6074192E12, 0.1], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Buy monitor-761-success", "isController": false}, {"data": [[1.60741884E12, 0.2833333333333333], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.36666666666666664], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.36666666666666664]], "isOverall": false, "label": "Cart-788-success", "isController": false}, {"data": [[1.60741884E12, 0.7], [1.60741902E12, 1.0666666666666667], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.9833333333333333], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.85], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.2], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy phone-638-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.1], [1.60741896E12, 1.0], [1.60741914E12, 0.5666666666666667], [1.60741908E12, 0.8166666666666667], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.8666666666666667]], "isOverall": false, "label": "Buy laptop-693-success", "isController": false}, {"data": [[1.60741884E12, 0.2833333333333333], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.36666666666666664], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.36666666666666664]], "isOverall": false, "label": "Cart-786-success", "isController": false}, {"data": [[1.60741884E12, 0.26666666666666666], [1.60741902E12, 0.45], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.31666666666666665], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.1], [1.6074189E12, 0.35]], "isOverall": false, "label": "Logout-823-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.05], [1.60741866E12, 0.1], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5666666666666667], [1.60741908E12, 0.85], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.85]], "isOverall": false, "label": "Buy laptop-710-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.15], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5666666666666667], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.5166666666666667], [1.6074192E12, 0.2], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.9]], "isOverall": false, "label": "Signup-562-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.38333333333333336], [1.60741914E12, 0.2], [1.60741908E12, 0.35], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.35]], "isOverall": false, "label": "Cart-784-success", "isController": false}, {"data": [[1.60741884E12, 0.26666666666666666], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.2], [1.60741908E12, 0.3333333333333333], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.1], [1.6074189E12, 0.36666666666666664]], "isOverall": false, "label": "Place order-814-success", "isController": false}, {"data": [[1.60741884E12, 0.75], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5333333333333333], [1.60741908E12, 0.85], [1.60741878E12, 0.5], [1.6074192E12, 0.2], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.8666666666666667]], "isOverall": false, "label": "Login-592-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.1], [1.60741896E12, 0.9666666666666667], [1.60741914E12, 0.55], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.4666666666666667], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.3], [1.6074189E12, 0.9]], "isOverall": false, "label": "Buy laptop-691-success", "isController": false}, {"data": [[1.60741884E12, 0.25], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.36666666666666664]], "isOverall": false, "label": "Place order-795-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.35]], "isOverall": false, "label": "Cart-782-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.13333333333333333], [1.60741896E12, 1.0333333333333334], [1.60741914E12, 0.55], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.5166666666666667], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.3], [1.6074189E12, 0.8833333333333333]], "isOverall": false, "label": "Signup-563-1-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.05], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8833333333333333], [1.60741878E12, 0.5], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.8833333333333333]], "isOverall": false, "label": "Login-594-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.3333333333333333]], "isOverall": false, "label": "Buy monitor-742-success", "isController": false}, {"data": [[1.60741884E12, 0.26666666666666666], [1.60741902E12, 0.45], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.31666666666666665], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.1], [1.6074189E12, 0.35]], "isOverall": false, "label": "Logout-840-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.0666666666666667], [1.60741866E12, 0.1], [1.60741896E12, 1.0], [1.60741914E12, 0.5666666666666667], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.8666666666666667]], "isOverall": false, "label": "Buy laptop-695-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.05], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0], [1.60741914E12, 0.5], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.5], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Phone-623-success", "isController": false}, {"data": [[1.60741884E12, 0.25], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.2], [1.60741908E12, 0.35], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.36666666666666664]], "isOverall": false, "label": "Place order-812-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.35], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Buy monitor-737-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.3333333333333333]], "isOverall": false, "label": "Buy monitor-740-success", "isController": false}, {"data": [[1.60741884E12, 0.7166666666666667], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.95], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.3], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy phone-644-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.35], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Buy monitor-724-success", "isController": false}, {"data": [[1.60741884E12, 0.65], [1.60741902E12, 1.05], [1.60741866E12, 0.1], [1.60741896E12, 0.9833333333333333], [1.60741914E12, 0.5333333333333333], [1.60741908E12, 0.85], [1.60741878E12, 0.5], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.3], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy laptop-687-success", "isController": false}, {"data": [[1.60741884E12, 0.7], [1.60741902E12, 1.0333333333333334], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.48333333333333334], [1.60741908E12, 0.8833333333333333], [1.60741878E12, 0.5], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9166666666666666]], "isOverall": false, "label": "Login-613-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.0666666666666667], [1.60741866E12, 0.13333333333333333], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5333333333333333], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.5166666666666667], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.3], [1.6074189E12, 0.8833333333333333]], "isOverall": false, "label": "Signup-581-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.05], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.5], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.8833333333333333]], "isOverall": false, "label": "Login-611-success", "isController": false}, {"data": [[1.60741884E12, 0.65], [1.60741902E12, 1.05], [1.60741866E12, 0.1], [1.60741896E12, 0.9833333333333333], [1.60741914E12, 0.5333333333333333], [1.60741908E12, 0.85], [1.60741878E12, 0.5], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.3], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy laptop-689-success", "isController": false}, {"data": [[1.60741884E12, 0.26666666666666666], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.38333333333333336], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.36666666666666664]], "isOverall": false, "label": "Place order-794-success", "isController": false}, {"data": [[1.60741884E12, 0.7166666666666667], [1.60741902E12, 1.0666666666666667], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.9666666666666667], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.4666666666666667], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy phone-640-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.0666666666666667], [1.60741866E12, 0.13333333333333333], [1.60741896E12, 1.0333333333333334], [1.60741914E12, 0.5333333333333333], [1.60741908E12, 0.85], [1.60741878E12, 0.5166666666666667], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.3], [1.6074189E12, 0.8833333333333333]], "isOverall": false, "label": "Signup-564-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.95], [1.60741914E12, 0.55], [1.60741908E12, 0.85], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.3], [1.6074189E12, 0.95]], "isOverall": false, "label": "Buy phone-661-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.05], [1.60741866E12, 0.1], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5833333333333334], [1.60741908E12, 0.8166666666666667], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.85]], "isOverall": false, "label": "Buy laptop-712-success", "isController": false}, {"data": [[1.60741884E12, 0.2833333333333333], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Buy monitor-759-success", "isController": false}, {"data": [[1.60741884E12, 0.65], [1.60741902E12, 1.05], [1.60741866E12, 0.1], [1.60741896E12, 0.9833333333333333], [1.60741914E12, 0.5333333333333333], [1.60741908E12, 0.85], [1.60741878E12, 0.5], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.3], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Laptop-672-success", "isController": false}, {"data": [[1.60741884E12, 0.26666666666666666], [1.60741902E12, 0.45], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.31666666666666665], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.1], [1.6074189E12, 0.35]], "isOverall": false, "label": "Place order-815-success", "isController": false}, {"data": [[1.60741884E12, 0.7], [1.60741902E12, 1.05], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.85], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.2], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy phone-637-success", "isController": false}, {"data": [[1.60741884E12, 0.26666666666666666], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.36666666666666664], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.38333333333333336]], "isOverall": false, "label": "Cart-787-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.35], [1.60741878E12, 0.18333333333333332], [1.6074192E12, 0.1], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Buy monitor-762-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.1], [1.60741866E12, 0.15], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5833333333333334], [1.60741908E12, 0.8166666666666667], [1.60741878E12, 0.5166666666666667], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.9]], "isOverall": false, "label": "Signup-561-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.35], [1.60741878E12, 0.18333333333333332], [1.6074192E12, 0.1], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Cart-772-success", "isController": false}, {"data": [[1.60741884E12, 0.7], [1.60741902E12, 1.05], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.9833333333333333], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.2], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy phone-639-success", "isController": false}, {"data": [[1.60741884E12, 0.26666666666666666], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.36666666666666664], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.38333333333333336]], "isOverall": false, "label": "Cart-789-success", "isController": false}, {"data": [[1.60741884E12, 0.2833333333333333], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.38333333333333336], [1.60741914E12, 0.2], [1.60741908E12, 0.35], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.36666666666666664]], "isOverall": false, "label": "Cart-785-success", "isController": false}, {"data": [[1.60741884E12, 0.25], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.2], [1.60741908E12, 0.35], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.36666666666666664]], "isOverall": false, "label": "Place order-813-success", "isController": false}, {"data": [[1.60741884E12, 0.7], [1.60741902E12, 1.05], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0], [1.60741914E12, 0.5], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.2], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy phone-624-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.05], [1.60741866E12, 0.1], [1.60741896E12, 1.0], [1.60741914E12, 0.55], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.4666666666666667], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.3], [1.6074189E12, 0.9]], "isOverall": false, "label": "Buy laptop-690-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.05], [1.60741866E12, 0.1], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5833333333333334], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.85]], "isOverall": false, "label": "Buy laptop-711-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.0666666666666667], [1.60741866E12, 0.1], [1.60741896E12, 0.9833333333333333], [1.60741914E12, 0.5833333333333334], [1.60741908E12, 0.8166666666666667], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.85]], "isOverall": false, "label": "Monitor-720-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.13333333333333333], [1.60741896E12, 1.0333333333333334], [1.60741914E12, 0.55], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.5166666666666667], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.3], [1.6074189E12, 0.8833333333333333]], "isOverall": false, "label": "Signup-563-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.18333333333333332], [1.6074192E12, 0.1], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Buy monitor-760-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.35], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Buy monitor-736-success", "isController": false}, {"data": [[1.60741884E12, 0.2833333333333333], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Buy monitor-743-success", "isController": false}, {"data": [[1.60741884E12, 0.65], [1.60741902E12, 1.1], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.9666666666666667], [1.60741914E12, 0.55], [1.60741908E12, 0.85], [1.60741878E12, 0.5], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.95]], "isOverall": false, "label": "Buy phone-663-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.05], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8833333333333333], [1.60741878E12, 0.5], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.8833333333333333]], "isOverall": false, "label": "Login-593-success", "isController": false}, {"data": [[1.60741884E12, 0.65], [1.60741902E12, 1.05], [1.60741866E12, 0.1], [1.60741896E12, 0.9833333333333333], [1.60741914E12, 0.5333333333333333], [1.60741908E12, 0.85], [1.60741878E12, 0.5], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.3], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy laptop-675-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.38333333333333336], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.35]], "isOverall": false, "label": "Cart-783-success", "isController": false}, {"data": [[1.60741884E12, 0.25], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.2], [1.60741908E12, 0.35], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.36666666666666664]], "isOverall": false, "label": "Place order-796-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.05], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8833333333333333], [1.60741878E12, 0.5], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.8833333333333333]], "isOverall": false, "label": "Login-610-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.35], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Buy monitor-738-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.18333333333333332], [1.6074192E12, 0.1], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Cart-781-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.0666666666666667], [1.60741866E12, 0.1], [1.60741896E12, 1.0], [1.60741914E12, 0.5666666666666667], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.8666666666666667]], "isOverall": false, "label": "Buy laptop-694-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.0333333333333334], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.48333333333333334], [1.60741908E12, 0.8833333333333333], [1.60741878E12, 0.5], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Phone-622-success", "isController": false}, {"data": [[1.60741884E12, 0.75], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5333333333333333], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.5], [1.6074192E12, 0.2], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.8666666666666667]], "isOverall": false, "label": "Signup-591-success", "isController": false}, {"data": [[1.60741884E12, 0.26666666666666666], [1.60741902E12, 0.45], [1.60741866E12, 0.05], [1.60741896E12, 0.4], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.31666666666666665], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.1], [1.6074189E12, 0.35]], "isOverall": false, "label": "Logout-839-success", "isController": false}, {"data": [[1.60741884E12, 0.7], [1.60741902E12, 1.1], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.9333333333333333], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.3], [1.6074189E12, 0.95]], "isOverall": false, "label": "Buy phone-645-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.08333333333333333], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.3333333333333333]], "isOverall": false, "label": "Buy monitor-739-success", "isController": false}, {"data": [[1.60741884E12, 0.3], [1.60741902E12, 0.4], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.21666666666666667], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.18333333333333332], [1.6074192E12, 0.1], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Cart-780-success", "isController": false}, {"data": [[1.60741884E12, 0.7333333333333333], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.13333333333333333], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5666666666666667], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.5166666666666667], [1.6074192E12, 0.2], [1.60741872E12, 0.3], [1.6074189E12, 0.9]], "isOverall": false, "label": "Signup-563-0-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.0666666666666667], [1.60741866E12, 0.1], [1.60741896E12, 0.9833333333333333], [1.60741914E12, 0.55], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.4666666666666667], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.3], [1.6074189E12, 0.9166666666666666]], "isOverall": false, "label": "Buy laptop-688-success", "isController": false}, {"data": [[1.60741884E12, 0.7166666666666667], [1.60741902E12, 1.0333333333333334], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.5], [1.60741908E12, 0.8833333333333333], [1.60741878E12, 0.5], [1.6074192E12, 0.23333333333333334], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9]], "isOverall": false, "label": "Login-612-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.05], [1.60741866E12, 0.1], [1.60741896E12, 1.0], [1.60741914E12, 0.5833333333333334], [1.60741908E12, 0.8166666666666667], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.85]], "isOverall": false, "label": "Buy laptop-713-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.1], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.9666666666666667], [1.60741914E12, 0.55], [1.60741908E12, 0.85], [1.60741878E12, 0.5], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.9166666666666666]], "isOverall": false, "label": "Buy phone-662-success", "isController": false}, {"data": [[1.60741884E12, 0.2833333333333333], [1.60741902E12, 0.4166666666666667], [1.60741866E12, 0.05], [1.60741896E12, 0.4166666666666667], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.13333333333333333], [1.6074189E12, 0.35]], "isOverall": false, "label": "Buy monitor-744-success", "isController": false}, {"data": [[1.60741884E12, 0.7166666666666667], [1.60741902E12, 1.05], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.9833333333333333], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.4666666666666667], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy phone-641-success", "isController": false}, {"data": [[1.60741884E12, 0.26666666666666666], [1.60741902E12, 0.43333333333333335], [1.60741866E12, 0.05], [1.60741896E12, 0.38333333333333336], [1.60741914E12, 0.2], [1.60741908E12, 0.36666666666666664], [1.60741878E12, 0.2], [1.6074192E12, 0.1], [1.60741872E12, 0.11666666666666667], [1.6074189E12, 0.36666666666666664]], "isOverall": false, "label": "Place order-793-success", "isController": false}, {"data": [[1.60741884E12, 0.65], [1.60741902E12, 1.0833333333333333], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.9666666666666667], [1.60741914E12, 0.55], [1.60741908E12, 0.8333333333333334], [1.60741878E12, 0.5], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.2833333333333333], [1.6074189E12, 0.95]], "isOverall": false, "label": "Laptop-671-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.0333333333333334], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 1.0166666666666666], [1.60741914E12, 0.48333333333333334], [1.60741908E12, 0.8833333333333333], [1.60741878E12, 0.5], [1.6074192E12, 0.21666666666666667], [1.60741872E12, 0.31666666666666665], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Login-614-success", "isController": false}, {"data": [[1.60741884E12, 0.7166666666666667], [1.60741902E12, 1.0666666666666667], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.9666666666666667], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.18333333333333332], [1.60741872E12, 0.3], [1.6074189E12, 0.9333333333333333]], "isOverall": false, "label": "Buy phone-643-success", "isController": false}, {"data": [[1.60741884E12, 0.6833333333333333], [1.60741902E12, 1.1], [1.60741866E12, 0.11666666666666667], [1.60741896E12, 0.9333333333333333], [1.60741914E12, 0.5166666666666667], [1.60741908E12, 0.8666666666666667], [1.60741878E12, 0.48333333333333334], [1.6074192E12, 0.16666666666666666], [1.60741872E12, 0.3], [1.6074189E12, 0.9666666666666667]], "isOverall": false, "label": "Buy phone-660-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6074192E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 7.5, "minX": 1.60741866E12, "maxY": 68.25, "series": [{"data": [[1.60741884E12, 44.93333333333333], [1.60741902E12, 68.25], [1.60741866E12, 7.5], [1.60741896E12, 63.81666666666667], [1.60741914E12, 34.18333333333333], [1.60741908E12, 54.95], [1.60741878E12, 31.583333333333332], [1.6074192E12, 12.8], [1.60741872E12, 19.3], [1.6074189E12, 57.61666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6074192E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
