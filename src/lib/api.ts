export class DashboardAPI {
  static async fetchDashboardData() {
    const response = await fetch('/api/dashboard');
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    return response.json();
  }

  static async fetchAnalytics(category) {
    const response = await fetch(`/api/analytics?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    return response.json();
  }

  static async fetchOrders() {
    const response = await fetch('/api/orders');
    if (!response.ok) {
      throw new Error('Failed to fetch orders data');
    }
    return response.json();
  }
}
