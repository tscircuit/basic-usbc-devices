// Bounded streaming protocol; no partial command is executed before CRC passes.
#ifndef MODULE_FRAME_H
#define MODULE_FRAME_H
#include <stdint.h>
#define FRAME_MAX 48
#ifdef SDCC
#define FRAME_MEM __xdata
#else
#define FRAME_MEM
#endif
static FRAME_MEM uint8_t payload[FRAME_MAX];
static uint8_t state,opcode,sequence,length,index_,checksum;
static uint8_t crc8(uint8_t crc,uint8_t value){
 uint8_t i;crc^=value;
 for(i=0;i<8;i++)crc=(crc&0x80)?(uint8_t)((crc<<1)^7):(uint8_t)(crc<<1);
 return crc;
}
static void frame_reset(void){state=0;}
// 1 = complete valid frame, 2 = bad CRC, 3 = oversized frame, 0 = more bytes.
static uint8_t frame_byte(uint8_t b){
 switch(state){
 case 0:if(b==0xa5)state=1;break;
 case 1:state=b==0x5a?2:(b==0xa5?1:0);break;
 case 2:opcode=b;checksum=crc8(0,b);state=3;break;
 case 3:sequence=b;checksum=crc8(checksum,b);state=4;break;
 case 4:length=b;checksum=crc8(checksum,b);index_=0;if(b>FRAME_MAX){state=0;return 3;}state=b?5:6;break;
 case 5:payload[index_++]=b;checksum=crc8(checksum,b);if(index_==length)state=6;break;
 case 6:state=0;return b==checksum?1:2;
 }
 return 0;
}
#endif
