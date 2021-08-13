let scores = [];
let isReady = false;
loadSummaryTable();

while (!isReady){}

var ctx = document.getElementById('myChart').getContext('2d');
let month = 8;
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['0-19', '20-39', '40-59', '60-79', '80-100'],
        datasets: [{
            label: `in month ${month}`,
            data: scores,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// window.addEventListener('load', (event) => {
//     loadSummaryTable();
//     console.log('The page has fully loaded');
// });
//
//
// function loadSummaryTable() {
//     var xArray = ["Italy","France","Spain","USA","Argentina"];
//     var yArray = [55, 49, 44, 24, 15];
//
//
//     // var data = [{
//     //     x: xArray,
//     //     y: yArray,
//     //     type: "bar"  }];
//     // var layout = {title:"World Wine Wine Production"};
//     //
//     // Plotly.newPlot("myPlot", data, layout);
//
//         TESTER = document.getElementById('myPlot');
//         Plotly.newPlot( TESTER, [{
//         x: [1, 2, 3, 4, 5],
//         y: [1, 2, 4, 8, 16] }], {
//         margin: { t: 0 } } );
//
// }
//
//
//
//
function loadSummaryTable() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // var scores = JSON.parse(xhttp.responseText);
            scores = [1,2,3,4,5,10,20];
            isReady = true;


            // var ctx = document.getElementById('myChart').getContext('2d');
            // let month = 8;
            // var myChart = new Chart(ctx, {
            //     type: 'bar',
            //     data: {
            //         labels: ['0-19', '20-39', '40-59', '60-79', '80-100'],
            //         datasets: [{
            //             label: `in month ${month}`,
            //             data: scores,
            //             backgroundColor: [
            //                 'rgba(255, 99, 132, 0.2)',
            //                 'rgba(54, 162, 235, 0.2)',
            //                 'rgba(255, 206, 86, 0.2)',
            //                 'rgba(75, 192, 192, 0.2)',
            //                 'rgba(153, 102, 255, 0.2)',
            //             ],
            //             borderColor: [
            //                 'rgba(255, 99, 132, 1)',
            //                 'rgba(54, 162, 235, 1)',
            //                 'rgba(255, 206, 86, 1)',
            //                 'rgba(75, 192, 192, 1)',
            //                 'rgba(153, 102, 255, 1)',
            //             ],
            //             borderWidth: 1
            //         }]
            //     },
            //     options: {
            //         scales: {
            //             y: {
            //                 beginAtZero: true
            //             }
            //         }
            //     }
            // });
            // return scores;
        }
    };
    xhttp.open("GET", `http://localhost:8080/summarytable`, true);
    xhttp.send();

}
