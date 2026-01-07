#!/usr/bin/env node

import nodeDns = require("node:dns");

const readline = require("readline");
const dns = require("node:dns").promises;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function dnsCheck(url: string) {
  try {
    const records: any[] = await dns.resolveAny(url);

    if (records.length > 0) {
      console.log("DNS OK!");
    }
  } catch (error) {
    console.log("DNS Failed");
  }
}

async function start() {
  try {
    //Wrapping rl.question into a Promise to be able to await the user input
    const url: string = await new Promise((resolve) =>
      rl.question(`What's the name of the website you want to check? `, resolve)
    );
    rl.close();
    dnsCheck(url);
  } catch (error) {
    console.log("Input error", error);
  }
}

//Next:
//Port check, httpfetch
//All processes should be done simultaneously.
//After each check, console log result.
//Extra: Colored outputs

start();
