
    var ctx = document.getElementById("predictionChart").getContext("2d");
    var myChart = new Chart(ctx, {
    type: "bar",
    data: {
    labels: [
    "Jan 2020",
    "Feb 2020",
    "Mar 2020",
    "Apr 2020",
    "Maj 2020",
    "Jun 2020",
    "Jul 2020",
    "Aug 2020",
    "Sep 2020",
    "Okt 2020",
    "Nov 2020",
    "Dec 2020",
    ],
    datasets: [
{
    label: "Prihodki",
    data: [
    4050,
    1080,
    750,
    4020,
    800,
    652,
    777,
    4545,
    8728,
    9928,
    1000,
    450,
    6000,
    ],
    backgroundColor: "lightgreen",
    borderColor: "darkgreen",
    borderWidth: 0.7,
    maxBarThickness: 30,
    maxBarLength: 2,
},
{
    label: "Odhodki",
    data: [
    470,
    2300,
    7250,
    400,
    3850,
    6522,
    777,
    3545,
    8728,
    998,
    690,
    450,
    5580,
    ],
    backgroundColor: "lightcoral",
    borderColor: "darkred",
    borderWidth: 0.7,
    maxBarThickness: 30,
    maxBarLength: 2,
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

    var ctx = document.getElementById("NasdaqChart").getContext("2d");
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
    label: "Nashdaq cena delnic v €",
    data: [
    12200,
    19400,
    10200,
    14800,
    12200.3,
    17003.69,
    12999,
    12728,
    16000,
    12000,
    12500,
    12000,
    ],
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

    var ctx = document.getElementById("bitcoinChart").getContext("2d");
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
    label: "Bitcoin cena v €",
    data: [
    8800,
    9400,
    8200,
    10800,
    10200.3,
    12003.69,
    9999,
    8728,
    10000,
    12000,
    12500,
    10000,
    ],
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

    var ctx = document.getElementById("etheriumChart").getContext("2d");
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
    label: "Cena Etheriuma v €",
    data: [
    340,
    345,
    368,
    380,
    370,
    380,
    390,
    400,
    450,
    360,
    350,
    370,
    ],
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
    label: "Expenses",
    data: [480, 420],
    backgroundColor: ["rgba(92, 184, 92, 1)", "rgba(217, 83, 79,1)"],
    borderColor: ["rgba(92, 184, 92, 1)", "rgba(217, 83, 79,1)"],
    borderWidth: 1,
},
    ],
},
});
