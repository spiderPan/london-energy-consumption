import pickle
import os

cached_address_file = 'cached_address'


def get_manual_geo():
    return [
        ['13966 Medway Rd, London', '43.048712, -81.314679'],
        ['13966 Medway Rd, Arva', '43.048712, -81.314679'],
        ['10 HAZELWOOD AVE, London', '42.962433, -81.277600'],
        ['1050 VICTORIA, London', '43.013432, -81.225303'],
        ['109 GREENSIDE AVE, London', '42.975641, -81.279379'],
        ['1121 OMMISSIONERS RD E, London', '42.961752, -81.197861'],
        ['1322 OLD BRIDGE RD, London', '42.963313, -81.335411'],
        ['15 RIDOUT ST, London', '42.976191, -81.251353'],
        ['221 SUNNINGDALE RD E, London', '43.040524, -81.281183'],
        ['2225 HYDE PARK, London', '43.015410, -81.339639'],
        ['25 WILSON ST, London', '42.983508, -81.259926'],
        ['2835 SUNNINGDALE RD E, London', '43.065865, -81.191300'],
        ['450 NELSON AVE, London', '42.976757, -81.232779'],
        ['5 GREENSIDE AVE, London', '42.974199, -81.273103'],
        ['520 WELLINGTON ST 11/12, London', '42.988947, -81.245680'],
        ['58 PITCARNIE CRES - LAWSON ESTAT, London', '43.012060, -81.303548'],
        ['75 HORTON ST, London', '42.978794, -81.248009'],
        ['850 SUNNINGHILL AVE, London', '42.963326, -81.300000'],
    ]


def manual_fix_geo():
    addresses = get_manual_geo()

    for address in addresses:
        address_format = address[0].strip().lower() + ' ontario'
        lat_lng = address[1].split(', ')
        lat = float(lat_lng[0])
        lng = float(lat_lng[1])
        address_dict[address_format] = {
            'lat': lat,
            'lng': lng
        }


def save_obj(obj, name):
    with open(name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)


def load_obj(name):
    if not os.path.exists(name + '.pkl'):
        return {}

    with open(name + '.pkl', 'rb') as f:
        return pickle.load(f)


if __name__ == '__main__':
    address_dict = load_obj(cached_address_file)
    manual_fix_geo()
    save_obj(address_dict, cached_address_file)
