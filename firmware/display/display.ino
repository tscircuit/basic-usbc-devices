// USB-C ILI9488 8080 adapter. CH552T, 3.3 V, 16 MHz internal clock.
// P1[7:0]=D[7:0], P3.2=WR, P3.3=DC, P3.1=RESET, P3.4=backlight.
#include "src/userUsbCdc/USBCDC.h"
#include "frame.h"
extern __xdata volatile uint8_t UsbConfig;
static uint32_t lastByte;
static uint8_t sleeping=1;
static void lcd_write(uint8_t b){P1=b;P3_2=0;__asm__("nop\n nop\n");P3_2=1;}
static void lcd_command(uint8_t b){P3_3=0;lcd_write(b);P3_3=1;}
static void lcd_reset(void){P3_4=0;P3_1=0;delay(20);P3_1=1;delay(150);sleeping=0;}
static void reply(uint8_t status){USBSerial_write(0xac);USBSerial_write(sequence);USBSerial_write(status);USBSerial_flush();}
static uint8_t execute(void){
 uint8_t i;
 if(opcode==1 && length==0){lcd_reset();return 0;}
 if(sleeping)return 5;
 if(opcode==2 && length>=1){lcd_command(payload[0]);for(i=1;i<length;i++)lcd_write(payload[i]);return 0;}
 if(opcode==3 && length>=1){for(i=0;i<length;i++)lcd_write(payload[i]);return 0;}
 if(opcode==4 && length==1 && payload[0]<=1){P3_4=payload[0];return 0;}
 return 4;
}
void setup(){
 P3_4=0;P3_2=1;P3_3=1;P3_1=0;P1=0;
 P1_MOD_OC=0;P1_DIR_PU=0xff;
 P3_MOD_OC&=~0x1e;P3_DIR_PU|=0x1e;
 USBInit();
}
void loop(){
 uint8_t result;
 if(USB_MIS_ST & bUMS_SUSPEND){
  P3_4=0;if(!sleeping){lcd_command(0x28);lcd_command(0x10);sleeping=1;}frame_reset();
  SAFE_MOD=0x55;SAFE_MOD=0xaa;WAKE_CTRL=bWAK_BY_USB;SAFE_MOD=0;
  if(USB_MIS_ST & bUMS_SUSPEND)PCON|=PD;
  SAFE_MOD=0x55;SAFE_MOD=0xaa;WAKE_CTRL=0;SAFE_MOD=0;
  return;
 }
 if(!UsbConfig){P3_4=0;P3_1=0;sleeping=1;frame_reset();return;}
 if(state && (uint32_t)(millis()-lastByte)>250)frame_reset();
 while(USBSerial_available()){
  lastByte=millis();result=frame_byte((uint8_t)USBSerial_read());
  if(result==1)reply(execute());else if(result)reply(result);
 }
}
