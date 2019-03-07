import geocoder
import geojson
import sys
import pandas as pd
import json
import os
import glob
import pickle


cached_address_file = 'cached_address'


def pre_process_data(file):
    df = pd.read_csv('./raw/'+file)

    if 'lat' not in df.columns or 'lng' not in df.columns:
        df['lat'] = df.apply(lambda x: get_geocode_by_address(
            x['Address'], x['City'], output='lat'), axis=1)
        df['lng'] = df.apply(lambda x: get_geocode_by_address(
            x['Address'], x['City'], output='lng'), axis=1)

    to_num_cols = ['Total Floor Area', 'Annual Flow', 'Electricity', 'Natural Gas', 'Fuel Oil 1 & 2',
                   'Fuel Oil 4 & 6', 'Propane', 'Coal', 'Wood', 'District Heat', 'Renewable1',
                   'Emission Factor1', 'District Cool', 'Renewable2', 'Emission Factor2',
                   'GHG Emissions (Kg)', 'Energy Intensity (ekWh/sqft)', 'Energy Intensity (ekWh/Mega Litres)']

    df[to_num_cols] = df[to_num_cols].apply(lambda x: pd.to_numeric(
        x.astype(str).str.replace(',', ''), errors="coerce")).fillna(0)
    df.to_csv('./csv/'+file, index=False)


def get_geocode_by_address(address, city, output='json'):
    geocode = {
        'lat': '',
        'lng': '',
    }
    if not isinstance(address, str) or not isinstance(city, str):
        return ''

    address = address.strip() + ', ' + city.strip() + ' Ontario'
    address = address.lower()
    print('Dealing with:'+address)
    if address in address_dict:
        print('found cache')
        geocode = address_dict[address]

    else:
        g = geocoder.osm(address)

        if g.json is None:
            print('Addres is None:'+address)

        else:
            geocode = {
                'lat': g.json['lat'],
                'lng': g.json['lng'],
            }
            address_dict[address] = geocode

    if output in geocode:
        return geocode.get(output, '')
    else:
        return geocode


def create_geojson_feature(x, y, id, properties):
    point = geojson.Point((x, y))
    return geojson.Feature(geometry=point, id=id, properties=properties)


def create_geojson_from_csv(file):
    out_file = './geojson/' + os.path.splitext(file)[0]+'.json'
    if os.path.isfile(out_file):
        os.remove(out_file)

    df = pd.read_csv('./csv/'+file)
    features = []

    for index, row in df.iterrows():
        if pd.notna(row['lat']) and pd.notna(row['lng']):
            lat = float(row['lat'])
            lng = float(row['lng'])
            properties = row.fillna('').to_dict()
            feature = create_geojson_feature(lng, lat, index, properties)
            features.append(feature)
    collects = geojson.FeatureCollection(features)
    with open(out_file, 'w') as outfile:
        geojson.dump(collects, outfile)


def save_obj(obj, name):
    with open(name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)


def load_obj(name):
    if not os.path.exists(name + '.pkl'):
        return {}

    with open(name + '.pkl', 'rb') as f:
        return pickle.load(f)


def merge_csvs_in_folder(path):
    all_csvs = glob.glob(os.path.join(path, "*.csv"))
    merged_content = []

    for csv in all_csvs:
        filename = os.path.basename(csv)
        year = os.path.splitext(filename)[0]
        if year == 'merged':
            continue
        df = pd.read_csv(csv, index_col=None, header=0)
        df['year'] = year
        merged_content.append(df)
    df = pd.concat(merged_content, axis=0, ignore_index=True, sort=True)
    df.to_csv(os.path.join(path, "merged.csv"), index=False)


if __name__ == '__main__':
    data_file = sys.argv[1]

    if data_file.startswith('merged'):
        merge_csvs_in_folder('./raw')

    print("counting...")
    address_dict = load_obj(cached_address_file)
    pre_process_data(data_file)
    create_geojson_from_csv(data_file)
    print("updated file...")
    save_obj(address_dict, cached_address_file)
