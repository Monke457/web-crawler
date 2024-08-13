import { test, expect }	 from "@jest/globals";
import { normalizeURL, getURLsFromHTML }	 from "./crawl.js";

test('normalizes URL https://blog.boot.dev/path/ to blog.boot.dev/path', () => {
	expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
}); 
test('normalizes URL https://blog.boot.dev/path to blog.boot.dev/path', () => {
	expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
}); 
test('normalizes URL http://blog.boot.dev/path/ to blog.boot.dev/path', () => {
	expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
}); 
test('normalizes URL http://blog.boot.dev/path to blog.boot.dev/path', () => {
	expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
}); 
test('normalizes URL http://blog.boot.dev:80/path to blog.boot.dev/path', () => {
	expect(normalizeURL('http://blog.boot.dev:80/path')).toBe('blog.boot.dev/path');
}); 
test('normalizes URL https://blog.boot.dev:443/path to blog.boot.dev/path', () => {
	expect(normalizeURL('https://blog.boot.dev:443/path')).toBe('blog.boot.dev/path');
}); 
test('normalizes URL http://blog.boot.dev/path?search=test to blog.boot.dev/path', () => {
	expect(normalizeURL('http://blog.boot.dev/path?search=test')).toBe('blog.boot.dev/path');
}); 

test('gets 0 URLs: [] from HTML: <div>hello</div> with base boot.dev', () => {
	const expected = [];
	expect(getURLsFromHTML('<div>hello</div>', 'boot.dev')).toEqual(expected);
});
test('gets 1 URLs: ["https://boot.dev/path"] from HTML: <div>hello <a href="https://boot.dev/path">Link</a></div> with base: boot.dev', () => {
	const expected = ["https://boot.dev/path"];
	expect(getURLsFromHTML('<div>hello <a href="https://boot.dev/path">Link</a></div>', 'boot.dev')).toEqual(expected);
});
test('gets 2 URLs: ["http://boot.dev/path", "boot.dev/info"] from HTML: <div>hello <a href="http://boot.dev/path">Link</a> <a href="/info">Info</a></div> with base boot.dev', () => {
	const expected = ["http://boot.dev/path", "boot.dev/info"];
	expect(getURLsFromHTML('<div>hello <a href="http://boot.dev/path">Link</a> <a href="/info">Info</a></div>', 'boot.dev')).toEqual(expected);
});
