#include <Serial.h>
// RK09K1130A5R 10k linear potentiometer: ends at GND/VCC, wiper to P1.4.
// CH552E ADC is 8-bit and referenced to VCC. Averaging reduces noise, not quantization.
void setup() { pinMode(14, INPUT); }
void loop() {
  static uint32_t sampleTime=0, reportTime=0;
  static uint16_t sum=0;
  static uint8_t samples=0, previous=255, initialized=0;
  uint32_t now=millis();
  uint8_t raw;
  if(now-sampleTime<2) return;
  sampleTime=now;sum+=analogRead(14);samples++;
  if(samples<8)return;
  raw=(sum+4)/8;sum=0;samples=0;
  if(initialized && raw==previous && now-reportTime<250)return;
  USBSerial_print("{\"module\":\"position\",\"raw\":");USBSerial_print(raw);
  USBSerial_print(",\"max\":255,\"uptime_ms\":");USBSerial_print(now);USBSerial_println("}");
  previous=raw;initialized=1;reportTime=now;
}
