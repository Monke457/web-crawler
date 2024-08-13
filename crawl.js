import { JSDOM } from 'jsdom';

export { normalizeURL, getURLsFromHTML, crawlPage };


function normalizeURL(url) {
	const urlObj = new URL(url)
	const host = urlObj.hostname
	let path = urlObj.pathname
	if (path.endsWith('/')) {
		path = path.slice(0, -1)
	}

	return `${host}${path}`
}

function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody)
	const anchors = dom.window.document.querySelectorAll('a')
	const results = []

	for (const anchor of anchors) {
		let href = new URL(anchor.href, baseURL).href
		results.push(href)
	}

	return results
}

async function crawlPage(baseURL, currentURL=baseURL, pages={}) {
	if (!currentURL.includes(baseURL)) {
		return pages
	}

	const normalURL = normalizeURL(currentURL)
	if (pages[normalURL]) {
		pages[normalURL]++
		return pages
	}

	pages[normalURL] = 1
	const to_visit = await scrapeURLs(baseURL, currentURL)
	for (const url of to_visit) {
		await crawlPage(baseURL, url, pages)
	}
	return pages
}

async function scrapeURLs(baseURL, url) {
	let response
	try {
		response = await fetch(url)
	} catch (err) {
		console.log(err)
		return []
	}

	if (response.status >= 400) {
		console.log(`HTTP error: ${response.status} ${response.statusText}`)
		return []
	}
	if (!response.headers.get('content-type').includes('text/html')) {
		console.log(`Incorrect content type: ${response.headers.get('content-type')}`)
		return []
	}

	return getURLsFromHTML(await response.text(), baseURL)
}

