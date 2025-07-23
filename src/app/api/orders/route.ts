import { NextResponse } from 'next/server';

// Mock database - replace with actual database
import { mockDatabase } from '@/data/MockDB';

// Helper function to calculate percentage change
import { calculatePercentageChange } from '@/lib/utils';

export async function GET() {
  try {
    const ordersData = {
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
    };

    return NextResponse.json(ordersData);
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders data' },
      { status: 500 }
    );
  }
}