Original data from [City of London Open Data](https://www.london.ca/city-hall/open-data/Pages/Open-Data-Data-Catalogue.aspx)

- [Energy consumption 2016 (City of London facilities)](http://apps.london.ca/OpenData/Excel_Files_LatLong/Energy_Consumption_2016.xlsx)
- [Energy consumption 2015 (City of London facilities)](http://apps.london.ca/OpenData/Excel_Files_LatLong/Energy_Consumption_2015.xlsx)
- [Energy consumption 2014 (City of London facilities)](http://apps.london.ca/OpenData/Excel_Files_LatLong/Energy_Consumption_GHG_Reporting_2014.xlsx)
- [Energy consumption 2013 (City of London facilities)](http://apps.london.ca/OpenData/Excel_Files_LatLong/Energy_Consumption_GHG_Reporting_2013.xlsx)
- [Energy consumption 2012 (City of London facilities)](http://apps.london.ca/OpenData/Excel_Files_LatLong/Energy_Consumption_GHG_Reporting_2012.xlsx)
- [Energy consumption 2011 (City of London facilities)](https://www.london.ca/residents/Environment/Energy/Documents/Energy%20Consumption%202011%20%28City%20of%20London%29.xls)


## Install Requirements

```
pip3 install -r preprocess/requirements.txt
```

## Usage
Calculate Geo and convert csv to GeoJSON

```
python3 preprocess/geocode.py 2011.csv
```

Merge all years into one and convert it to GeoJSON

```
python3 preprocess/geocode.py merged.csv
```