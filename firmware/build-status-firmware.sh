#!/bin/sh
set -eu
CLI=${ARDUINO_CLI:-arduino-cli}
for module in dial position display buzzer; do
 clock=24internal; usb=usbcdc; output="firmware/build-$module"
 [ "$module" != dial ] || output=firmware/build
 if [ "$module" = display ] || [ "$module" = buzzer ]; then usb=user148; fi
 [ "$module" != display ] || clock=16internal
 "$CLI" compile --fqbn "CH55xDuino:mcs51:ch552:clock=$clock,usb_settings=$usb,bootloader_pin=p36" --output-dir "$output" "firmware/$module"
done
