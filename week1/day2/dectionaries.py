#Challenge

word = input("Enter a word: ").strip()
letter_positions = {}
for index, letter in enumerate(word):
    letter = str(letter)
    if letter not in letter_positions:
        letter_positions[letter] = []
    letter_positions[letter].append(index)
print(letter_positions)
