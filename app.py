from flask import Flask, render_template, request
import model  # This imports the model.py we created

app = Flask(__name__)
clf, vectorizer = model.load_model()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        email_text = request.form['email']
        # Vectorize the email text and predict using the model
        email_vector = vectorizer.transform([email_text])
        prediction = clf.predict(email_vector)
        result = 'Phishing' if prediction[0] == 1 else 'Legitimate'
        return render_template('result.html', result=result)
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
