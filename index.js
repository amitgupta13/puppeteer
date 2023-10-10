const puppeteer = require("puppeteer");
const { writeFileSync, readFileSync } = require("fs");
const Handlebars = require("handlebars");

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();

  // Open a new page
  const page = await browser.newPage();

  // Set the HTML content you want to convert to PDF
  const templateSource = readFileSync("test.hbs", "utf8");

  const template = Handlebars.compile(templateSource);

  const data = {
    title: "My Page",
    heading: "Welcome to my website",
    content: "This is some content for the page.",
  };

  // Generate the HTML output by applying the data to the template
  const html = template(data);

  console.log({ html });

  // Navigate to a data URL containing the HTML content
  await page.goto(`data:text/html,${html}`);

  // Set options for the PDF generation
  const pdfOptions = {
    // path: "mypdf.pdf", // Output PDF file path
    format: "A4", // Page format
  };

  // Generate PDF from the page
  const pdf = await page.pdf(pdfOptions);
  writeFileSync("test.pdf", pdf);
  // Close the browser
  await browser.close();
})();
