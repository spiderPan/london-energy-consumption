import pandas as pd
import os
import glob


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
    print("Merging Data...")
    merge_csvs_in_folder('./csv')
    print("Updated")
