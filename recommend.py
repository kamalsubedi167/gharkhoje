import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask,request , jsonify
# from flask_mysqldb import MySQL
from flask_pymongo import PyMongo
import re

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://GharKhoje:GharKhoje@cluster0.wpuai.mongodb.net/estate?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)



def getVectorizer():
   return TfidfVectorizer()




def calculateYVectors(vectorizer,pro):

    data = [ preprocess_text( pro['name']+" "+pro['description']+" "+pro['type']+" "+pro['address'] ) ]

    df = pd.DataFrame(data)
    # print(df)
    
    tfidf_vector =  vectorizer.transform(df[0])

    # good_view = pd.DataFrame(tfidf_vector.toarray(),columns=vectorizer.get_feature_names_out())
    # print(good_view)
    return tfidf_vector



def preprocess_text(text):
    # Convert to lowercase, remove punctuation, and split into words
    text = re.sub(r'[^\w\s]', ' ', text.lower())  # Remove punctuation and lowercase
    return text  # Split text into list of words



def calculateXVectors(vectorizer,properties):

    props = []
    for pro in properties:
        props.append  ( preprocess_text( pro['name']+" "+pro['description']+" "+pro['type']+" "+pro['address'] ) )

    # print(props)

    df = pd.DataFrame(props)
    # print(df)


    tfidf_vector =  vectorizer.fit_transform(df[0])

    # better_view = pd.DataFrame(tfidf_vector.toarray(),columns=vectorizer.get_feature_names_out() )
    # print(better_view)


    
    return tfidf_vector

def calculateCosineSimilarity(x_vector,y_vector):
    similarity = cosine_similarity(x_vector,y_vector)


    np_smilarity = np.array(similarity)

    eachRowSimilarity = np.sum(np_smilarity,axis=1)

    # print(eachRowSimilarity)
    return eachRowSimilarity

@app.route('/similar',methods=["POST"])
def similar():

    data = request.get_json()
    # print(data)

    vectorizer = getVectorizer()

    propertiesX = data.get('x')

    userDataY = data.get('y')
    # print(propertiesX)
    print(userDataY)
    # exit()




    x_vector = calculateXVectors(vectorizer,propertiesX)
    y_vector = calculateYVectors(vectorizer,userDataY)

    similarities = calculateCosineSimilarity(x_vector,y_vector)

    
    rowSimilarityWithData = list(zip(propertiesX,similarities))
    # print(rowSimilarityWithData)
    sortedSimilarityProperty = sorted(rowSimilarityWithData,key=lambda x: x[1], reverse=True)
    sorted_property , sorted_scores = zip(*sortedSimilarityProperty)


    # ids = []
    # for i in range(len(sorted_property)):
    #     ids.append(sorted_property[i][5])

    return jsonify(sorted_property)




app.run(port = 5000)

