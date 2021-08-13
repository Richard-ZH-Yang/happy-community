// import { enableRipple,EmitType } from '@syncfusion/ej2-base';
// enableRipple(true);
// import { ChartTheme, Chart, HistogramSeries, DataLabel,IPointRenderEventArgs, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
// Chart.Inject(HistogramSeries, DataLabel, Tooltip);
// import { Browser } from '@syncfusion/ej2-base';
//
// /**
//  * Sample for Histogram Series
//  */
// let color : string[]= ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
//     '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
//
// /**
//  * Sample for Category Axis
//  */
// let labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
//
//     args.fill = color[args.point.index % 10];
//
// }
//
// let chartData: Object[] = [];
// let points: number[] = [5.250, 7.750, 0, 8.275, 9.750, 7.750, 8.275, 6.250, 5.750,
//     5.250, 23.000, 26.500, 27.750, 25.025, 26.500, 26.500, 28.025, 29.250, 26.750, 27.250,
//     26.250, 25.250, 34.500, 25.625, 25.500, 26.625, 36.275, 36.250, 26.875, 40.000, 43.000,
//     46.500, 47.750, 45.025, 56.500, 56.500, 58.025, 59.250, 56.750, 57.250,
//     46.250, 55.250, 44.500, 45.525, 55.500, 46.625, 46.275, 56.250, 46.875, 43.000,
//     46.250, 55.250, 44.500, 45.425, 55.500, 56.625, 46.275, 56.250, 46.875, 43.000,
//     46.250, 55.250, 44.500, 45.425, 55.500, 46.625, 56.275, 46.250, 56.875, 41.000, 63.000,
//     66.500, 67.750, 65.025, 66.500, 76.500, 78.025, 79.250, 76.750, 77.250,
//     66.250, 75.250, 74.500, 65.625, 75.500, 76.625, 76.275, 66.250, 66.875, 80.000, 85.250,
//     87.750, 89.000, 88.275, 89.750, 97.750, 98.275, 96.250, 95.750, 95.250
// ];
// points.map((value: number) => {
//     chartData.push({
//         y: value
//     });
// });
// let chart: Chart = new Chart({
//     //Initializing Primary X and Y Axis
//     primaryXAxis: {
//         majorGridLines: { width: 0 }, title: 'Score of Final Examination',
//         minimum: 0, maximum: 100
//     },
//     chartArea: { border: { width: 0 } },
//     legendSettings: { visible: false },
//     primaryYAxis: {
//         title: 'Number of Students',
//         minimum: 0, maximum: 50, interval: 10,
//         majorTickLines: { width: 0 }, lineStyle: { width: 0 }
//     },
//     //Initializing Chart Series
//     series: [
//         {
//             type: 'Histogram', width: 2, yName: 'y', name: 'Score',
//             dataSource: chartData, binInterval: 20,
//             marker: {visible : false, dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } },
//             showNormalDistribution: true,  columnWidth: 0.99
//         }
//     ],
//     pointRender: labelRender,
//
//     title: 'Examination Result', tooltip: { enable: true },
//     height :'350'
// });
// chart.appendTo('#Chart');



window.addEventListener('load', (event) => {
    loadSummaryTable();
    console.log('The page has fully loaded');
});


function loadSummaryTable() {
    var xyValues = [
        {x:50, y:7},
        {x:60, y:8},
        {x:70, y:8},
        {x:80, y:9},
        {x:90, y:9},
        {x:100, y:9},
        {x:110, y:10},
        {x:120, y:11},
        {x:130, y:14},
        {x:140, y:14},
        {x:150, y:15}
    ];

    new Chart("myChart", {
        type: "scatter",
        data: {
            datasets: [{
                pointRadius: 4,
                pointBackgroundColor: "rgba(0,0,255,1)",
                data: xyValues
            }]
        },
        options:{...}
    });


}




// function loadSummaryTable() {
//     let xhttp = new XMLHttpRequest();
//
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             var scores = JSON.parse(xhttp.responseText);
//             var newContent = "<div class='summaryContent'>";
//
//
//             var newContent = "<div class='historyContent'>";
//             document.getElementById("my-form").innerHTML = newContent;
//         }
//     };
//     xhttp.open("GET", `http://localhost:8080/summarytable`, true);
//     xhttp.send();
//
// }

//
// function loadHistoryContent(xhttp) {
//
//
//     var info = JSON.parse(xhttp.responseText);
//     var newContent = "<div class='historyContent'>";
//     info.forEach(function (one) {
//         var one_content = one.content;
//         var score = one.score;
//         var time = one.time;
//         var content_id = one.content_id;
//         newContent += `<div class = "each">` +
//             `<h3> Score: ${score} </h3>` +
//             `<h5> ${time} </h5>` +
//             `<p> ${one_content} </p>`+
//             //`<input class="btn" type="button" id="history-share-${id}" value="Share to community">`+
//             `<button type="button" class="btn" onClick="shareDiary('${user}','${content_id}')">Share to community</button>` +
//             `</div>`;
//     })
//     newContent += "</div>";
//     document.getElementById("my-form").innerHTML = newContent;
// }
//
//
//

