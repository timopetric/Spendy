


$('#exampleModal').on('show.bs.modal', function (event) {
    console.log("show");
    let params = event.relatedTarget.attributes;
    let cost = params.cost.value;
    let description = params.description.value;
    let category_name = params.category_name.value;
    let date = params.date.value;
    let isExpenditure = params.isExpenditure.value;
    let expenseId = params.expenseId.value;

    let arrowClass;
    let arrowColor;
    console.log(isExpenditure);
    if(isExpenditure == "true"){
        console.log("strosek")
        arrowClass = "fas fa-arrow-down";
        arrowColor = "#cb3b3b";
    }
    else {
        console.log("profit")
        arrowClass = "fas fa-arrow-up";
        arrowColor = "#45a72d";
    }
    console.log(isExpenditure);
    console.log(arrowClass);
    console.log(arrowColor);
    //date = date == null ? Date.now() : date;

    var modal = $(this)
    modal.find('.modal-title').text(category_name );
    modal.find('.description').text(description);
    modal.find('.cost').text(cost + " €");
    modal.find('.date').text(date);
    modal.find("i").addClass(arrowClass).css("color", arrowColor);
    $( "#deleteButton" ).attr( "expenseId", expenseId);


    $("#deleteButton").click(function (event) {
        console.log("click");
        let groupId = $("#idGroup option:selected").attr("value");
        console.log(expenseId);
        console.log(groupId);
        let url = window.location.href + `/${groupId}/expenses/${expenseId}`;
        console.log(window.location.href + `/${groupId}/expenses/${expenseId}`);
        const response =  fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(data =>{
            console.log(data);
            window.location = window.location.href;
        })
            
        .catch(err => console.log(err))
    });
  });

