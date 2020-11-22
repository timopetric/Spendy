
    var ctx = document.getElementById("expensesChart").getContext("2d");

    var myChart = new Chart(ctx, {
    type: "line",
    data: {
    labels: [
    "Januar",
    "Februar",
    "Marec",
    "April",
    "Maj",
    "Junij",
    "Julij",
    "Avgust",
    "September",
    "Oktober",
    "November",
    "December",
    ],
    datasets: [
{
    label: "Odhodki v €",
    data: [12, 30, 36, 54, 12, 44, 100, 66, 0, 22, 60, 70],
    backgroundColor: ["rgba(0, 0, 0, 0.0)"],
    borderColor: [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    ],
    borderWidth: 1,
},
    ],
},
    options: {
    scales: {
    yAxes: [
{
    ticks: {
    beginAtZero: true,
},
},
    ],
},
},
});

    var ctx = document.getElementById("incomeChart").getContext("2d");
    var myChart = new Chart(ctx, {
    type: "line",
    data: {
    labels: [
    "Januar",
    "Februar",
    "Marec",
    "April",
    "Maj",
    "Junij",
    "Julij",
    "Avgust",
    "September",
    "Oktober",
    "November",
    "December",
    ],
    datasets: [
{
    label: "Prihodki v €",
    data: [40, 40, 40, 40, 40, 70, 80, 80, 40, 40, 40, 60],
    backgroundColor: ["rgba(0, 0, 0, 0.0)"],
    borderColor: [
    "rgba(92, 184, 92, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    ],
    borderWidth: 1,
},
    ],
},
    options: {
    scales: {
    yAxes: [
{
    ticks: {
    beginAtZero: true,
},
},
    ],
},
},
});

    var ctx = document.getElementById("balanceChart").getContext("2d");
    var myChart = new Chart(ctx, {
    type: "line",
    data: {
    labels: [
    "Januar",
    "Februar",
    "Marec",
    "April",
    "Maj",
    "Junij",
    "Julij",
    "Avgust",
    "September",
    "Oktober",
    "November",
    "December",
    ],
    datasets: [
{
    label: "Stanje",
    data: [50, 80, 160, 170, 100, 70, 50, 100, 120, 180, 150, 100],
    backgroundColor: ["rgba(0, 0, 0, 0.0)"],
    borderColor: [
    "rgba(92, 184, 92, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    ],
    borderWidth: 1,
},
    ],
},
    options: {
    scales: {
    yAxes: [
{
    ticks: {
    beginAtZero: true,
},
},
    ],
},
},
});


    var ctx = document.getElementById("vsChart").getContext("2d");
    var myChart = new Chart(ctx, {
    type: "pie",
    data: {
    labels: ["Prihodki", "Odhodki"],
    datasets: [
{
    label: "Prihodki/odhodki v €",
    data: [480, 420],
    backgroundColor: ["rgba(92, 184, 92, 1)", "rgba(217, 83, 79,1)"],
    borderColor: ["rgba(92, 184, 92, 1)", "rgba(217, 83, 79,1)"],
    borderWidth: 1,
},
    ],
},
});
