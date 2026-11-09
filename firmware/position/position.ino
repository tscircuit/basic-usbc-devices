#include <Serial.h>
extern __xdata volatile uint8_t UsbConfig;
static uint8_t statusLed=0;
static void statusPoll(void){
 if(!UsbConfig || (USB_MIS_ST & bUMS_SUSPEND)){P1_5=1;statusLed=0;return;}
 while(USBSerial_available()){uint8_t b=USBSerial_read();if(b=='0'||b=='1'){statusLed=b=='1';P1_5=!statusLed;}}
}

// RK09K1130D62 10k linear potentiometer: ends at GND/VCC, wiper to P1.4.
// CH552E ADC is 8-bit and referenced to VCC. Averaging reduces noise, not quantization.
void setup() { P1_5=1;pinMode(15,OUTPUT); pinMode(14, INPUT); }
void loop() {
  statusPoll();
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
  USBSerial_print(",\"max\":255,\"uptime_ms\":");USBSerial_print(now);USBSerial_print(",\"led\":");USBSerial_print(statusLed);USBSerial_println("}");
  previous=raw;initialized=1;reportTime=now;
}
