import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import StandardScaler, LabelEncoder

class DeliveryTimeEstimationTool:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.features = ['distance', 'package_size', 'day_of_week', 'location', 'weather_condition', 'delivery_service']
        self.target = 'delivery_time'
        self.data = None
        self.accuracy_history = []
        self.feature_names_ = self.features
        self.day_mapping = {
            'monday': 0, 'tuesday': 1, 'wednesday': 2, 'thursday': 3,
            'friday': 4, 'saturday': 5, 'sunday': 6
        }
        self.package_size_mapping = {
            'small': 1, 'medium': 2, 'large': 3, 'extra large': 4
        }
        self.location_encoder = None
        self.weather_condition_encoder = None
        self.delivery_service_encoder = None

    def load_data(self, data):
        self.data = data
        print("Data loaded successfully.")

    def preprocess_data(self):
        if self.data is None:
            raise ValueError("No data loaded. Please load data first.")

        # Convert package_size to numeric if it's not already
        if self.data['package_size'].dtype == 'object':
            self.data['package_size'] = self.data['package_size'].astype(int)

        # Ensure package_size is within 1-4 range
        self.data['package_size'] = self.data['package_size'].clip(1, 4)

        # Encode categorical variables
        categorical_features = ['location', 'weather_condition', 'delivery_service']
        for feature in categorical_features:
            if feature not in self.data.columns:
                raise ValueError(f"Missing required column: {feature}")
            encoder = LabelEncoder()
            self.data[feature] = encoder.fit_transform(self.data[feature])
            setattr(self, f"{feature}_encoder", encoder)

        # Fit and transform the scaler only on the features
        self.data[self.features] = self.scaler.fit_transform(self.data[self.features])

    def train_model(self):
        if self.data is None:
            raise ValueError("No data loaded. Please load data first.")

        X = self.data[self.features]
        y = self.data[self.target]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.model.fit(X_train, y_train)

        # Calculate accuracy
        y_pred = self.model.predict(X_test)
        accuracy = 1 - mean_absolute_error(y_test, y_pred) / np.mean(y_test)
        self.accuracy_history.append(accuracy)

        print(f"Model trained. Current accuracy: {accuracy:.2%}")

    def predict_delivery_time(self, distance, package_size, day_of_week, location, weather_condition, delivery_service):
        if not self.is_model_trained():
            raise ValueError("Model not trained. Please upload data and train the model first.")

        # Convert day_of_week to integer if it's a string
        if isinstance(day_of_week, str):
            day_of_week = self.day_mapping.get(day_of_week.lower())
            if day_of_week is None:
                raise ValueError("Invalid day of week. Please use Monday, Tuesday, etc.")

        # Convert package_size to integer if it's a string
        if isinstance(package_size, str):
            package_size = self.package_size_mapping.get(package_size.lower())
            if package_size is None:
                raise ValueError("Invalid package size. Please use Small, Medium, Large, or Extra Large.")

        # Validate inputs
        if not isinstance(distance, (int, float)) or distance <= 0:
            raise ValueError("Distance must be a positive number.")
        if not isinstance(package_size, int) or package_size < 1 or package_size > 4:
            raise ValueError("Invalid package size.")
        if not isinstance(day_of_week, int) or day_of_week < 0 or day_of_week > 6:
            raise ValueError("Day of week must be an integer between 0 and 6.")

        # Encode categorical variables
        location_encoded = self.location_encoder.transform([location])[0]
        weather_condition_encoded = self.weather_condition_encoder.transform([weather_condition])[0]
        delivery_service_encoded = self.delivery_service_encoder.transform([delivery_service])[0]

        input_data = pd.DataFrame([[distance, package_size, day_of_week, location_encoded, weather_condition_encoded, delivery_service_encoded]], 
                                  columns=self.features)
        input_data_scaled = self.scaler.transform(input_data)
        prediction = self.model.predict(input_data_scaled)[0]

        return round(prediction, 2)

    def is_model_trained(self):
        return self.model is not None and self.data is not None