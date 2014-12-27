import csv
import matplotlib.pyplot as plt
import datetime
import numpy as np

DATA_FILE = 'local-authority-housing-stock-borough.csv'


def get_data(file_name):
    with open(file_name) as fp:
        return fp.readlines()


def get_col(data, n):
    return [d[n] for d in data]


def normalise(row):
    res =  []
    for item in row:
        to_add = item.replace(',', '')
        to_add = to_add.replace('..', '0')
        res.append(int(to_add))
    return res


data = get_data(DATA_FILE)
data = csv.reader(data)
header = data.next()
years = [int(h[-4:]) for h in header[2:]]
data = [line[2:] for line in data]
print([sum(normalise(get_col(data, n))) for n in range(20)])

x = np.array([datetime.date(n, 1, 1) for n in years])
y = [sum(normalise(get_col(data, n))) for n in range(20)]

plt.plot(x,y)
plt.show()
