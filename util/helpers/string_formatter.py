from datetime import datetime
import os

def get_datetime(unit_seperator="-", gap="_", with_micros=False) -> str:

    # Current datetime object
    current = datetime.now()

    # The if statements are so each number remains two digits, like 08
    year = format_to_double_digit(current.year)
    month = format_to_double_digit(current.month)
    day = format_to_double_digit(current.day)

    hour = format_to_double_digit(current.hour)
    minute = format_to_double_digit(current.minute)
    second = format_to_double_digit(current.second)
    microsecond = str(current.microsecond)

    # YEAR-MONTH-DAY_HOUR-MIN-SEC
    date = year + unit_seperator + month + unit_seperator + day
    time = hour + unit_seperator + minute + unit_seperator + second

    # If user wants to add microseconds
    # Then add it in the format SEC.MICROS, 52.644012
    if(with_micros):
        time += "." + microsecond

    return date + gap + time


def format_to_double_digit(number: int) -> str:

    # If the number is single digit
    # Then return it with a 0 infront
    if(number % 10 == number):
        return "0" + str(number)
    # If not, that means it's double digit already
    else:
        return str(number)