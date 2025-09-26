from menu_item import MenuItem
from menu_manager import MenuManager


def show_user_menu():
    print("\n====== Restaurant Menu Manager ======")
    print("(V) View an Item")
    print("(A) Add an Item")
    print("(D) Delete an Item")
    print("(U) Update an Item")
    print("(S) Show the Menu")
    print("(E) Exit")
    choice = input("Enter your choice: ").upper()

    if choice == "V":
        view_item()
    elif choice == "A":
        add_item_to_menu()
    elif choice == "D":
        remove_item_from_menu()
    elif choice == "U":
        update_item_from_menu()
    elif choice == "S":
        show_restaurant_menu()
    elif choice == "E":
        print("Goodbye! Final menu:")
        show_restaurant_menu()
        exit()
    else:
        print("Invalid choice, please try again.")


def add_item_to_menu():
    name = input("Enter item name: ")
    price = int(input("Enter item price: "))
    item = MenuItem(name, price)
    item.save()
    print(f"{name} was added successfully.")


def remove_item_from_menu():
    name = input("Enter item name to delete: ")
    item = MenuItem(name, 0)
    found = MenuManager.get_by_name(name)
    if found is None:
        print("Error: item not found.")
    else:
        item.delete()
        print(f"{name} was deleted successfully.")


def update_item_from_menu():
    old_name = input("Enter current item name: ")
    old_item = MenuManager.get_by_name(old_name)

    if old_item is None:
        print("Error: item not found.")
        return

    new_name = input("Enter new item name: ")
    new_price = int(input("Enter new item price: "))
    item = MenuItem(old_name, old_item[2])  # old price from DB row
    item.update(new_name, new_price)
    print(f"{old_name} was updated to {new_name} ({new_price}).")


def show_restaurant_menu():
    items = MenuManager.all_items()
    print("\n====== Restaurant Menu ======")
    for item in items:
        print(f"{item[1]} - ${item[2]}")


# main loop
while True:
    show_user_menu()
