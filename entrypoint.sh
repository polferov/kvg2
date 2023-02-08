#!/bin/sh
trap 'exit' TERM;
deno run --allow-net --allow-read --allow-write server.js