import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/trainers - List all trainers
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const location = searchParams.get('location');
    const specialization = searchParams.get('specialization');
    const minRate = searchParams.get('minRate');
    const maxRate = searchParams.get('maxRate');

    let query = supabase
      .from('trainer_profiles')
      .select('*')
      .eq('is_available', true);

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    if (specialization) {
      query = query.contains('specializations', [specialization]);
    }

    if (minRate) {
      query = query.gte('hourly_rate', parseFloat(minRate));
    }

    if (maxRate) {
      query = query.lte('hourly_rate', parseFloat(maxRate));
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/trainers - Create trainer profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const {
      first_name,
      last_name,
      bio,
      hourly_rate,
      specializations,
      certifications,
      years_experience,
      location,
    } = body;

    // Validation
    if (!first_name || !last_name || !hourly_rate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('trainer_profiles')
      .insert([
        {
          user_id: session.user.id,
          first_name,
          last_name,
          bio,
          hourly_rate,
          specializations: specializations || [],
          certifications: certifications || [],
          years_experience,
          location,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
