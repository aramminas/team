export default function convertData(set) {
    let date = new Date(set) // YYYY-MM-DD
    let d = date.getDate()
    let m = date.getMonth() + 1
    let y = date.getFullYear()

    return y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)
}