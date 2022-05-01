import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGeoData } from "./geoDataAPI.js";

const initialState = {
    geoData: [],
    status: null
};

const extractMaterialsData = ({ features }) => {
    if(features) {
        const materials = features.reduce((materialsData, feat) => {
            let material = feat.properties.material;
            if(material) {
                if(materialsData[material]) {
                    materialsData[material].push(feat);
                } else {
                    materialsData[material] = [feat];
                }
            }
            return materialsData;
        }, {});

        return materials;
    }
}

const extractSizeCategoryData = ({ features }) => {
    if(features) {
        return features.reduce((sizeCategoryData, feat) => {
            let area = feat.properties.area_;
            let length = feat.properties.shape_leng;

            if (area <= 50) {
                sizeCategoryData["0-50"].push({id: feat.id, area, length})
            } else if (area > 50 && area <= 200){
                sizeCategoryData["50-200"].push({id: feat.id, area, length})
            } else if ( area > 200 && area <= 526) {
                sizeCategoryData["200-526"].push({id: feat.id, area, length})
            }
            return sizeCategoryData;

        }, {"0-50": [], "50-200": [], "200-526": []});
    }
}

export const fetchDataAsync = createAsyncThunk(
    'api/fetchDataAsync',
    async (obj, { rejectWithValue }) => {
        try {
            const response = await fetchGeoData();
            return {
                geoJson: response,
                total: response.totalFeatures,
                materialsData: extractMaterialsData(response),
                sizeCategoryData: extractSizeCategoryData(response),
            }
        } catch(error) {
            rejectWithValue({ error: error.message })
        }
    }
)

export const fetchGeoDataSlice = createSlice({
    name: "api",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.geoData = action.payload;
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.status = 'failed';
                // action.error
            });
    }
})

export default fetchGeoDataSlice.reducer;
