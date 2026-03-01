function loadComponent(id, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.log("Error loading component:", error));
}

document.addEventListener("DOMContentLoaded", function() {

    loadComponent("navbar", "components/navbar.html");
    loadComponent("sidebar", "components/sidebar.html");

});