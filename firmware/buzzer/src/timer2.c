#include "include/ch5xx.h"

void Timer2Interrupt(void) __interrupt {
  TF2 = 0;
  P1_4 = !P1_4;
}
