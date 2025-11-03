#Exercise 1 : Geometry
import random

class Circle():
    def __init__(self,radius=1.0):
        self.radius=radius
    def perimeter(self):
        return 2*3.14*self.radius
    def area(self):
        return 3.14*self.radius**2
    def definition(self):
        print("A circle is a shape with all points at the same distance from its center.")

Circle().definition()
print(Circle().perimeter())
print(Circle().area())





#Exercise 2 : Custom List Class
class MyList:
    def __init__(self,my_list=None):
        if my_list is None:
            my_list=[]
        self.my_list=my_list
    def reversed_list(self):
         return self.my_list[::-1]
    def sorted_list(self):
        return sorted(self.my_list)
    def random_list(self):
        return [random.randint(0,100) for i in range(len(self.my_list))]
        
l=["k","c","a","b","g"]
mylist=MyList(l)
print(f"original list: {mylist.my_list}")
print(f"reversed list: {mylist.reversed_list()}")
print(f"sorted list: {mylist.sorted_list()}")
print(f"random list: {mylist.random_list()}")




#Exercise 3 : Restaurant Menu Manager

class MenuManager:
    def __init__(self):
        self.menu=[
            {"name": "Soup", "price": 10, "spice_level": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice_level": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice_level": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice_level": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice_level": "B", "gluten": True}
        ]
    def add_item(self,name, price, spice, gluten):
        print("the spice level:\n       • A = not spicy,\n       • B = a little spicy,\n       • C = very spicy")
        self.menu.append({"name":name,"price":price,"spice_level":spice,"gluten":gluten})
        print(f"{name} was added to the menu.")

    def update_item(self, name, price, spice, gluten):
        for x in self.menu:
            if x["name"]==name:
                x["price"]=price
                x["spice_level"]=spice
                x["gluten"]=gluten
                print(f"{name} was updated.")
                return 
        print("the dish is not in the menu.")

    def remove_item(self,name):
         for x in self.menu:
            if x["name"]==name:
                self.menu.remove(x)
                print(f"{name} was removed from the menu.")
                return 
         print("the dish is not in the menu.")

    



        
        
