#Mini-project: Rock, Paper, Scissors

#======================================================
#***************_____   game.py  _____*****************
#======================================================
import random
class Game:
  
    def __init__(self):
        self.choices = ['r', 'p', 's']
    
    def get_user_item(self):
        while True:
            user_item=input("Please enter your choice (r)ock, (p)aper, or (s)cissors:")
            if user_item in self.choices:

                return user_item
    
    def get_computer_item(self):
        return random.choice(self.choices)
    
    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        elif (user_item == "r" and computer_item == "s") or (user_item == "p" and computer_item == "r") or (user_item == "s" and computer_item == "p"):
            return "win"
        else:
            return "lose"
    
    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)
        print(f"You selected {user_item}, the computer selected {computer_item}. You {result}!")
        return result




#rock-paper-scissors.py
#======================================================
#*************___rock-paper-scissors.py___*************
#======================================================



# #from MiniProject-RockPaperScissors import Game
def get_user_menu_choice():
    print("\n Menu \n (g) Play a new game \n (x) Show scores and exit ")
    choice = input("Choice : ")
    print("\n")
    if choice == "g":
        return "g"
    elif choice == "x":
        return "x"
    else:
        print("Invalid choice. Please try again.")
    
def print_results(results):
    print("\n===========================")
    print("--------Game Results--------")
    print(f"win: {results["win"]} , loss: {results["lose"]} , draw: {results["draw"]}")
    print("Thank you for playing!")
    print("===========================\n")

def main():
    results = {"win": 0, "lose": 0, "draw": 0}
    while True:
        choice = get_user_menu_choice()
        if choice == "x":
            print_results(results)
            break
        elif choice == "g":
            game = Game()
            result = game.play()
            results[result] += 1
            print_results(results)
            

main()


#====================================
#************************************
#====================================