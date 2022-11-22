import pandas as pd 
import numpy as np
from sklearn.linear_model import Ridge
from sklearn import linear_model
from sklearn.feature_extraction.text import TfidfTransformer
import sys, json

# acountId, cafeId, rating
historyRating = json.loads(sys.argv[1])

# cafeId  style, vibe, district, totalLike??
cafes = json.loads(sys.argv[2])

# dictionary of style
styleDic = json.loads(sys.argv[3])

# dictionary of vibe
vibeDic = json.loads(sys.argv[4])

historyRating = np.array(historyRating)

cafes = np.array(cafes)

def oneHotVector(dic, vector):
    get_index_by_id = {id:i for i, id in enumerate(dic)}
    one_hot_vevtor = np.zeros((1, len(dic)), dtype=np.int8)
    for item in vector:
        indexs = get_index_by_id[item]
        one_hot_vevtor[0, indexs] = 1
    return one_hot_vevtor[0]

items = np.zeros((cafes.shape[0], cafes.shape[1] - 1))

def EncodingData(cafes):
    for cafe in cafes:
        styleIds, vibeIds, districtId = cafe[1], cafe[2], cafe[3]
        styleOneHot = oneHotVector(styleDic, styleIds)
        vibeOneHot = oneHotVector(vibeDic, vibeIds)
        cafe[1] = int("".join(map(str, styleOneHot)))
        cafe[2] = int("".join(map(str, vibeOneHot)))
        cafe[3] = int(districtId)

EncodingData(cafes)
items = cafes[:, 1:].T
items = np.array(items, dtype=np.int8)

transformer = TfidfTransformer(smooth_idf=True, norm='l2')
tfidf= transformer.fit_transform(items).toarray().T

d = 1
W = np.zeros((1, tfidf.shape[1]))
b = np.zeros((1, tfidf.shape[1]))

cafeIds, scores = historyRating[:, 1], historyRating[:, 2]
scores = np.array(scores, dtype=np.float16)

cafeIdxs = []
for cafeId in cafeIds:
  cafeIndex = np.where(cafes[:, 0] == cafeId)[0][0]
  cafeIdxs.append(cafeIndex)

Xhat = tfidf[cafeIdxs, :]
clf = Ridge(alpha=0.01, fit_intercept= True) # SGD
clf.fit(Xhat, scores)
W = clf.coef_
b = clf.intercept_

Yhat = tfidf.dot(W) + b
Yhat = Yhat.round(decimals=2)
Yhat = Yhat.reshape((1, Yhat.shape[0])).T
cafeRecommend = np.concatenate((cafes, Yhat), axis=1)
print(json.dumps(cafeRecommend.tolist()))