# import os
# os.environ["TRANSFORMERS_NO_ADVISORY_WARNINGS"] = "true"
# os.environ["TRANSFORMERS_VERBOSITY"] = "error"
# import torch
# import torch.nn as nn
# from torchvision import transforms
# from PIL import Image
# import sys
# import json
# import requests
# from io import BytesIO
# from transformers import ViTModel
# import warnings
# import logging
# from pymongo import MongoClient
# import os

# # Suppress warnings globally
# warnings.filterwarnings("ignore", category=UserWarning, message="Some weights of ViTModel were not initialized")

# # Suppress logging for transformers
# logging.getLogger("transformers").setLevel(logging.ERROR)

# # Labels
# damage_labels = ['Alligator Crack', 'Longitudinal Crack', 'No Damage', 'Pothole', 'Transverse Crack']
# severity_labels = ['Low', 'Moderate', 'Severe', 'nan']

# # MongoDB (Optional - can be used if you want to store directly from here)
# client = MongoClient("mongodb://localhost:27017/")
# db = client["SafeStreetDB"]
# collection = db["predictions"]

# # Define model architecture
# class MultiOutputModel(nn.Module):
#     def __init__(self, base_model, num_damage_classes, num_severity_classes):
#         super().__init__()
#         self.base_model = base_model
#         vit_feature_size = base_model.config.hidden_size
#         self.fc_damage = nn.Linear(vit_feature_size, num_damage_classes)
#         self.fc_severity = nn.Linear(vit_feature_size, num_severity_classes)

#     def forward(self, x):
#         outputs = self.base_model(x).last_hidden_state[:, 0, :]
#         damage_output = self.fc_damage(outputs)
#         severity_output = self.fc_severity(outputs)
#         return damage_output, severity_output

# # Load model (suppress the warnings during loading)
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# checkpoint_path = "C:/Users/Lenovo/OneDrive/Attachments/Desktop/SafeStreet/model/model_epoch_16.pth"

# # Suppress all print output from transformers and model loading
# with torch.no_grad():
#     base_vit = ViTModel.from_pretrained("google/vit-base-patch16-224")
#     model = MultiOutputModel(base_vit, len(damage_labels), len(severity_labels))
#     model.load_state_dict(torch.load(checkpoint_path, map_location=device))
#     model.to(device)
#     model.eval()

# # Image transformation
# transform = transforms.Compose([
#     transforms.Resize((224, 224)),
#     transforms.ToTensor(),
#     transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
# ])

# def predict_damage(image_path_or_url):
#     try:
#         # Load image from URL or path
#         if image_path_or_url.startswith("http"):
#             response = requests.get(image_path_or_url)
#             image = Image.open(BytesIO(response.content)).convert("RGB")
#         else:
#             image = Image.open(image_path_or_url).convert("RGB")
#     except Exception as e:
#         raise ValueError(f"Error loading image: {e}")

#     image = transform(image).unsqueeze(0).to(device)

#     with torch.no_grad():
#         damage_logits, severity_logits = model(image)

#     damage_probs = torch.sigmoid(damage_logits).squeeze().cpu().numpy()
#     predicted_damages = [damage_labels[i] for i in range(len(damage_probs)) if damage_probs[i] > 0.5]

#     severity_probs = torch.softmax(severity_logits, dim=1).squeeze().cpu().numpy()
#     predicted_severity = severity_labels[severity_probs.argmax()]

#     result = {
#         "typeOfDamage": predicted_damages,
#         "severity": predicted_severity,
#         "recommendedAction": "Urgent Repair" if predicted_severity == "Severe" else "Scheduled Repair"
#     }

#     return result

# # Capture the output
# def get_prediction_output(image_input):
#     result = predict_damage(image_input)
#     return json.dumps(result)

# # Run if script is executed directly
# if __name__ == "__main__":
#     if len(sys.argv) < 2:
#         print(json.dumps({"error": "Image path or URL not provided"}))
#         sys.exit(1)

#     image_input = sys.argv[1]
#     try:
#         prediction = get_prediction_output(image_input)
#         print(prediction)  # Output as JSON string
#     except Exception as e:
#         print(json.dumps({"error": str(e)}))
#         sys.exit(1)
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import sys
import json
import requests
from io import BytesIO
from transformers import ViTModel
import warnings
import logging
from pymongo import MongoClient

# Suppress warnings
warnings.filterwarnings("ignore")
logging.getLogger("transformers").setLevel(logging.ERROR)

# Labels
damage_labels = ['Alligator Crack', 'Longitudinal Crack', 'No Damage', 'Pothole', 'Transverse Crack']
severity_labels = ['Low', 'Moderate', 'Severe', 'nan']

# MongoDB setup (optional)
client = MongoClient("mongodb://localhost:27017/")
db = client["SafeStreetDB"]
collection = db["predictions"]

# Define the model
class MultiOutputModel(nn.Module):
    def __init__(self, base_model, num_damage_classes, num_severity_classes):
        super().__init__()
        self.base_model = base_model
        vit_feature_size = base_model.config.hidden_size
        self.fc_damage = nn.Linear(vit_feature_size, num_damage_classes)
        self.fc_severity = nn.Linear(vit_feature_size, num_severity_classes)

    def forward(self, x):
        outputs = self.base_model(x).last_hidden_state[:, 0, :]
        damage_output = self.fc_damage(outputs)
        severity_output = self.fc_severity(outputs)
        return damage_output, severity_output

# Load model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
checkpoint_path = "C:/Users/Lenovo/OneDrive/Attachments/Desktop/SafeStreet/model/model_epoch_16.pth"

with torch.no_grad():
    base_vit = ViTModel.from_pretrained("google/vit-base-patch16-224")
    model = MultiOutputModel(base_vit, len(damage_labels), len(severity_labels))
    model.load_state_dict(torch.load(checkpoint_path, map_location=device))
    model.to(device)
    model.eval()

# Image transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])

# Prediction function
def predict_damage(image_path_or_url):
    try:
        if image_path_or_url.startswith("http"):
            headers = {'User-Agent': 'Mozilla/5.0'}
            response = requests.get(image_path_or_url, headers=headers, stream=True)
            try:
                image = Image.open(BytesIO(response.content)).convert("RGB")
            except Exception:
                raise ValueError("Failed to open image from URL. Make sure it's a direct image link.")
        else:
            image = Image.open(image_path_or_url).convert("RGB")
    except Exception as e:
        raise ValueError(f"Error loading image: {e}")

    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        damage_logits, severity_logits = model(image)

    damage_probs = torch.sigmoid(damage_logits).squeeze().cpu().numpy()
    predicted_damages = [damage_labels[i] for i in range(len(damage_probs)) if damage_probs[i] > 0.5]

    severity_probs = torch.softmax(severity_logits, dim=1).squeeze().cpu().numpy()
    predicted_severity = severity_labels[severity_probs.argmax()]

    result = {
        "typeOfDamage": predicted_damages,
        "severity": predicted_severity,
        "recommendedAction": "Urgent Repair" if predicted_severity == "Severe" else "Scheduled Repair"
    }

    return result

# CLI usage
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Image path or URL not provided"}))
        sys.exit(1)

    image_input = sys.argv[1]
    try:
        prediction = predict_damage(image_input)
        print(json.dumps(prediction))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
