#Exercise 1 : Convert lists into dictionaries
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

print(dict(zip(keys, values)))



#Exercise 2 : Cinemax #2
family = {"rick": 43, "beth": 13, "morty": 5, "summer": 8}
total_cost = 0 
for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    print(f"{name.capitalize()} has to pay {price}")
    total_cost += price
print(f"Total cost for the family: {total_cost}")

print("-"*50)

family = {}
total_cost = 0
n = int(input("How many family members? "))
for i in range(n):
    name = input(f"Enter the name of member {i+1}: ")
    age = int(input(f"Enter the age of {name}: "))
    family[name] = age
for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15

    print(f"{name.capitalize()} has to pay {price}")
    total_cost += price
print(f"Total cost for the family: {total_cost}")


#Exercise 3: Zara
# 1. 
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

# 2.
brand["number_stores"] = 2

# 3. 
print(f"Zara's clients are: {', '.join(brand['type_of_clothes'])}")

# 4.
brand["country_creation"] = "Spain"

# 5. 
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

# 6. 
del brand["creation_date"]

# 7. 
print("Last international competitor:", brand["international_competitors"][-1])

# 8. 
print("Major colors in the US:", brand["major_color"]["US"])

# 9.
print("Number of key-value pairs:", len(brand))

# 10. 
print("Keys of the dictionary:", list(brand.keys()))

# 11. 
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}

# 12. 
brand.update(more_on_zara)

# 13. 
print("Updated number of stores:", brand["number_stores"])





# Exercise 4 : Some Geography
def describe_city(city, country="Spain"):
    print(f"{city} is in {country}.")
describe_city("Reykjavik", "Iceland")
describe_city("Madrid") 
describe_city("Barcelona") 



#Exercise 5 : Random
import random
def guess_number(user_number):
    if user_number < 1 or user_number > 100:
        print("Please enter a number between 1 and 100.")
        return
    random_number = random.randint(1, 100)
    if user_number == random_number:
        print(f"Success! Both numbers are {user_number}.")
    else:
        print(f"Fail! You chose {user_number}, but the random number was {random_number}.")
guess_number(50)
guess_number(10)




#Exercise 6 : Let’s create some personalized shirts !
def make_shirt(size="Large", message="I love Python"):
    print(f"The size of the shirt is {size} and the text is '{message}'.")
make_shirt()
make_shirt(size="Medium")
make_shirt(size="Small", message="Code > Sleep")
make_shirt(message="Debugging is fun!", size="XL")


#Exercise 7 : Temperature Advice
import random

def get_random_temp(season):
    if season == "winter":
        temp = random.uniform(-10, 16)  
    elif season == "spring":
        temp = random.uniform(10, 23) 
    elif season == "summer":
        temp = random.uniform(24, 40)   
    elif season == "autumn" or season == "fall":
        temp = random.uniform(5, 20)   
    else:
        temp = random.uniform(-10, 40) 
    return round(temp, 1)  

def main():
    # Bonus
    month = int(input("Enter the month number (1 = Jan, 12 = Dec): "))
    if month in [12, 1, 2]:
        season = "winter"
    elif month in [3, 4, 5]:
        season = "spring"
    elif month in [6, 7, 8]:
        season = "summer"
    elif month in [9, 10, 11]:
        season = "autumn"
    else:
        print("Invalid month! Defaulting to random season.")
        season = None
    temperature = get_random_temp(season)
    print(f"The temperature right now is {temperature}°C.")
    if temperature < 0:
        print("Brrr, that’s freezing! Wear some extra layers today ")
    elif 0 <= temperature <= 16:
        print("Quite chilly! Don’t forget your coat ")
    elif 17 <= temperature <= 23:
        print("Nice and cool — perfect weather for a walk ")
    elif 24 <= temperature <= 32:
        print("It's warm outside — grab some sunglasses ")
    else:
        print("It's really hot! Stay hydrated ")
main()




# Exercise 8 : Star Wars Quiz

data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]
def play_quiz():
    correct = 0
    wrong = 0
    wrong_answers = []
    for item in data:
        user_answer = input(f"{item['question']} ").strip()
        if user_answer.lower() == item["answer"].lower():
            print("Correct!\n")
            correct += 1
        else:
            print(f"Wrong! The correct answer was: {item['answer']}\n")
            wrong += 1
            wrong_answers.append({
                "question": item["question"],
                "your_answer": user_answer,
                "correct_answer": item["answer"]
            })
    return correct, wrong, wrong_answers
def show_results(correct, wrong, wrong_answers):
    print("\n--- Quiz Results ---")
    print(f"Correct answers: {correct}")
    print(f"Wrong answers: {wrong}")
    # Bonus: 
    if wrong_answers:
        print("\nYou got these questions wrong:\n")
        for wa in wrong_answers:
            print(f"❓ {wa['question']}")
            print(f"   Your answer: {wa['your_answer']}")
            print(f"   Correct answer: {wa['correct_answer']}\n")
def main():
    while True:
        correct, wrong, wrong_answers = play_quiz()
        show_results(correct, wrong, wrong_answers)
        if wrong > 3:
            print("You had more than 3 wrong answers. Let's try again!\n")
            retry = input("Do you want to play again? (yes/no): ").strip().lower()
            if retry != "yes":
                print("Thanks for playing! May the Force be with you. ")
                break
            else:
                print("Great job! You know your Star Wars trivia!")
                break
main()

