import { NextResponse } from 'next/server';

// Mock database - replace with actual database
import { mockDatabase } from '@/data/MockDB';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'monthlyOrders';
    
    const analyticsData = mockDatabase.analytics[category];
    
    if (!analyticsData) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      category,
      data: analyticsData
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}