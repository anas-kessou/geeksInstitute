import ExercisesXP

#Exercise 1 : Pets

class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Siamese(Cat):
    def sing(self,sounds):
        return f'{sounds}'
all_cats=[Bengal("bengal",1),Chartreux("chartreux",2),Siamese("siamese",3)]
sara_pets=Pets(all_cats)
sara_pets.walk()




# Exercise 2 : Dogs
#==================================
#**********************
#==================================

# from ExercisesXP import Dog
# import random
# class PetDog(Dog):

#     def __init__(self,name,age,weight):
#         super().__init__(name,age,weight)
#         self.trained=False
    
#     def train(self):
#         print(self.bark())
#         self.trained=True
#     def play(self,*args):
#         all_dogs= " ,".join([args.name for args in args])
#         print(f"{all_dogs} all play together")
    
#     def do_a_trick(self):
#         tricks=["does a barrel roll","stands on his back legs","plays dead"," shakes your hand"]
#         if self.trained==True:
#             print(f"{self.name} {random.choice(tricks)}") 

# dog1 = PetDog("Rex", 3, 20)
# dog2 = PetDog("Bella", 5, 15)
# dog3 = PetDog("Max", 2, 25)

# dog1.train()          
# dog1.play(dog1, dog2, dog3)  
# dog1.do_a_trick()     
# dog2.do_a_trick()    

#==================================
#***********************
#==================================






class Dog:
    def __init__(self,name,age,weight):
        self.name=name
        self.age=age
        self.weight=weight

    def bark(self):
        return f"{self.name} is barking"
    def run_speed(self):
        return self.weight/self.age*10
    def fight(self,other_dog):
        if self.run_speed()*self.weight>other_dog.run_speed()*other_dog.weight:
            print(f"the winner is : {self.name}")
        else:
            print(f"the winner is : {other_dog.name}")

dog1=Dog("dog1",5,1)
dog2=Dog("dog2",13,2)
dog3=Dog("dog3",15,2)
dog1.bark()
dog2.run_speed()
dog3.run_speed()
dog2.fight(dog1)





#Exercise 4 : Family
class Family:
    def __init__(self,members,last_name):
        self.members=members
        self.last_name=last_name
    def born(self, **kwargs):
        self.members.append(kwargs)
    
    def is_18(self, name):
        for member in self.members:
            if member['name'] == name:
                return member['age'] >= 18
        print(f"No family member named {name} found.")
        return False

    def family_presentation(self):
        print(f"\nFamily: {self.last_name}")
        print("Members:")
        for member in self.members:
            print(f"  Name: {member['name']}, Age: {member['age']}, Gender: {member['gender']}, Is Child: {member['is_child']}")
        print("-"*30)

a = Family(
    last_name="Smith",
    members=[
        {'name':'Michael','age':35,'gender':'Male','is_child':False},
        {'name':'Sarah','age':32,'gender':'Female','is_child':False}
    ]
)
a.born(name='John', age=10, gender='Male', is_child=True)
a.family_presentation()
print(a.is_18('Michael'))
print(a.is_18('John'))




#Exercise 5 : TheIncredibles Family
#=================================
#*************************
#================================

# class TheIncredibles(Family):
#     def use_power(self, name):
#         for member in self.members:
#             if member['name'] == name:
#                 if self.is_18(name):
#                     print(f"{name}'s power: {member['power']}")
#                 else:
#                     print(f"{name} is not over 18 years old and cannot use their power!")
#                 return
#         print(f"No member named {name} found.")

#     def incredible_presentation(self):
#         print("\n*Here is our powerful family*")
#         super().family_presentation()
# members = [
#     {'name':'Michael','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
#     {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
# ]

# the_incredibles = TheIncredibles(last_name="Incredibles", members=members)
# the_incredibles.incredible_presentation()
# the_incredibles.born(name="Baby Jack", age=0, gender="Male", is_child=True, power="Unknown Power", incredible_name="BabyJack")
# the_incredibles.incredible_presentation()
# the_incredibles.use_power("Michael")  
# the_incredibles.use_power("Baby Jack") 
#================================
#*************************
#================================