(() => {

let $count = document.getElementById("count")

let $elevation = document.getElementById("elevation")
$elevation.addEventListener("change", filter)

let $search = document.getElementById("search")
$search.addEventListener("input", filter)

let $start = document.getElementById("start")
$start.addEventListener("change", filter)

let $end = document.getElementById("end")
$end.addEventListener("change", filter)

let $reset = document.getElementById("reset")
$reset.addEventListener("click", () => {
    $elevation.value = ""
    $search.value = ""
    $start.value = ""
    $end.value = ""
    filter()
})

function filter() {
    let vegetable = $search.value?.trim().toLowerCase(),
        elevation = $elevation.value,
        start = $start.value.slice(-5),
        end = $end.value.slice(-5),
        header = true
    for (let row of document.querySelectorAll(`tr`)) {
        if (header) { header = false; continue }
        let dVegetable = row.dataset.vegetable,
            dElevation = row.dataset.elevation,
            dStart = row.dataset.start,
            dEnd = row.dataset.end
        row.hidden = 
            !((!dVegetable || dVegetable.includes(vegetable))
            && (!elevation || !dElevation || dElevation === elevation)
            && (!start || !dStart || dStart >= start)
            && (!end || !dEnd || dEnd <= end))
    }
    $count.textContent =
        Array.from(document.querySelectorAll('tr:not([hidden])')).length - 1
}

filter()

})()

