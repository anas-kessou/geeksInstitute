#Exercise 1 : Hello World
print("Hello World \n"*4)       



# Exercise 2 : Some Math
print((99**3)*8)



#Exercise 3 : What’s your name ?
my_name = "Anas"
name = input("What's your name ? ")
if name == my_name:
    print("Wow, we have the same name! ")
else:
    print(f"Nice to meet you, {name}! My name is {my_name}. A pleasure to make your acquaintance!")




#Exercise 4 : Tall enough to ride a roller coaster
height = int(input("How tall are you in centimeters ? \n Height: "))
if height > 145:
    print("You are tall enough to ride a roller coaster!")
else:
    print("You need to grow some more to ride.")




# Exercise 5 : Favorite Numbers
my_fav_numbers = {1, 2, 3, 4, 5}
my_fav_numbers.add(6)
my_fav_numbers.add(7)
my_fav_numbers.remove(max(my_fav_numbers))
friend_fav_numbers = {8, 9, 10}
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print(our_fav_numbers)





#Exercise 6: Tuple
my_tuple = (1, 2, 3, 4, 5)
print(f"Original tuple: {my_tuple}")
new_integers = (6, 7, 8)
new_tuple = my_tuple + new_integers
print(f"New tuple: {new_tuple}")
print(f"Original tuple is still unchanged: {my_tuple}")




# Exercise 7: List
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
basket_count = basket.count("Apples")
print(basket_count)
basket.clear()
print(basket)





#Exercise 8 : Sandwich Orders
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")
print(sandwich_orders)
finished_sandwiches=[]
for sandwich in sandwich_orders:
    finished_sandwiches.append(sandwich)
    print(f"I made your {sandwich}")


