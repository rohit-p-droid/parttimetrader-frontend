import api from "@/utils/api"

class StockService {
    getTop4Indices = () => api.get("/ind/stock/top-4-indices").then(res => res.data);
    getTopGainersLosers = () => api.get("/ind/stock/top-losers-gainers").then(res => res.data);
    getPopularStocks = () => api.get("/ind/stock/popular-stocks").then(res => res.data);
    searchStock = (params: {}) => api.get("/ind/stock/search", params).then(res => res.data);
}

export default new StockService();