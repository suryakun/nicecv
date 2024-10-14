'use server';

import db from '../../prisma/db';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import path from 'path';
import { PDFOptions, PaperFormat } from 'puppeteer';
import fs from 'fs';

export const generatePDF = async (
  templateId: number,
  resumeId: string,
): Promise<string> => {
  const data = await db.resume.findUnique({
    where: {
      id: resumeId,
    },
    include: {
      experience: true,
      skill: true,
      education: true,
      course: true,
      award: true,
      publication: true,
    },
  });
  const templateHtml = await db.template.findUnique({
    where: {
      id: templateId,
    },
  });
  if (!data || !templateHtml) {
    throw new Error('Data not found');
  }
  const template = handlebars.compile(templateHtml.fileName);
  const html = template(data);

  const pdfDir = path.join(process.cwd(), 'pdf');
  const pdfPath = path.join(pdfDir, `${resumeId}.pdf`);
  const screenshotPath = path.join(pdfDir, `${resumeId}.png`);

  // Ensure the directory exists
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  const options: PDFOptions = {
    scale: 1,
    format: 'A4' as PaperFormat,
    landscape: false,
    printBackground: false,
    path: pdfPath,
    preferCSSPageSize: true,
    waitForFonts: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    },
  };

  const browser = await puppeteer.launch({
    executablePath: process.env.CHROMIUM_PATH,
    args: ['--no-sandbox'],
    headless: true,
  });

  const page = await browser.newPage();

  // Set the viewport with calculated dimensions
  await page.setViewport({
    width: 795, // 210mm = 8.27 inches = ~795px
    height: 1125, // 297mm = 11.69 inches = ~1125px
    deviceScaleFactor: 1,
  });

  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf(options);
  await page.addStyleTag({
    content: `
      @page {
        size: A4;
        margin: 0;
      }
      body {
        margin: 96px;
        padding: 0;
      }
      /* Ensure content stays within margins */
      * {
        box-sizing: border-box;
      }
    `,
  });
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
    optimizeForSpeed: true,
  });
  await browser.close();

  return pdfPath;
};
