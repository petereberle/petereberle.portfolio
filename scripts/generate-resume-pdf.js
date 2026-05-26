const fs = require("fs")
const http = require("http")
const path = require("path")
const { chromium } = require("playwright")

const rootDirectory = path.resolve(__dirname, "..")
const publicDirectory = path.join(rootDirectory, "public")
const outputDirectory = path.join(rootDirectory, "content", "resume", "generated")
const slugs = process.argv.slice(2)

if (slugs.length === 0) {
  console.error("Usage: npm run resume:pdf -- <slug> [another-slug]")
  process.exit(1)
}

const mimeTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".otf": "font/otf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
}

const staticServer = http.createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname)
  const documentPath = requestPath.endsWith("/") ? `${requestPath}index.html` : requestPath
  const filePath = path.resolve(publicDirectory, `.${documentPath}`)

  if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) {
    response.writeHead(403)
    response.end("Forbidden")
    return
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404)
      response.end("Not found")
      return
    }

    response.setHeader("Content-Type", mimeTypes[path.extname(filePath)] || "application/octet-stream")
    fs.createReadStream(filePath).pipe(response)
  })
})

const countPdfPages = buffer => {
  const pages = buffer.toString("latin1").match(/\/Type\s*\/Page(?!s)\b/g)
  return pages ? pages.length : 0
}

const generatePdfs = async () => {
  fs.mkdirSync(outputDirectory, { recursive: true })

  const port = await new Promise(resolve => {
    staticServer.listen(0, "127.0.0.1", () => resolve(staticServer.address().port))
  })

  const browser = await chromium.launch()

  try {
    for (const slug of slugs) {
      const page = await browser.newPage()
      const pageUrl = `http://127.0.0.1:${port}/resume/${encodeURIComponent(slug)}/`
      const outputPath = path.join(outputDirectory, `${slug}.pdf`)

      const response = await page.goto(pageUrl, { waitUntil: "networkidle" })

      if (!response || !response.ok()) {
        throw new Error(`Resume page not found: ${pageUrl}`)
      }

      await page.emulateMedia({ media: "print" })
      const pdf = await page.pdf({
        format: "Letter",
        path: outputPath,
        preferCSSPageSize: true,
        printBackground: true,
      })

      const pageCount = countPdfPages(pdf)

      if (pageCount > 2) {
        throw new Error(`${slug}.pdf is ${pageCount} pages; resumes are limited to 2 pages.`)
      }

      console.log(`Generated content/resume/generated/${slug}.pdf (${pageCount || "unknown"} pages)`)
      await page.close()
    }
  } finally {
    await browser.close()
    staticServer.close()
  }
}

generatePdfs().catch(error => {
  staticServer.close()
  console.error(error.message)
  process.exitCode = 1
})
