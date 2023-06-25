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

let $header = document.querySelector('thead')
$header.addEventListener("click", (e) => {
    let target = e.target.closest('th')
    if (target.tagName !== 'TH') return
    sort = target.dataset.sort
    if (!sort) return
    let tbody = document.querySelector('tbody')
    let direction =
        target.classList.contains('asc')
            ? 'desc'
        : target.classList.contains('desc')
            ? 'asc'
        : 'asc'
    for (let th of $header.querySelectorAll('th')) {
        th.classList.remove('asc', 'desc')
    }
    target.classList.add(direction)
    let rows = Array.from(document.querySelectorAll('tbody>tr'))
    rows.sort((a, b) => {
        let aVal = a.dataset[sort],
            bVal = b.dataset[sort]
        return (aVal < bVal)
           ? -1
        : (aVal > bVal)
            ? 1
        : 0
    })
    if (direction === 'desc') rows.reverse()
    rows.forEach(tr => tbody.appendChild(tr))
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

