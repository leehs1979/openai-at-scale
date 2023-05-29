import os
import json
from dotenv import load_dotenv
from datetime import datetime

# For Object Storage
import logging
import boto3
from botocore.exceptions import ClientError

## Read environment variables
env_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(env_path, verbose=True, override=True)

# os 환경변수로 사용시 
endpoint = os.environ.get("SCP_OBJECTSTORAGE_URL") or None
access_key = os.environ.get("SCP_OBJECTSTORAGE_ACCESS_KEY") or None 
secret_key = os.environ.get("SCP_OBJECTSTORAGE_SECRET_KEY") or None
location = os.environ.get("SCP_OBJECTSTORAGE_LOCATION") or None
bucket_name = os.environ.get("SCP_OBJECTSTORAGE_BUCKET_NAME") or None

# For Test : TODO: 환경변수처리(위)
endpoint = "https://obj1.kr-west-1.samsungsdscloud.com:8443"
access_key = "16f7f8f97ba9bc62b5b1"
secret_key = "f69040add6a7a0a8af1aa889"
location = "KR-WEST-1"
bucket_name = "scpchatgptdemo" # 생성되어 있는 Bucket

# Replace with your own values if you are changing the default document structure
class chat_log_result:
    def __init__(self,is_err,err_msg):
        self.is_err = is_err
        self.err_msg = err_msg
        

def insert_chat_log(chat_message) -> chat_log_result:
     chat_log_inserted = False 
     err_message = ""
     
     if endpoint is not None and access_key is not None and secret_key is not None and location is not None and bucket_name is not None:
        try:
             # SCP Object Storage Connect
             scp_obs_session = boto3.Session(aws_access_key_id=access_key,
                           aws_secret_access_key=secret_key,
                           region_name=location)
             scp_obs_client = scp_obs_session.client('s3', endpoint_url=endpoint)
             
             # Create Logfile to upload
             file_name = datetime.now().strftime("%Y%m%d_%H%M%S")+'@'+chat_message['user']['user_id']
             file_path = os.path.join('.', 'chat_log','logs', file_name)
             with open(file_path, 'w') as outfile:
               json.dump(chat_message, outfile, indent=4)             
             
             ## Upload the log to SCP Object Storage
             try:
             
               object_name = file_name
               with open(file_path, "rb") as f:
                  scp_obs_client.upload_fileobj(f, bucket_name, object_name)                    

             except ClientError as err:
               print(err.message)
               chat_log_inserted = True
               err_message = err_message + err.message + " ::: " 
             except:
               msg = "Unknown Error!!"
               chat_log_inserted = True
               print(msg)          
               err_message = err_message + msg + " ::: "                
    
        except ClientError as err:
             err_message = err_message + err.message + " ::: " 
             chat_log_inserted = True
             print(err.message)

     else:
        msg = "Cannot initiate connection as one of the environment variables is empty - SCP_OBJECTSTORAGE_URL, SCP_OBJECTSTORAGE_ACCESS_KEY, SCP_OBJECTSTORAGE_SECRET_KEY, SCP_OBJECTSTORAGE_LOCATION, SCP_OBJECTSTORAGE_BUCKET_NAME"
        chat_log_inserted = True
        print(msg)
        err_message = err_message + msg + " ::: "
     chat_log_res = chat_log_result(is_err=chat_log_inserted,err_msg=err_message)
     return chat_log_res

      
