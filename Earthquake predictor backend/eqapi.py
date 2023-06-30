from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import json
app = FastAPI()

class earthquake_input(BaseModel):
    latitude : float
    longitude :float
    
earthquake_model = pickle.load(open('./earthquakeKnn_model.sav', 'rb'))

origins = [
    "http://localhost:3000",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post('/earthquake_prediction')
def earthquake_predd(input_parameters: earthquake_input):
    lat = input_parameters.latitude
    long = input_parameters.longitude

    input_list = [lat, long]

    predicted_magnitude = earthquake_model.predict([input_list])
    classification = {
        'Micro': (0.0, 3.0),
        'Minor': (3.0, 4.0),
        'Light': (4.0, 5.0),
        'Moderate': (5.0, 6.0),
        'Strong': (6.0, 7.0),
        'Major': (7.0, 8.0),
        'Great': (8.0, float('inf'))
    }

    magnitude_category = None

    for category, (lower, upper) in classification.items():
        if lower <= predicted_magnitude < upper:
            magnitude_category = category
            break

    message = f"Based on our analysis, the predicted magnitude for your location is {predicted_magnitude} on the Richter scale.\n\n"
    response = {
        'message': message
    }
    return response



