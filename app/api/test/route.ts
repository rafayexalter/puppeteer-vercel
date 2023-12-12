import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Optional: If you'd like to use the legacy headless mode. "new" is the default.
  chromium.setHeadlessMode = true;

  // Optional: If you'd like to disable webgl, true is the default.
  chromium.setGraphicsMode = false;

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://dev.to/");
  const pageTitle = await page.title();
  await browser.close();

  return NextResponse.json({ title: pageTitle });
  //return NextResponse.json({ title: "Hello" });
}
