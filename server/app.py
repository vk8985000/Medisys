from flask import Flask, request, jsonify
import os
import joblib
import pandas

app = Flask(__name__)

# Load the pre-trained machine learning model
model = joblib.load(os.getcwd() + "/server/model/model.pkl")


@app.route("/predict", methods=["POST"])
def predict():
    # Get the data from the POST request
    data = request.get_json()

    df = pandas.DataFrame(data, index=[0])
    print(df)

    # Perform any necessary data preprocessing
    # ...

    # Make predictions using the loaded model
    predictions = model.predict(df)

    # Create a response dictionary
    response = {"predictions": predictions.tolist()}

    # Return the response as JSON
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
