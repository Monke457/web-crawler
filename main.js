import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main() {
	if (process.argv.length !== 3) {
		console.log('Please pass a url to crawl as an argument. Example: npm run start www.[URL].com')
		return
	}

	const url = process.argv[2]

	console.log(`starting crawl at ${url}`)

	const links = await crawlPage(url)
	printReport(links)
}

await main()
