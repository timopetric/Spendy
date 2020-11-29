// A script that monitors if a user is logged on (saved session storage). If a page
// is reset the storage gets deleted and we should be redirected to login page.


function saveCurrentlyLoginedUser(user) {
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
}

function getCurrentlyLoginedUser() {
  return JSON.parse(sessionStorage.getItem('loggedInUser'));
}

function deleteCurrentlyLoginedUser() {
  sessionStorage.clear();
}

const pageAccessedByReload = (
  (window.performance.navigation && window.performance.navigation.type === 1) ||
    window.performance
      .getEntriesByType('navigation')
      .map((nav) => nav.type)
      .includes('reload')
);

if (pageAccessedByReload) {
  console.log("page reloaded: User Logout (commented out right now)");
  // deleteCurrentlyLoginedUser();
  // window.location = "/first_page";
}
console.log("fake login current user = " + getCurrentlyLoginedUser());
var loggedIdUser = getCurrentlyLoginedUser(); // must remain var! (not cons)
console.log(`Logged in user with username '${loggedIdUser.username}':`);
console.log(loggedIdUser);
console.log("Access its data by using 'loggedIdUser(.username, ...)' on any client side js")

