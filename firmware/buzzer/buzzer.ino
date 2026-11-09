// Active 2.8 kHz buzzer: CH552E P1.4 controls a low-side MOSFET.
#include "src/userUsbCdc/USBCDC.h"
#include "frame.h"
extern __xdata volatile uint8_t UsbConfig;
static uint32_t lastByte,started;
static uint16_t duration;
static void off(void){P1_4=0;duration=0;}
void setup(){P1_5=1;pinMode(15,OUTPUT);P1_4=0;pinMode(14,OUTPUT);USBInit();}
void loop(){
 uint8_t result,status;
 if(USB_MIS_ST & bUMS_SUSPEND){
  P1_5=1;off();frame_reset();SAFE_MOD=0x55;SAFE_MOD=0xaa;WAKE_CTRL=bWAK_BY_USB;SAFE_MOD=0;
  if(USB_MIS_ST & bUMS_SUSPEND)PCON|=PD;
  SAFE_MOD=0x55;SAFE_MOD=0xaa;WAKE_CTRL=0;SAFE_MOD=0;return;
 }
 if(!UsbConfig){P1_5=1;off();frame_reset();return;}
 if(duration && (uint32_t)(millis()-started)>=duration)off();
 if(state && (uint32_t)(millis()-lastByte)>250)frame_reset();
 while(USBSerial_available()){
  lastByte=millis();result=frame_byte((uint8_t)USBSerial_read());
  if(!result)continue;
  status=result==1?4:result;
  if(result==1 && opcode==0x10 && length==2){
   uint16_t ms=(uint16_t)payload[0]|((uint16_t)payload[1]<<8);
   if(ms<=10000){duration=ms;started=millis();P1_4=ms!=0;status=0;}
  }
  if(result==1 && opcode==0x20 && length==1 && payload[0]<=1){P1_5=!payload[0];status=0;}
  USBSerial_write(0xac);USBSerial_write(sequence);USBSerial_write(status);USBSerial_flush();
 }
}
