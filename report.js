export { printReport }

function printReport(pages) {
	console.log("---------------------------")
	console.log("Report of links starting")
	console.log("---------------------------")

	const sorted = Object.fromEntries(
		Object.entries(pages).sort(([,a],[,b]) => b - a)
	)
	for (const key in sorted) {
		console.log(`Found ${sorted[key]} internal ${sorted[key] > 1 ? 'links' : 'link'} to ${key}`)
	}

	console.log("---------------------------")
}
