var ctx = document.getElementById("myChart").getContext("2d");
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
                data: [450, 100, 750, 400, 800, 652, 777, 4545, 878, 998, 1000, 450, 6000],
                backgroundColor: "lightgreen",
                borderColor: "darkgreen",
                borderWidth: 0.7,
                maxBarThickness: 30,
                maxBarLength: 2,
            },
            {
                label: "Odhodki",
                data: [470, 2300, 750, 400, 3850, 652, 777, 3545, 878, 998, 690, 450, 5580],
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
