export type SortType = 'relevance' | 'newest';
export type CategoriesType = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry';
export type SettingsStateType = {
    settingsCategory: CategoriesType[],
    settingsSort: SortType[],
}

//WARNING!!!
//Before changing the settings you must change the types for these settings
export const categories: CategoriesType[] = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'];
export const sort: SortType[] = ['relevance', 'newest'];

export const APIKey = 'AIzaSyAUW0f_yW_WmR2kAMfclupp3OUO2aN-CW0';
export const paginationCount = 10;