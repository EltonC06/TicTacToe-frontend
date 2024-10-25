## How to Run the Project

### Prerequisites

- Just a web server for front-end

**or**

- A running instance of the back-end application.
    - Preference to use the 8080 port to run the back-end.
    - Caution: Tested only using Spring Tool Suite.
- A web server for front-end (you can use Five Server extension in VS Code).

### Instructions to Run Both Server on your Own Machine

1. **Set Up the Back-End**
   - Follow the instructions in the [Tic-Tac-Toe Spring README](https://github.com/EltonC06/TicTacToeSpring/blob/main/README.md) to run the back-end application.

2. **Clone the Front-End Repository**
   ```bash
   git clone git@github.com:EltonC06/TicTacToe-frontend.git
   ```

3. **Open the Project**
   - Open the project folder in your preferred code editor.

4. **Run the Front-End**
   - Use the Five Server extension (or any other web server) to serve the front-end files.

### Note
- The `baseURL` variable is predefined to use the URL of the TicTacToe back-end server hosted on Render. You can leave it unchanged as it is already functional; simply run it using a tool like Five Server, and it should work simply.
  
- **Important:** As I am using the free plan on Render, the requests may take some time, especially initially. However, they should become a bit faster after the first few requests.

- If you prefer to run the back-end server on your own machine, please follow the instructions provided above. Don't forget to change the `baseURL` in the `.js` file to match your setup (commonly: `localhost:8080`).

## Author

Elton da Costa Oliveira

[LinkedIn](https://www.linkedin.com/in/elton-da-costa/)
