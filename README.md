# Yojna.ai - Government Scheme Eligibility Checker

A web application that helps users check their eligibility for various Indian government schemes based on their personal profile.

## Features

- **User-friendly Form**: Collect user information including name, date of birth, income, occupation, and gender
- **AI-powered Eligibility Check**: Backend API that determines scheme eligibility based on user profile
- **Dynamic Results Display**: Real-time results display with personalized recommendations
- **Responsive Design**: Modern, mobile-friendly interface with purple gradient theme

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python Flask API
- **Styling**: Custom CSS with CSS Variables and Flexbox/Grid layouts
- **Fonts**: Google Fonts (Inter, Calistoga, JetBrains Mono)

## Project Structure

```
prenew/
├── index.html          # Hero page with eligibility form
├── result.html         # Results display page
├── index.css          # Styles for index.html
├── result.css         # Styles for result.html
├── script.js          # Frontend JavaScript logic
├── app.py             # Flask backend API
├── requirements.txt   # Python dependencies
└── README.md          # This file
```

## Setup Instructions

### Backend Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Flask backend:**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Start a local web server for the frontend:**
   ```bash
   # Using Python's built-in server
   python -m http.server 8000

   # Or using any other web server
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:8000/index.html
   ```

## API Endpoints

### POST /api/check-eligibility
Check user eligibility for government schemes.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "dob": "1990-01-01",
  "familyIncome": "250000",
  "occupation": "Teacher",
  "gender": "male"
}
```

**Response:**
```json
{
  "schemes": [
    {
      "id": 1,
      "title": "Pradhan Mantri Awas Yojana",
      "description": "Housing assistance for low-income families...",
      "status": "High Match"
    }
  ],
  "user_profile": {...},
  "total_schemes": 1
}
```

### GET /api/health
Health check endpoint.

## Government Schemes Included

1. **Pradhan Mantri Awas Yojana** - Housing assistance
2. **Ayushman Bharat** - Health insurance
3. **MGNREGA** - Rural employment guarantee
4. **Pradhan Mantri Jan Dhan Yojana** - Financial inclusion
5. **Mid-Day Meal Scheme** - School nutrition program

## Eligibility Logic

The backend uses the following criteria to determine eligibility:

- **Income-based**: Different schemes have different income thresholds
- **Occupation-based**: Some schemes are specific to certain occupations (e.g., farmers for MGNREGA)
- **Status levels**:
  - **High Match**: User meets criteria comfortably
  - **Eligible**: User meets minimum criteria
  - **Potential Match**: User might be eligible with additional verification
  - **Not Eligible**: User doesn't meet criteria

## Development

### Running in Development Mode

1. **Backend**: `python app.py` (runs with debug=True)
2. **Frontend**: `python -m http.server 8000`

### CORS Configuration

The Flask backend includes CORS headers to allow frontend requests from different ports during development.

## Deployment

### Backend Deployment
- Deploy the Flask app to services like Heroku, AWS, or DigitalOcean
- Update the API endpoint in `script.js` to point to your deployed backend

### Frontend Deployment
- Deploy static files to services like Netlify, Vercel, or GitHub Pages
- Ensure the API calls point to the correct backend URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is open source and available under the MIT License.