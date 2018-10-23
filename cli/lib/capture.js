'use strict'
const puppeteer = require('puppeteer')
const chalk = require('chalk')
const _ = require('lodash')
const Path = require('path')
const { isDirectory } = require('./fs')

const capture = async (page, baseUrl, { path, selector }, outputDir) => {
    const url = `${baseUrl}${path}`

    console.log(chalk`{yellow Capturing {white ${path}}} {dim (selector: ${selector})}`)

    await page.goto(url)

    const element = await page.$(selector)
    if (element === null) {
        throw new Error(`Unable to find element matching selector: '${selector}' (url: ${url})`)
    }

    const clip = await element.boundingBox()

    const filename = `${_.snakeCase(_.deburr(path))}.png`
    const fullPath = Path.join(outputDir, filename)

    await page.screenshot({ path: fullPath, clip })

    console.log(chalk`  {green saved to {white ${filename}}} {dim (${fullPath})}`)
    console.log('')
}

module.exports = async ({ baseUrl, outputDir, items }) => {
    console.log(chalk`{yellow {white ${items.length}} item(s) to capture}`)
    console.log(chalk`  {dim baseUrl:   {white ${baseUrl}}}`)
    console.log(chalk`  {dim outputDir: {white ${outputDir}}}`)
    console.log('')

    const isDir = await isDirectory(outputDir)
    if (!isDir) {
        throw new Error(`'${outputDir}' is not a valid directory`)
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1400, height: 4000 })

    for (let pageConfig of items) {
        await capture(page, baseUrl, pageConfig, outputDir)
    }

    await browser.close()
}
