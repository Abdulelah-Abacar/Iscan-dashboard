import { NextResponse } from 'next/server';

// Mock database - replace with actual database
import { mockDatabase } from '@/data/MockDB';

// Helper function to calculate percentage change
import { calculatePercentageChange } from '@/lib/utils';

// Main dashboard API endpoint
export async function GET() {
  try {
    const data = {
      monthlyProfit: {
        amount: mockDatabase.monthlyProfit.current,
        percentageChange: calculatePercentageChange(
          mockDatabase.monthlyProfit.current,
          mockDatabase.monthlyProfit.previousMonth
        ),
        isPositive: mockDatabase.monthlyProfit.current > mockDatabase.monthlyProfit.previousMonth,
        period: `${mockDatabase.monthlyProfit.month} ${mockDatabase.monthlyProfit.year}`
      },
      yearlyProfit: {
        amount: mockDatabase.yearlyProfit.current,
        percentageChange: calculatePercentageChange(
          mockDatabase.yearlyProfit.current,
          mockDatabase.yearlyProfit.previousYear
        ),
        isPositive: mockDatabase.yearlyProfit.current > mockDatabase.yearlyProfit.previousYear,
        period: `${mockDatabase.yearlyProfit.year}`
      },
      orders: {
        individuals: {
          count: mockDatabase.orders.individuals.count,
          percentageChange: calculatePercentageChange(
            mockDatabase.orders.individuals.count,
            mockDatabase.orders.individuals.previousPeriod
          ),
          isPositive: mockDatabase.orders.individuals.count > mockDatabase.orders.individuals.previousPeriod
        },
        companies: {
          count: mockDatabase.orders.companies.count,
          percentageChange: calculatePercentageChange(
            mockDatabase.orders.companies.count,
            mockDatabase.orders.companies.previousPeriod
          ),
          isPositive: mockDatabase.orders.companies.count > mockDatabase.orders.companies.previousPeriod
        }
      },
      charityWorks: mockDatabase.charityWorks,
      analytics: mockDatabase.analytics
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}