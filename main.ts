let Date_time = ""
let Current_minute = 0
let Current_Hour = 0
let Quart = 0
let Hour = 0
timeanddate.set24HourTime(0, 0, 0)
OLED.init(128, 64)
OLED.writeStringNewLine("Set alarm")
OLED.newLine()
OLED.writeStringNewLine("Press red")
OLED.writeStringNewLine("to change Hour")
OLED.newLine()
OLED.writeStringNewLine("Press blue")
OLED.writeStringNewLine("to change Minute")
basic.pause(8000)
while (!(input.pinIsPressed(TouchPin.P0) && input.pinIsPressed(TouchPin.P2))) {
    if (input.pinIsPressed(TouchPin.P0)) {
        Hour += 1
    } else if (input.pinIsPressed(TouchPin.P2)) {
        Quart += 1
    }
    OLED.clear()
    OLED.writeStringNewLine("The current alarm is")
    OLED.writeNum(Hour)
    OLED.writeString(":")
    OLED.writeNum(Quart)
    OLED.newLine()
    OLED.newLine()
    OLED.writeStringNewLine("Press both buttons")
    OLED.writeStringNewLine("to confirm")
    basic.pause(700)
}
timeanddate.set24HourTime(Hour, Quart, 0)
let Alarm_date_time = timeanddate.time(timeanddate.TimeFormat.HMM)
basic.pause(3000)
while (!(input.pinIsPressed(TouchPin.P0) && input.pinIsPressed(TouchPin.P2))) {
    if (input.pinIsPressed(TouchPin.P0)) {
        Current_Hour += 1
    } else if (input.pinIsPressed(TouchPin.P2)) {
        Current_minute += 1
    }
    OLED.clear()
    OLED.writeStringNewLine("The current time is")
    OLED.writeNum(Current_Hour)
    OLED.writeString(":")
    OLED.writeNum(Current_minute)
    OLED.newLine()
    OLED.newLine()
    OLED.writeStringNewLine("Press both buttons")
    OLED.writeStringNewLine("to confirm")
    basic.pause(700)
}
timeanddate.set24HourTime(Current_Hour, Current_minute, 0)
basic.forever(function () {
    basic.pause(5000)
    OLED.clear()
    OLED.writeStringNewLine("Water level.  ")
    OLED.writeNum(Environment.ReadWaterLevel(AnalogPin.P4))
    OLED.newLine()
    OLED.writeStringNewLine("Current time")
    OLED.writeStringNewLine(timeanddate.time(timeanddate.TimeFormat.HMM))
    OLED.newLine()
    OLED.writeStringNewLine("Current Alarm")
    OLED.writeNum(Hour)
    OLED.writeString(":")
    OLED.writeNum(Quart)
    Date_time = timeanddate.time(timeanddate.TimeFormat.HMM)
    if (Date_time == Alarm_date_time) {
        while (Environment.ReadWaterLevel(AnalogPin.P4) > 50) {
            OLED.clear()
            OLED.writeStringNewLine("Water Time")
            pins.digitalWritePin(DigitalPin.P8, 0)
            basic.pause(200)
            pins.digitalWritePin(DigitalPin.P8, 1)
            basic.pause(100)
        }
    }
    if (Environment.ReadWaterLevel(AnalogPin.P4) < 50) {
        OLED.clear()
        OLED.writeStringNewLine("Recharge Water")
        OLED.newLine()
        OLED.writeStringNewLine("Current time")
        OLED.writeStringNewLine(timeanddate.time(timeanddate.TimeFormat.HMM))
        OLED.newLine()
        OLED.writeStringNewLine("Current Alarm")
        OLED.writeNum(Hour)
        OLED.writeString(":")
        OLED.writeNum(Quart)
    }
})
