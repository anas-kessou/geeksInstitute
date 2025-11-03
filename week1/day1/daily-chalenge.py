#Challenge 1
number = int(input("Enter a number: "))
length = int(input("Enter a length: "))
result = []
for i in range(length):
    result.append(number*(i+1))
print(result)



#Challenge 2
word = input("Enter a word: ")
result = ""  
if word != "":
    result = word[0] 
    for i in range(1, len(word)):
        if word[i] != word[i - 1]:
            result += word[i]
print("Result:", result)

