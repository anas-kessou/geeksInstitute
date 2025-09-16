#Exercise 1: Cats
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age


cat1 = Cat("Biiii", 1)
cat2 = Cat("Boooo", 2)
cat3 = Cat("Baaaa", 3)

print(f"{cat1.name} is {cat1.age} years old.")
print(f"{cat2.name} is {cat2.age} years old.")
print(f"{cat3.name} is {cat3.age} years old.")

def oldest_cat(cat1, cat2, cat3):
    cat =max(cat1.age, cat2.age, cat3.age)
   
    if cat == cat1.age:
        cat_name = cat1.name
    elif cat == cat2.age:
        cat_name = cat2.name
    else: 
        cat_name = cat3.name
    return cat_name, cat
print(f"The oldest cat is {oldest_cat(cat1, cat2, cat3)[0]}, and is {oldest_cat(cat1, cat2, cat3)[1]} years old.")




#Exercise 2 : Dogs
class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height
    
    def bark(self):
        print(f"{self.name} goes woof!")
    
    def jump(self):
        print(f"{self.name} jumps {self.height * 2} cm high!")
    

davids_dog=Dog("Rex", 50)
davids_dog.bark()
davids_dog.jump()
sarahs_dog=Dog("Teacup", 20)
sarahs_dog.bark()
sarahs_dog.jump()
if davids_dog.height > sarahs_dog.height:
    print(f"{davids_dog.name} is bigger than {sarahs_dog.name}")
else:
    print(f"{sarahs_dog.name} is bigger than {davids_dog.name}")



# Exercise 3 : Who’s the song producer?
class Song:
    def __init__(self,lyrics):
        self.lyrics = lyrics
    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

stairway= Song(["There’s a lady who's sure","all that glitters is gold", "and she’s buying a stairway to heaven"])
stairway.sing_me_a_song()
    


#Exercise 4 : Afternoon at the Zoo
class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []
    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
        else:
            print(f"{new_animal} is already in the zoo.")
    def get_animals(self):
        for animal in self.animals:
            print(animal)
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
        else:
            print(f"{animal_sold} is not in the zoo.")
    def sort_animals(self):
        self.animals.sort()
        for i in range(len(self.animals)):
            if i == 0 or self.animals[i] != self.animals[i - 1]:
                print(self.animals[i])
    def get_groups(self):
        groups = {}
        for animal in self.animals:
            if animal[0] not in groups:
                groups[animal[0]] = [animal]
            else:
                groups[animal[0]].append(animal)
        return groups

new_york_zoo = Zoo("New York Zoo")
new_york_zoo.add_animal("Lion")
new_york_zoo.add_animal("Bear")
new_york_zoo.add_animal("Baboon")
new_york_zoo.add_animal("Tiger")
new_york_zoo.add_animal("Elephant")
new_york_zoo.add_animal("Giraffe")
new_york_zoo.add_animal("Lion")
new_york_zoo.get_animals()
new_york_zoo.sell_animal("Tiger")
new_york_zoo.sort_animals()
print(new_york_zoo.get_groups())
        