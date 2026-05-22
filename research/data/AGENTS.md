# raw_files:

The raw_files directory contains raw captured data from the testbed, including both network
traffic (PCAP files) and sensor data (JSON files). It includes benign and attack scenarios, where
each set of files is time-synchronized so that network packets and sensor readings can be
accurately matched using timestamps.

The raw_files directory contains two subdirectories:
- attack_data
  - Raw captured network traffic in PCAP format during different attack scenarios.
  - Sensor data collected simultaneously from the testbed devices in JSON format.
  - Both PCAP and JSON files are time-aligned, allowing packets and sensor events to be correlated through timestamps.
  - Each attack scenario targets one or more devices depending on the nature of the attack.
  - File names follow the pattern: {data_type}{attack_category}{attack_name}_{target_device}
  - Example:
    - attack_web_backdoor-upload_edge1
    - Category: web attacks
    - Attack name: backdoor-upload
    - Target device: edge
  - Both pcap and .json files follow the same pattern and for each pcap a json file with

the same name exists that show the sensor data for that specific scenario.
- benign_data
  - Raw captured network traffic in PCAP format during normal (benign) operation of
the testbed.
  - Sensor data collected simultaneously from the testbed devices in JSON format.
  - Files are also time-synchronized, providing a consistent baseline for comparison against attack scenario
