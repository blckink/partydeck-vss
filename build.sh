#!/bin/bash

cargo build --release && \
rm -rf build/partydeck-rs
mkdir -p build/ build/res && \
cp target/release/partydeck-rs res/PartyDeckKWinLaunch.sh build/ && \
cp res/splitscreen_horizontal_kwin.js build/res && \
cp res/splitscreen_vertical_kwin.js build/res
