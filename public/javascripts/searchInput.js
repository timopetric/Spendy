function onClick() {
    let input = document.getElementById("searchLogin");
    console.log(input.value);
    if(window.location.href.includes("?")){
        window.location = window.location.href + '&search=' + `${input.value}`;
    }
    else{
        window.location = window.location.href + '?search=' + `${input.value}`;
    }
}
