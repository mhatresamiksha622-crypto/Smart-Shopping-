; SMART SHOPPING CART SYSTEM
; 8085 Assembly Language
; Products:
; 1. Lipstick   = Rs. 20
; 2. Foundation = Rs. 35
; 3. Blush      = Rs. 25
; 4. Kajal      = Rs. 10
; 5. Concealer  = Rs. 23
;
; Enter product number in register B.
; Result is stored in memory location 2050H.

LXI H, 2050H
MVI M, 00H

; Select product 1 to 5 by changing value of B.
; Example: MVI B, 01H selects Lipstick.

MVI B, 01H

MOV A, B
CPI 01H
JZ LIPSTICK

CPI 02H
JZ FOUNDATION

CPI 03H
JZ BLUSH

CPI 04H
JZ KAJAL

CPI 05H
JZ CONCEALER

JMP EXIT

LIPSTICK:
MVI A, 14H
JMP ADD_PRICE

FOUNDATION:
MVI A, 23H
JMP ADD_PRICE

BLUSH:
MVI A, 19H
JMP ADD_PRICE

KAJAL:
MVI A, 0AH
JMP ADD_PRICE

CONCEALER:
MVI A, 17H

ADD_PRICE:
STA 2050H

EXIT:
HLT
