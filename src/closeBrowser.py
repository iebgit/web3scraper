import time
import os
from datetime import date

time.sleep(60)
today = date.today()
print(today)
os.system("taskkill /im firefox.exe /f")
