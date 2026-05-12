# API Contract

Base Backend:
http://127.0.0.1:8000

Endpoints:

GET /
Returns backend health status

GET /detect
Returns detected objects

Example Response:
{
"objects": [
{
"label": "person",
"confidence": 0.94
}
]
}

GET /alerts
Returns generated alerts

GET /analytics
Returns detection statistics

POST /assistant
Handles AI assistant queries

Rules:

* All responses must use JSON
* Frontend must not alter API formats
* Backend must preserve endpoint consistency
