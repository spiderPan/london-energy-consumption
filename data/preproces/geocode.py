import geocoder
import sys
import pandas as pd
import json


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
        'boundingbox': g.json['raw']['boundingbox'],
    }
    json_result = json.dumps(result)
    # print('result==>'+json_result)

    return json_result


if __name__ == '__main__':
    data_file = sys.argv[1]
    print("counting...")
    add_geocode_to_data(data_file)
    print("updated file...")
