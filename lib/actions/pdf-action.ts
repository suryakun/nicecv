'use server'

import db from "../../prisma/db";
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import path from 'path';
import { PDFOptions, PaperFormat } from 'puppeteer';
import fs from 'fs';

export const generatePDF = async (templateId: number, resumeId: string) => {
  const data = await db.resume.findUnique({
    where: {
      id: resumeId
    },
    include: {
      experience: true,
      skill: true,
      education: true,
      course: true,
      award: true,
      publication: true
    }
  });
  const templateHtml = await db.template.findUnique({
    where: {
      id: templateId
    }
  });
  if (!data || !templateHtml) {
    throw new Error('Data not found');
  }
	const template = handlebars.compile(templateHtml.fileName);
	const html = template(data);

  const pdfDir = path.join(process.cwd(), 'pdf');
  const pdfPath = path.join(pdfDir, `${templateId}-${resumeId}.pdf`);

  // Ensure the directory exists
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  console.log(pdfPath);
  const options: PDFOptions = {
    scale: 0.9,
    format: 'A4' as PaperFormat,
    landscape: false,
    headerTemplate: "<p></p>",
    footerTemplate: "<p></p>",
    displayHeaderFooter: false,
    margin: {
        top: "10px",
        bottom: "30px"
    },
    printBackground: true,
    path: pdfPath,
  }

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true
	});

	var page = await browser.newPage();
	
	await page.goto(`data:text/html;charset=UTF-8,${html}`, {
		waitUntil: 'networkidle2'
	});

	await page.pdf(options);
	await browser.close();
}