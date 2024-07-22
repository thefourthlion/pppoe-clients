import requests
from requests.auth import HTTPBasicAuth
import json
from datetime import datetime
import urllib.parse

# Replace these with your actual username and password
username = 'everett'
password = 'Pemdas?!0101'

# URL for the API call to get active PPPoE clients
get_pppoe_clients = 'https://192.168.0.61/rest/ppp/active'

# URL for the API call to post data to the database
post_url = 'http://localhost:4001/api/pppoe/create'

# Get the current time
current_time = datetime.now()

# Format the time as "mm/dd/yy HH:MM"
timestamp = current_time.strftime("%m/%d/%y %H:%M")

# Make the GET request with basic authentication
response = requests.get(get_pppoe_clients, auth=HTTPBasicAuth(username, password), verify=False)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()

    # Collect all clients
    clients = []

    # Loop through each entry and extract required fields
    for entry in data:
        client = {
            'username': entry.get('name'),
            'ip': entry.get('address'),
            'uptime': entry.get('uptime')
        }
        clients.append(client)

    # Get MikroTik name
    get_identity = 'https://192.168.0.61/rest/system/identity'
    response_identity = requests.get(get_identity, auth=HTTPBasicAuth(username, password), verify=False)
    if response_identity.status_code == 200:
        data_identity = response_identity.json()
        mikrotik_name = data_identity['name']
    else:
        mikrotik_name = "Unknown"
        
    # Prepare data to post
    post_data = {
        'label': mikrotik_name,
        'mikrotikName': mikrotik_name,
        'clients': clients,
        'timestamp': timestamp
    }
    
    # Print the data
    print(f'🔵{mikrotik_name} {json.dumps(post_data, indent=4)}')
    
    # Check if db for router already exists
    encoded_mikrotik_name = urllib.parse.quote(mikrotik_name)
    check_database_for_identity = f'http://localhost:4001/api/pppoe/read/mikrotikName/{encoded_mikrotik_name}'
    print(f'🔵 Checking database for identity: {check_database_for_identity}')
    response_database_for_identity = requests.get(check_database_for_identity, verify=False)
    
    # Print raw response text for debugging
    print(f'🔵 Raw response text: {response_database_for_identity.text}')
    
    # Check if response is OK and not empty
    if response_database_for_identity.status_code == 200 and response_database_for_identity.text.strip():
        try:
            data_database_for_identity = response_database_for_identity.json()
            mikrotik_name_from_db = data_database_for_identity['mikrotikName']
            id_from_db = data_database_for_identity['_id']
            if mikrotik_name == mikrotik_name_from_db:
                print(f'🟡 {mikrotik_name_from_db} is already in db')
                edit_url = f'http://localhost:4001/api/pppoe/update/{id_from_db}'
                
                # Make the POST request to edit the database
                post_response = requests.post(edit_url, json=post_data)
                print("🟡 Editing DB")
            else:
                # This should not happen based on current logic, but handle it just in case
                print("🔴 Mismatch in database response")
        except json.JSONDecodeError as e:
            print(f'🔴 JSON decode error: {e.msg}')
    else:
        # Response is empty or not OK, create new entry
        post_response = requests.post(post_url, json=post_data)
        print("🟢 Creating DB")
        
    # Check if the POST request was successful
    if post_response.status_code == 200:
        print('🟢 Successfully posted data')
    else:
        print(f'🔴 Failed to post data: {post_response.status_code} - {post_response.text}')
else:
    # Print the error code and message
    print(f'Error: {response.status_code} - {response.text}')
