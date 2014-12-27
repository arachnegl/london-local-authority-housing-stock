#!/usr/bin/env python3
import csv
import matplotlib.pyplot as plt
import datetime
import numpy as np

DATA_FILE = 'local-authority-housing-stock-borough.csv'
GRAPH_FILE = DATA_FILE[:-3] + 'png'


def get_data(file_name):
    with open(file_name) as fp:
        return fp.readlines()


def get_col(data, col_number):

    def normalise(item):
        item = item.replace(',', '').replace('..', '0')
        return int(item)

    return [normalise(d[col_number]) for d in data]


data = get_data(DATA_FILE)
data = csv.reader(data)
header = data.next()
years = [int(h[-4:]) for h in header[2:]]
data = [line[2:] for line in data]
sums = [sum(get_col(data, n)) for n in range(20)]

x = np.array([datetime.date(n, 1, 1) for n in years])
y = sums

fig = plt.figure()
fig.add_subplot(111)
plt.plot(x, y)
plt.savefig(GRAPH_FILE)
