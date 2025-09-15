import random





#Exercise 1: What is the Season?
month = int(input("Enter a month number (1-12): "))
if month in [12, 1, 2]:
    season = "winter"
elif month in [3, 4, 5]:
    season = "spring"
elif month in [6, 7, 8]:
    season = "summer"
elif month in [9, 10, 11]:
    season = "autumn"
else:
    season = "Invalid month"
print(f"The season is {season}")


#Exercise 2: For Loop
for i in range(1, 21):
    print(i)

for i in range(1, 21):
    if i % 2 == 0:
        print(i)  

#Exercise 3: While Loop
while True:
    name=input("Enter your name: ")
    if name == "anas":
        break
    else:
       continue



#Exercise 4: Check the index
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name= input("Enter your name: ")
for name in names:
    if name == user_name:
        print(names.index(user_name))
        break


#Exercise 5: Greatest Number
n1=int(input("Enter the first number: "))
n2=int(input("Enter the second number: "))
n3=int(input("Enter the third number: "))

if n1>n2 and n1>n3:
    greatest_number=n1

elif n2>n1 and n2>n3:
    greatest_number=n2

else:
    greatest_number=n3

greatest_number = max(n1, n2, n3)

print(f"The greatest number is : {greatest_number}")




#Exercise 6: Random number


num= int(input("Enter a number between 1 and 9 (include): "))
random_num= random.randint(1,9)

if num== random_num:
    print("Winner")
else:
    print("Better luck next time.")


#bonus1

while True:
    num= int(input("Enter a number between 1 and 9 (include): "))
    random_num= random.randint(1,9)
    if num== random_num:
        print("Winner")
        break
    else:
        print("Better luck next time.")
        continue



