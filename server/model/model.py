import numpy as np
import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle

train = pd.read_csv(os.getcwd() + "/server/dataset/Training.csv")
test = pd.read_csv(os.getcwd() + "/server/dataset/Testing.csv")


P = train[["prognosis"]]
X = train.drop(["prognosis"], axis=1)
Y = test.drop(["prognosis"], axis=1)

xtrain, xtest, ytrain, ytest = train_test_split(X, P, test_size=0.2, random_state=42)

rf = RandomForestClassifier(random_state=42)
model_rf = rf.fit(xtrain, ytrain)
tr_pred_rf = model_rf.predict(xtrain)
ts_pred_rf = model_rf.predict(xtest)

print("training accuracy is:", accuracy_score(ytrain, tr_pred_rf))
print("testing accuracy is:", accuracy_score(ytest, ts_pred_rf))

print(model_rf.predict(Y))
pickle.dump(model_rf, open("model.pkl", "wb"))
