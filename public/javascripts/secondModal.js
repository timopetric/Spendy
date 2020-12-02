$("#urediModal").on("show.bs.modal", function (event) {
    console.log("uredi modal");
    let expenseId = $("#deleteButton").attr("expenseId");
    let groupId = $("#idGroup option:selected").attr("value");
    console.log(expenseId);
    console.log(groupId);
    let url = window.location.href + `/${groupId}/expenses/${expenseId}`;
    document.getElementById("urediExpense").action = url;

    $("#formButtonSubmit").click(function (event) {
        console.log("click");
        console.log(expenseId);
        console.log(groupId);
        let kategorija = $("#kategorija").val();
        let cena = $("#znesek").val();
        let opis = $("#opis").val();
        let exp = $("input[name='inlineRadioOptions']:checked").val();

        const response = fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                category_name: kategorija,
                cost: cena,
                description: opis,
                isExpenditure: exp,
            }),
        })
            .then((data) => {
                console.log(data);
                window.location = window.location.href;
            })

            .catch((err) => console.log(err));
    });
});
