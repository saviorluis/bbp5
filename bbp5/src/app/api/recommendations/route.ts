import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    
    const { projectType, cleaningType, squareFootage, urgencyLevel } = requestData;
    
    // Generate basic recommendations based on project type and cleaning type
    const recommendations = [
      `For ${projectType} spaces, ensure you bring the appropriate specialized equipment.`,
      `When performing a ${cleaningType} clean, focus on the areas that matter most for this type of service.`,
      `For a space of ${squareFootage} sq ft, we recommend bringing at least 3 team members.`,
      urgencyLevel > 7 ? 'Given the high urgency, consider splitting the team to cover more area simultaneously.' : 'Take time to ensure quality in each area before moving to the next.',
      'Complete a final walkthrough with the client to ensure satisfaction.',
    ];
    
    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Error in recommendations API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate recommendations',
        recommendations: [
          'Ensure all team members are briefed on the project scope.',
          'Bring appropriate cleaning supplies for the project type.',
          'Schedule a final walkthrough with the client.',
        ] 
      },
      { status: 500 }
    );
  }
} 