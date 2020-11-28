$('#exampleModal').on('show.bs.modal', function (event) {

    let params = event.relatedTarget.attributes
    let cost = params.cost.value;
    let description = params.description.value;
    let category_name = params.category_name.value;
    let date = params.date.value;
    //date = date == null ? Date.now() : date;

    var modal = $(this)
    modal.find('.modal-title').text(category_name );
    modal.find('.description').text(description);
    modal.find('.cost').text(cost + " €");
    modal.find('.date').text(date);
  })