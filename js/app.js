(() => {

let $count = document.getElementById("count")

let $elevation = document.getElementById("elevation")
$elevation.addEventListener("change", filter)

let $search = document.getElementById("search")
$search.addEventListener("input", filter)

let $start = document.getElementById("start")
$start.addEventListener("change", filter)

let $reset = document.getElementById("reset")
$reset.addEventListener("click", () => {
    $elevation.value = ""
    $search.value = ""
    $start.value = ""
    filter()
})

function filter() {
    let vegetable = $search.value.trim().toLowerCase(),
        elevation = $elevation.value,
        start = $start.value.slice(-5)
    for (let row of document.querySelectorAll(`tbody>tr`)) {
        let dVegetable = row.dataset.vegetable,
            dElevation = row.dataset.elevation,
            dStart = row.dataset.start,
            dEnd = row.dataset.end
        row.hidden = 
            !((!dVegetable || dVegetable.includes(vegetable))
            && (!elevation || !dElevation || dElevation === elevation)
            && (!start || !dStart || start <= dEnd && start >= dStart))
    }
    $count.textContent =
        document.querySelectorAll('tbody>tr:not([hidden])').length 
}

filter()

})()

