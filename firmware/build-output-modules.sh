#!/bin/sh
set -eu
# Run from the repository root. CH55xDuino 0.0.26 must already be installed.
CLI=${ARDUINO_CLI:-arduino-cli}
for module in display buzzer; do
 cp firmware/shared/frame.h firmware/$module/frame.h
 clock=24internal
 [ "$module" != display ] || clock=16internal
 "$CLI" compile --fqbn "CH55xDuino:mcs51:ch552:clock=$clock,usb_settings=user148,bootloader_pin=p36" --output-dir "firmware/build-$module" "firmware/$module"
done
