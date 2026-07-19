import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { participant_name, phone_number, day_1_supper, day_2_supper, day_3_lunch, day_3_supper, day_4_lunch } = body;

    if (!participant_name || !phone_number) {
      return NextResponse.json({ error: 'Name and Phone Number are required.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('food_selections')
      .insert([
        { participant_name, phone_number, day_1_supper, day_2_supper, day_3_lunch, day_3_supper, day_4_lunch }
      ]);

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'This phone number has already made a selection.' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Selection saved successfully!', data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}