from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
import pickle

# Mock function to simulate model training
def train_model():
    # This function should train your model and save it to a file
    # Here we just simulate a trained model
    vectorizer = CountVectorizer()
    model = MultinomialNB()
    # Normally you would fit your model here with model.fit(X_train, y_train)
    # Saving the model and vectorizer for later use
    pickle.dump(model, open('model.pkl', 'wb'))
    pickle.dump(vectorizer, open('vectorizer.pkl', 'wb'))

def load_model():
    model = pickle.load(open('model.pkl', 'rb'))
    vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))
    return model, vectorizer

if __name__ == "__main__":
    train_model()
