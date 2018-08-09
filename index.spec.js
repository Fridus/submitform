import puppeteer from 'puppeteer'
import { expect } from 'chai'
import handler from 'serve-handler'
import http from 'http'
import dataValues from './test/values'
import { parseQueryString, convertDataValues } from './test/util'

let browser
const browserOptions = {
  headless: false,
  slowMo: 100,
  timeout: 10000
}
let server

before(async function () {
  browser = await puppeteer.launch(browserOptions);
});

before(done => {
  server = http.createServer((request, response) => {
    return handler(request, response, { public: './test' })
  })
  server.listen(8080, () => done())
})

after(function (done) {
  browser.close()
  server.close(done)
});

describe('Submit', function () {
  it('Check submited values', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8080')
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    const { search } = await page.evaluate(() => location)
    const qs = parseQueryString(search)
    expect(convertDataValues(qs)).to.be.deep.equal(convertDataValues(dataValues))
  })
});
