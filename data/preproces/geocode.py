import geocoder
import geojson
import sys
import pandas as pd
import json
import os


def add_geocode_to_data(file):
    df = pd.read_csv(file)

    if 'geocode' not in df.columns:
        df['full_address'] = df['Address']+', '+df['City']+' Ontario'
        df['geocode'] = df['full_address'].apply(get_geocode_by_address)

    df.to_csv(file, index=False)


def get_geocode_by_address(address):
    print('Dealing with:'+address)
    g = geocoder.osm(address)

    if g.json is None:
        print('Addres is None:'+address)
        return ''

    result = {
        'lat': g.json['lat'],
        'lng': g.json['lng'],
    }
    json_result = json.dumps(result)
    # print('result==>'+json_result)

    return json_result


def create_geojson_feature(x, y, id, properties):
    point = geojson.Point((x, y))
    return geojson.Feature(geometry=point, id=id, properties=properties)


def create_geojson_from_csv(file):
    out_file = os.path.splitext(file)[0]+'.json'
    if os.path.isfile(out_file):
        os.remove(out_file)

    df = pd.read_csv(file)
    features = []

    for index, row in df.iterrows():
        if pd.notna(row['geocode']):
            geocode = json.loads(row['geocode'])
            lat = geocode['lat']
            lng = geocode['lng']
            properties = row.fillna('').to_dict()
            properties.pop('geocode')
            feature = create_geojson_feature(lng, lat, index, properties)
            features.append(feature)
    collects = geojson.FeatureCollection(features)
    with open(out_file, 'w') as outfile:
        geojson.dump(collects, outfile)


if __name__ == '__main__':
    data_file = sys.argv[1]
    print("counting...")
    add_geocode_to_data(data_file)
    create_geojson_from_csv(data_file)
    print("updated file...")
