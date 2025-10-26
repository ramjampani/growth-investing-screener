import pandas as pd
import numpy as np

def normalize(value, min_v, max_v):
    # handle NaN gracefully
    try:
        v = float(value)
    except Exception:
        return 0.0
    if np.isnan(v):
        return 0.0
    if max_v == min_v:
        return 0.0
    return float(np.clip((v - min_v) / (max_v - min_v) * 10, 0, 10))

def compute_gis(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    df['ROCE'] = pd.to_numeric(df.get('ROCE', 0), errors='coerce')
    df['ROE'] = pd.to_numeric(df.get('ROE', 0), errors='coerce')
    df['OperatingMargin'] = pd.to_numeric(df.get('OperatingMargin', 0), errors='coerce')
    df['SalesGrowth'] = pd.to_numeric(df.get('SalesGrowth', 0), errors='coerce')
    df['ProfitGrowth'] = pd.to_numeric(df.get('ProfitGrowth', 0), errors='coerce')
    df['EPSGrowth'] = pd.to_numeric(df.get('EPSGrowth', 0), errors='coerce')
    df['RevenueCAGR'] = pd.to_numeric(df.get('RevenueCAGR', 0), errors='coerce')
    df['PEG'] = pd.to_numeric(df.get('PEG', 0), errors='coerce')
    df['DER'] = pd.to_numeric(df.get('DER', 0), errors='coerce')
    df['CurrentRatio'] = pd.to_numeric(df.get('CurrentRatio', 0), errors='coerce')
    df['PriceReturn'] = pd.to_numeric(df.get('PriceReturn', 0), errors='coerce')
    df['InstitutionalHolding'] = pd.to_numeric(df.get('InstitutionalHolding', 0), errors='coerce')

    df['ROCE_Score'] = df['ROCE'].apply(lambda x: normalize(x, 10, 30))
    df['ROE_Score'] = df['ROE'].apply(lambda x: normalize(x, 10, 25))
    df['OpMargin_Score'] = df['OperatingMargin'].apply(lambda x: normalize(x, 10, 25))
    df['SalesGrowth_Score'] = df['SalesGrowth'].apply(lambda x: normalize(x, 5, 25))
    df['ProfitGrowth_Score'] = df['ProfitGrowth'].apply(lambda x: normalize(x, 5, 25))
    df['EPSGrowth_Score'] = df['EPSGrowth'].apply(lambda x: normalize(x, 5, 20))
    df['RevenueCAGR_Score'] = df['RevenueCAGR'].apply(lambda x: normalize(x, 5, 20))
    df['PEG_Score'] = (2 - df['PEG']).apply(lambda x: normalize(x, 0, 1.5))
    df['DER_Score'] = (2 - df['DER']).apply(lambda x: normalize(x, 0, 1.5))
    df['CurrentRatio_Score'] = df['CurrentRatio'].apply(lambda x: normalize(x, 1, 2))
    df['PriceReturn_Score'] = df['PriceReturn'].apply(lambda x: normalize(x, 0, 40))
    df['InstitutionalHold_Score'] = df['InstitutionalHolding'].apply(lambda x: normalize(x, 10, 50))

    df['GIS'] = (
        0.15*df['ROCE_Score'] + 0.10*df['ROE_Score'] + 0.10*df['OpMargin_Score'] +
        0.10*df['SalesGrowth_Score'] + 0.10*df['ProfitGrowth_Score'] +
        0.10*df['EPSGrowth_Score'] + 0.05*df['RevenueCAGR_Score'] +
        0.10*df['PEG_Score'] + 0.05*df['DER_Score'] + 0.05*df['CurrentRatio_Score'] +
        0.05*df['PriceReturn_Score'] + 0.05*df['InstitutionalHold_Score']
    )
    return df.sort_values('GIS', ascending=False)
