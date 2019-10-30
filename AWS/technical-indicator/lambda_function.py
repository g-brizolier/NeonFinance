import json
from pymongo import MongoClient
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib as mpl
import time
import datetime
from ta import *

mpl.style.use('seaborn')

MONGODB_URI = "mongodb+srv://admin:CIbL91c9vfCbupxv@spa-cluster-ozjzy.gcp.mongodb.net/stock-prices?retryWrites=true&w=majority"

client = MongoClient(MONGODB_URI)

def lambda_handler(event, context):
    doc = []
    db = client.history
    aapl_collection = db.AAPL
    mongo_doc = aapl_collection.find()
    for record in mongo_doc[0:100]:
        date_string = record["Date"]
        timestamp = time.mktime(datetime.datetime.strptime(date_string, "%Y-%m-%d").timetuple())
        doc.append({
            "timestamp": record["Date"],
            "volume": record["Volume"],
            "close": record["Close"],
            "open": record["Open"],
            "high": record["High"],
            "low": record["Low"]
        })
    json_doc = json.dumps(doc)

    df = pd.read_json(json_doc, orient='records')

    df = add_all_ta_features(df, "open", "high", "low", "close", "volume")

    
    plt.plot(df.close)
    plt.plot(df.volatility_bbh, label='High BB')
    plt.plot(df.volatility_bbl, label='Low BB')
    plt.plot(df.volatility_bbm, label='EMA BB')
    plt.title('Bollinger Bands')
    plt.legend()
    plt.show()

    return {
        'statusCode': 200,
        'body': json.dumps('ta grosse race')
    }

res = lambda_handler("lol", "mdr")
print(res)
