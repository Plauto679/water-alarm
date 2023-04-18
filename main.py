Date_time = ""
Current_minute = 0
Current_Hour = 0
Quart = 0
Hour = 0
timeanddate.set24_hour_time(0, 0, 0)
OLED.init(128, 64)
OLED.write_string_new_line("Set alarm")
OLED.new_line()
OLED.write_string_new_line("Keep pressing A")
OLED.write_string_new_line("to change Hour")
OLED.new_line()
OLED.write_string_new_line("Keep pressing B")
OLED.write_string_new_line("to change Minute")
basic.pause(8000)
while not (input.pin_is_pressed(TouchPin.P1) and input.pin_is_pressed(TouchPin.P2)):
    if input.pin_is_pressed(TouchPin.P1):
        Hour += 1
    elif input.pin_is_pressed(TouchPin.P2):
        Quart += 1
    OLED.clear()
    OLED.write_string_new_line("The current alarm is")
    OLED.write_num(Hour)
    OLED.write_string(":")
    OLED.write_num(Quart)
    OLED.new_line()
    OLED.new_line()
    OLED.write_string_new_line("Press both buttons")
    OLED.write_string_new_line("to confirm")
    basic.pause(700)
timeanddate.set24_hour_time(Hour, Quart, 0)
Alarm_date_time = timeanddate.time(timeanddate.TimeFormat.HMM)
basic.pause(3000)
while not (input.pin_is_pressed(TouchPin.P1) and input.pin_is_pressed(TouchPin.P2)):
    if input.pin_is_pressed(TouchPin.P1):
        Current_Hour += 1
    elif input.pin_is_pressed(TouchPin.P2):
        Current_minute += 1
    OLED.clear()
    OLED.write_string_new_line("The current time is")
    OLED.write_num(Current_Hour)
    OLED.write_string(":")
    OLED.write_num(Current_minute)
    OLED.new_line()
    OLED.new_line()
    OLED.write_string_new_line("Press both buttons")
    OLED.write_string_new_line("to confirm")
    basic.pause(700)
timeanddate.set24_hour_time(Current_Hour, Current_minute, 0)

def on_forever():
    global Date_time
    basic.pause(10000)
    OLED.clear()
    OLED.write_string_new_line("Current time")
    OLED.write_string_new_line(timeanddate.time(timeanddate.TimeFormat.HMM))
    OLED.new_line()
    OLED.write_string_new_line("Current Alarm")
    OLED.write_num(Hour)
    OLED.write_string(":")
    OLED.write_num(Quart)
    Date_time = timeanddate.time(timeanddate.TimeFormat.HMM)
    if Date_time == Alarm_date_time:
        OLED.clear()
        OLED.write_string_new_line("Water Time")
        music.play_melody("C D E F G A B C5 ", 121)
    if Environment.read_water_level(AnalogPin.P7) < 50:
        OLED.clear()
        OLED.write_string_new_line("Recharge Water")
        OLED.new_line()
        OLED.write_string_new_line("Current time")
        OLED.write_string_new_line(timeanddate.time(timeanddate.TimeFormat.HMM))
        OLED.new_line()
        OLED.write_string_new_line("Current Alarm")
        OLED.write_num(Hour)
        OLED.write_string(":")
        OLED.write_num(Quart)
basic.forever(on_forever)
