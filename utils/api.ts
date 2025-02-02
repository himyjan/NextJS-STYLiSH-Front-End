import type { CartPostData, FbAuthSignInData } from '@/types/types';

const api = {
  hostname: 'https://api.appworks-school.tw/api/1.0',
  async getProducts(category: string, paging: number) {
    const response = await fetch(
      `${this.hostname}/products/${category}?paging=${paging}`,
    );
    return await response.json();
  },
  async getCampaigns() {
    const response = await fetch(`${this.hostname}/marketing/campaigns`);
    return await response.json();
  },
  async searchProducts(keyword: string, paging: number) {
    const response = await fetch(
      `${this.hostname}/products/search?keyword=${keyword}&paging=${paging}`,
    );
    return await response.json();
  },
  async getProduct(id: string) {
    const response = await fetch(`${this.hostname}/products/details?id=${id}`);
    return await response.json();
  },
  async checkout(data: CartPostData, jwtToken: string) {
    const response = await fetch(`${this.hostname}/order/checkout`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: 'POST',
    });
    return await response.json();
  },
  async signin(data: FbAuthSignInData) {
    const response = await fetch(`${this.hostname}/user/signin`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
    });
    return await response.json();
  },
};

export default api;
