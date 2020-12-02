function onGroupChange() {
    let groupID = document.getElementById("idGroup");
    groupID = groupID.options[groupID.selectedIndex].getAttribute("value");

    if (window.location.href.includes("?")) {
        window.location = window.location.href + "&groupId=" + `${groupID}`;
    } else {
        window.location = window.location.href + "?groupId=" + `${groupID}`;
    }
}
