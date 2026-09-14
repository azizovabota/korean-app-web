import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Get category ID
    const { data: category, error: catError } = await supabase
      .from('topik_categories')
      .select('id')
      .eq('skill_area', data.skill_area)
      .single();

    if (catError || !category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    // Insert question
    const { error } = await supabase.from('topik_questions').insert([
      {
        category_id: category.id,
        difficulty: data.difficulty,
        prompt_text: data.prompt_text,
        options: data.options,
        correct_option: data.correct_option,
        explanation: data.explanation,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
