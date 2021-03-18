from sklearn.preprocessing import StandardScaler, MinMaxScaler
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.manifold import MDS
from scipy import stats
import pandas as pd
import numpy as np


app = Flask(__name__)

data = pd.read_csv('data/basketball_data.csv')
df_pcp = data.head(200)
data = data.head(500)
# removing the non-numerical variables from the dataframe
df = data.drop('team', axis=1)
# forming a dictionary to map each column to their index
all_columns = {}
for index, item in enumerate(df.columns):
    all_columns[item] = index


# StandardScaler follows normal distribution so mean = 0 & variance = 1
# stdscore of sample x: z=(x-u)/s, where u is mean and s is standard deviation
scaled_data = StandardScaler().fit(df).transform(df)

# we specify the number of components that we want to retain
number_of_components = len(list(df))
pca = PCA(n_components=number_of_components)
principal_components = pca.fit_transform(df)

pca1, pca2 = [], []
for i in range(principal_components.shape[0]):
    pca1.append(principal_components[i][0])
    pca2.append(principal_components[i][1])

df_pca_attributes = pd.DataFrame(
    list(zip(pca.components_[0], pca.components_[1])), 
    columns=['PCA1 Attribute', 'PCA2 Attribute']
)
df_pca = pd.DataFrame(list(zip(pca1, pca2)), columns=['PCA1', 'PCA2'])


minmax = MinMaxScaler(feature_range=(-1, 1))
df_pca = minmax.fit_transform(df_pca)
df_pca_attributes = minmax.fit_transform(df_pca_attributes)

eigen_ratio = (pca.explained_variance_ratio_) * 100

scree_data = []
cumulative_sum = 0
for i in range(len(eigen_ratio)):
    cumulative_sum = (cumulative_sum + eigen_ratio[i]).round(2)
    scree_data.append({
        'factor': i + 1,
        'eigenvalue': eigen_ratio[i].round(2),
        'cumulative': cumulative_sum.round(2)
    })

biplot_data_x, biplot_data_y = [], []
for i in range(len(df_pca)):
    biplot_data_x.append({
        'pca1': df_pca[i][0],
        'pca2': df_pca[i][1]
    })

for i in range(len(df_pca_attributes)):
    biplot_data_y.append({
        'pca1_attributes': df_pca_attributes[i][0],
        'pca2_attributes': df_pca_attributes[i][1]
    })


@app.route('/')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def index():
    return render_template('index.html')


@app.route('/fetchscreedataeigenValue', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def fetchscreedata2():
    cov_mat = np.cov(scaled_data.T)
    eig_values, eig_vectors = np.linalg.eig(cov_mat)
    idx = eig_values.argsort()[::-1]
    eig_values = eig_values[idx]
    eig_vectors = eig_vectors[:, idx]
    scree_data = []
    cumulative_sum = 0
    for i in range(len(eigen_ratio)):
        cumulative_sum = (cumulative_sum + eigen_ratio[i]).round(2)
        scree_data.append({
            'factor': i + 1,
            'eigenvalue': eig_values[i],
            'cumulative': cumulative_sum.round(2)
        })
    return jsonify(scree_data, biplot_data_x, biplot_data_y)
    

@app.route('/fetchscreedataexplainedvariance', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def fetchScreeData():
    return jsonify(scree_data, biplot_data_x, biplot_data_y)


@app.route('/fetchtabledata', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def fetch_loadings():
    if request.args.get('dval'):
        dval = int(request.args.get('dval'))
    
    loadings = np.sum(np.square(pca.components_[:dval]), axis=0)
    indices_of_top_attributes = loadings.argsort()[-4:][::-1]
    top_columns, top_loading = [], []
    for key, value in all_columns.items():
        if value in indices_of_top_attributes:
            top_columns.append(key)
    for i in indices_of_top_attributes:
        top_loading.insert(i, loadings[i])
    table_data = {}
    for i in range(dval):
        table_data[top_columns[i]] = top_loading[i]
    return jsonify(table_data)


@app.route('/fetchscatterdata', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def scatter_data(n = 4):
    if request.args.get('dval'):
        dval = int(request.args.get('dval'))
    
    loadings = np.sum(np.square(pca.components_[:dval]), axis=0)
    indices_of_top_attributes = loadings.argsort()[-4:][::-1]
    top_columns = []
    for key, value in all_columns.items():
        if value in indices_of_top_attributes:
            top_columns.append(key)
    kmeans_df = df[top_columns]
    k_means = KMeans(n_clusters=n, random_state=0)
    kmeans_data = k_means.fit(kmeans_df)
    kmeans_label = kmeans_data.labels_
    scatter = df[top_columns]
    scatter['kmeans_label'] = kmeans_label
    s_data = scatter.to_dict('records')
    return jsonify(s_data, top_columns)


def calculate_MDS():
    embeddings = MDS(2)
    transformed = embeddings.fit_transform(df)
    return transformed

@app.route('/fetchMDSData', methods=['GET'])
def mds_data():
    result = calculate_MDS()
    df1 = pd.DataFrame(result, columns=['Component1', 'Component2'])
    kmeans = KMeans(n_clusters=4, random_state=0)
    kmeans_data = kmeans.fit(df1)
    kmeans_label = kmeans_data.labels_
    df1['kmeans'] = kmeans_label
    mds_data = df1.to_dict('records')
    return jsonify(mds_data)

@app.route('/fetchMDSCorrData', methods=['GET'])
def mds_corr():
    mds = MDS(n_components=2, dissimilarity="precomputed", random_state=0)
    mds_corr = 1 - df.corr()
    d = mds.fit_transform(mds_corr)
    d = d[(np.abs(stats.zscore(d)) < 3).all(axis=1)]
    df1 = pd.DataFrame(d, columns=['Component1', 'Component2'])
    df1["name"] = df.columns
    data = df1.to_dict("records")
    return jsonify(data)

@app.route('/kmeansDataPCP', methods=['GET'])
def kmeansDataPCP():
    result = calculate_MDS()
    df1 = pd.DataFrame(result, columns=['Component1', 'Component2'])
    kmeans = KMeans(n_clusters=4, random_state=0)
    kmeans_data = kmeans.fit(df1)
    kmeans_label = kmeans_data.labels_
    return jsonify(kmeans_label.tolist())

@app.route('/fetchPCPData', methods=['GET'])
def pcp_data():
    pcp = df.to_dict('records')
    return jsonify(pcp)

def run_init():
    app.config['SECRET_KEY'] = 'somethingsecret'
    app.config['CORS_HEADERS'] = 'Content-Type'
    cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})


if __name__ == '__main__':
    app.run(debug=True)
    run_init()