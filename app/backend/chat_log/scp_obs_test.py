import os
import json
from dotenv import load_dotenv
from datetime import datetime

# For Object Storage
import logging
import boto3
from botocore.exceptions import ClientError


'''
API reference : S3 API 호환 가이드
URL
Public : https://obj1.kr-west-1.samsungsdscloud.com:8443
Private : https://obj1.kr-west-1.scp-in.com:8443
위치 : KR-WEST-1
Access Key : 16f7f8f97ba9bc62b5b1
Secret Key : f69040add6a7a0a8af1aa889
'''

## Read environment variables
env_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(env_path, verbose=True, override=True)

# os 환경변수로 사용시 
endpoint = os.environ.get("SCP_OBJECTSTORAGE_URL") or None
access_key = os.environ.get("SCP_OBJECTSTORAGE_ACCESS_KEY") or None 
secret_key = os.environ.get("SCP_OBJECTSTORAGE_SECRET_KEY") or None
location = os.environ.get("SCP_OBJECTSTORAGE_LOCATION") or None
bucket_name = os.environ.get("SCP_OBJECTSTORAGE_BUCKET_NAME") or None

# For Test
endpoint = "https://obj1.kr-west-1.samsungsdscloud.com:8443"
access_key = "16f7f8f97ba9bc62b5b1"
secret_key = "f69040add6a7a0a8af1aa889"
location = "KR-WEST-1"
bucket_name = "scpchatgptdemo"   # bucket은 생성된다고 가정

scp_obs_session = boto3.Session(aws_access_key_id=access_key,
                           aws_secret_access_key=secret_key,
                           region_name=location)

scp_obs_client = scp_obs_session.client('s3', endpoint_url=endpoint)
print(scp_obs_client)


# Create Bucket : SCP Project 구조상 불가, 1개 bucket (확인필요)
# Configure CORS 대상 아님
#bucket_name_new="leehs_bucket"
#scp_obs_client.create_bucket(Bucket=bucket_name_new)


# List buckets
response = scp_obs_client.list_buckets()
for bucket in response['Buckets']:
    print(f'  {bucket["Name"]}')
    
# List Files in the Bucket    

    
# Upload files : 로그파일을 생성하여 업로드(날짜명@id명.log)
# file_name = "requirements.txt"
# object_name = datetime.now().strftime("%Y%m%d_%H%M%S")

# with open(file_name, "rb") as f:
#     scp_obs_client.upload_fileobj(f, bucket_name, object_name)
    
# Downloading files : 사후 분석을 위한 기능
# object_name = "20230529_010150"
# with open('s3_downloadtest_file', 'wb') as f:
#     scp_obs_client.download_fileobj(bucket_name, object_name, f)


'''
class chat_log_result:
    def __init__(self,is_err,err_msg):
        self.is_err = is_err
        self.err_msg = err_msg
        

def insert_chat_log(chat_message) -> chat_log_result:
     chat_log_inserted = False 
     err_message = ""
     if endpoint is not None and key is not None and database_name is not None:
        try:
             client = cosmos_client.CosmosClient(endpoint, {'masterKey': key})
             database = client.create_database_if_not_exists(database_name)
             container = database.create_container_if_not_exists(id=container_name,partition_key=partition_key,default_ttl=3600,offer_throughput=400)
             
             ## Ensure the message has partition key , chat_session_id and user_id
             try:
                if chat_message["chat_session_id"] is not None and len(str(chat_message["chat_session_id"])) > 0:
                    document = container.create_item(body=chat_message)
                    

             except cosmos_exception.CosmosHttpResponseError as err:
                print(err.message)
                chat_log_inserted = True
                err_message = err_message + err.message + " ::: " 
             except:
                msg = "Missing partition key: chat_session_id or invalid message structure" + json.loads(chat_message)
                chat_log_inserted = True
                print(msg)          
                err_message = err_message + msg + " ::: "
                
    
        except cosmos_exception.CosmosHttpResponseError as err:
             err_message = err_message + err.message + " ::: " 
             chat_log_inserted = True
             print(err.message)

     else:
        msg = "Cannot initiate connection as one of the environment variables is empty - AZURE_COSMOSDB_ENDPOINT, AZURE_COSMOSDB_KEY ,AZURE_COSMOSDB_DB"
        chat_log_inserted = True
        print(msg)
        err_message = err_message + msg + " ::: "
     chat_log_res = chat_log_result(is_err=chat_log_inserted,err_msg=err_message)
     return chat_log_res
     

#if __name__ == "__main__": 

'''


      
