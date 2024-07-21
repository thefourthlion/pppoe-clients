import requests
from requests.auth import HTTPBasicAuth
import json
from datetime import datetime


# Replace these with your actual username and password
username = 'everett'
password = 'Pemdas?!0101'

# URL for the API call to get active PPPoE clients
get_pppoe_clients = 'https://192.168.0.61/rest/ppp/active'

get_identity = 'https://192.168.0.61/rest/system/identity'

# URL for the API call to post data to the database
post_url = 'http://localhost:4001/api/pppoe/create'

# Get the current time
current_time = datetime.now()

# Format the time as "mm/dd/yy HH:MM"
timestamp = current_time.strftime("%m/%d/%y %H:%M")

# Make the GET request with basic authentication
response = requests.get(get_pppoe_clients, auth=HTTPBasicAuth(username, password), verify=False)

index = 0

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()

    # Loop through each entry, extract required fields, print the data, and post to the database
    for entry in data:
        name = entry.get('name')
        address = entry.get('address')
        uptime = entry.get('uptime')
        
        # Prepare data to post
        post_data = {
            'name': name,
            'ip': address,
            'uptime': uptime,
            'timestamp':timestamp
        }

        # Print the data
        print(f'Name: {name}, Address: {address}, Uptime: {uptime}, Timestamp: {timestamp} , Index: {index}')

        # # Make the POST request to the database
        # post_response = requests.post(post_url, json=post_data)

        # # Check if the POST request was successful
        # if post_response.status_code == 201:
        #     print(f'Successfully posted data for {name}')
        # else:
        #     print(f'Failed to post data for {name}: {post_response.status_code} - {post_response.text}')
        
        index = index + 1
else:
    # Print the error code and message
    print(f'Error: {response.status_code} - {response.text}')