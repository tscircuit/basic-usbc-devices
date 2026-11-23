cmake_minimum_required(VERSION 3.16)
list(APPEND PICO_BOARD_HEADER_DIRS ${CMAKE_CURRENT_LIST_DIR}/boards)
set(PICO_BOARD tscircuit_motherboard CACHE STRING "RP2350 USB Motherboard")
include($ENV{PICO_SDK_PATH}/external/pico_sdk_import.cmake)
project(motherboard C CXX ASM)
pico_sdk_init()
include(FetchContent)
FetchContent_Declare(sd_fatfs
    GIT_REPOSITORY https://github.com/carlk3/no-OS-FatFS-SD-SDIO-SPI-RPi-Pico.git
    GIT_TAG d5e453404cdbfaa55ab30d285b6ab0b730e84a05
    SOURCE_SUBDIR src)
FetchContent_MakeAvailable(sd_fatfs)
add_executable(motherboard main.c storage.c)
target_include_directories(motherboard PRIVATE .)
target_link_libraries(motherboard pico_stdlib tinyusb_host hardware_uart pico_multicore no-OS-FatFS-SD-SDIO-SPI-RPi-Pico)
pico_enable_stdio_usb(motherboard 0)
pico_enable_stdio_uart(motherboard 1)
pico_add_extra_outputs(motherboard)
