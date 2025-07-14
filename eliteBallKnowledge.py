from gpt_request import expand_sentence 

def main():
    print("Welcome to Elite Ball Knowledge!")
    userInput = getInput()
    expanded = expand_sentence(userInput)
    print("\n Rephrased in a professional tone: \n", expanded)


def getInput():
    user_input = input("Please enter your query: ")
    return user_input

if __name__ == "__main__":
    main()