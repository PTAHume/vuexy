import sanctumService from "../../../../../@core/auth/sanctum/sanctumService";
import { paginateArray, sortCompare, getSortBy } from "./util";
import moment from 'moment';
const sanctum = new sanctumService();


const fetchOffers = async ({
  page = 1,
  perPage = 9,
  sortBy = "featured",
  q = '',
  minPrice,
  maxPrice,
  delivery_type,
  departure_date,
  arrival_date,
  arrival_airport,
  arrival_city,
  arrival_country,
  departure_airport,
  departure_city,
  departure_country,
  weight,
} = {}) => {
  try {
    const response = await sanctum.getFrontOffersData({
      page,
      per_page: perPage,
      sortBy,
      q,
      minPrice,
      maxPrice,
      delivery_type,
      departure_date,
      arrival_date,
      arrival_airport,
      arrival_city,
      arrival_country,
      departure_airport,
      departure_city,
      departure_country,
      weight,
    });
    // console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const products: any[] = [];

export const findProductById = async (id) => {
  const productsData = await fetchOffers();
  products = productsData.data.find(x => x.id === id);
}

export const getFilteredProducts = async (params) => {
  try {
    const response = await fetchOffers(params);

    return {
      products: response.data,
      params,
      total: response.total,
      page: response.page,
      perPage: response.perPage,
    };
  } catch (error) {
    console.error(error);
    return {
      products: [],
      params,
      total: 0,
      page: 1,
      perPage: 9,
    };
  }
};



{/*This is coming from SIDEBAR we will send the searchQuery because it will fetch data based on this */ }
export const getFrontSidebarData = async (
  searchQuery = "",
  searchField,
  departure_country_id,
  departure_city_id,
  arrival_country_id,
  arrival_city_id,
  departure_airport_id,
  arrival_airport_id
) => {
  try {
    const response = await sanctum.getFrontSidebarData(
      searchQuery,
      searchField || "",
      departure_country_id || null,
      departure_city_id || null,
      arrival_country_id || null,
      arrival_city_id || null,
      departure_airport_id || null,
      arrival_airport_id
    );

    return response.data;
  } catch (error) {
    return { error: error.response };
  }
};


export default { products };