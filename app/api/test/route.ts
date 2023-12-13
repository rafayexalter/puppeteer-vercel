import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Optional: If you'd like to use the legacy headless mode. "new" is the default.
  //chromium.setHeadlessMode = true;

  // Optional: If you'd like to disable webgl, true is the default.
  //chromium.setGraphicsMode = false;

  const browser = await puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      `https://github.com/Sparticuz/chromium/releases/download/v119.0.0/chromium-v119.0.0-pack.tar`
    ),
    headless: "new",
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto("https://dev.to/");
  const pageTitle = await page.title();

  await browser.close();
  return NextResponse.json({ title: pageTitle, message: "Working fine" });

  //return NextResponse.json({ title: "Hello2" });
}
