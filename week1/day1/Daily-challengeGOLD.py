#Happy birthday
from datetime import datetime

birthday=input("Enter your birthdate (DD/MM/YYYY): ")

birthday=list(birthday.split("/"))

year=tuple(str(datetime.now().year-int(birthday[2])))

    
a=int(year[-1])
u=12-a
b=int(u/2)


def happy_birthday(a,b):
    print("       "+"_"*b+"i"*a+"_"*b)
    print("      |:H:a:p:p:y:|")
    print("    __|___________|__")
    print("   |^^^^^^^^^^^^^^^^^|")
    print("   |:B:i:r:t:h:d:a:y:|")
    print("   |                 |")
    print("   ~~~~~~~~~~~~~~~~~~~")
if u%2!=0:
    b=b
    happy_birthday(a,b)
else:
    b=b-1
    happy_birthday(a,b)