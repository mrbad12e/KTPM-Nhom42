import psycopg2
from helpers import *
from psycopg2.extras import execute_values
import os

info = init()
conn = psycopg2.connect(info)
curs = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

def main():
    exec_file("sql/sms-view.sql")
    exec_file("sql/sms-student.sql")
    exec_file("sql/sms-lecturer.sql")
    exec_file("sql/sms-staff.sql")
    curs.close()
    conn.close()

def exec_file(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            curs.execute(f.read())
            conn.commit()
    except Exception as e:
        print(e)
if __name__ == "__main__":
    main()