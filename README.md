<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">

<body>
    <header>
        <h1>Phishing Detection</h1>
    </header>
    <main>
        <form id="email-form">
            <label for="email-text">Enter email text:</label>
            <textarea id="email-text" name="email-text"></textarea>
            <button type="submit">Classify</button>
        </form>
        <div id="result-container">
            <h2>Classification Result:</h2>
            <p id="result"></p>
        </div>
    </main>
    <script src="script.js"></script>
</body>
</html>

