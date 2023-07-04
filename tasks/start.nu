#!/usr/bin/env nu

let rawData = (
    open data.csv
    | sort-by vegetable elevation -i
)

let data = (
$rawData
| each { |x|
    let start = (
        $x.start
        | date format
        | str substring 5..11
        | split row ' '
        | $"($in.1) ($in.0)")
    let end = (
        $x.end
        | date format
        | str substring 5..11
        | split row ' '
        | $"($in.1) ($in.0)")
    $'<tr data-vegetable="($x.vegetable | str downcase)" data-elevation="($x.elevation)" data-start="($x.start)" data-end="($x.end)">
        <td>($x.vegetable)</td>
        <td>(if $x.elevation == 3000 {
             "3000 - 4500"
         } else if $x.elevation == 4500 {
             "4500 - 6000"
         } else {
            "Above 6000"
         })</td>
        <td>($start)</td>
        <td>($end)</td>
    </tr>'
}
| str join '')

open ./src/index.html
| str replace '{{data}}' $data
| save -f ./index.html

