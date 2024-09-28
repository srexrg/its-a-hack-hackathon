from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from io import StringIO
import traceback
from model import DeliveryTimeEstimationTool
import openai

app = FastAPI()

# Load your OpenAI API key
openai.api_key = "your-openai-api-key"

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the DeliveryTimeEstimationTool
tool = DeliveryTimeEstimationTool()

class PredictionInput(BaseModel):
    distance: float
    package_size: str
    day_of_week: str
    location: str
    weather_condition: str
    delivery_service: str

@app.post("/upload-data")
async def upload_data(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")

    try:
        contents = await file.read()
        df = pd.read_csv(StringIO(contents.decode("utf-8")))

        # Convert date to datetime and extract day_of_week
        df['date'] = pd.to_datetime(df['date'], format='%m-%d-%Y')
        df['day_of_week'] = df['date'].dt.dayofweek

        # Use courier_company as delivery_service
        df['delivery_service'] = df['courier_company']

        # Use city as location
        df['location'] = df['city']

        # Ensure all required columns are present
        required_columns = ['distance', 'package_size', 'day_of_week', 'location', 'weather_condition', 'delivery_service', 'delivery_time']
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            raise ValueError(f"Missing required columns: {', '.join(missing_columns)}")

        tool.load_data(df)
        tool.preprocess_data()
        tool.train_model()

        return {"message": "Data uploaded and model trained successfully"}
    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="The uploaded file is empty")
    except pd.errors.ParserError as e:
        raise HTTPException(status_code=400, detail=f"Unable to parse the CSV file: {str(e)}")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred while processing the file: {str(e)}")

@app.post("/predict")
async def predict(input_data: PredictionInput):
    if not tool.is_model_trained():
        raise HTTPException(
            status_code=400,
            detail="No data has been uploaded. Please upload data and train the model first.",
        )

    try:
        prediction = tool.predict_delivery_time(
            input_data.distance,
            input_data.package_size,
            input_data.day_of_week,
            input_data.location,
            input_data.weather_condition,
            input_data.delivery_service
        )
        return {"estimated_time": prediction}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}"
        )

@app.get("/unique-values")
async def get_unique_values():
    if not tool.is_model_trained():
        raise HTTPException(
            status_code=400,
            detail="No data has been uploaded. Please upload data and train the model first.",
        )
    return tool.get_unique_values()