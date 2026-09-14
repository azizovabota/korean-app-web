import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { questions } = await request.json();

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: 'No questions provided' },
        { status: 400 }
      );
    }

    // Get all categories
    const { data: categories, error: catError } = await supabase
      .from('topik_categories')
      .select('id, skill_area');

    if (catError || !categories) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 400 }
      );
    }

    // Prepare questions with category IDs
    const categoryMap = new Map(categories.map((c: any) => [c.skill_area, c.id]));
    const questionsToInsert = questions.map((q: any) => ({
      category_id: categoryMap.get(q.skill_area),
      difficulty: q.difficulty || 2,
      prompt_text: q.prompt_text,
      options: q.options,
      correct_option: q.correct_option,
      explanation: q.explanation,
    }));

    // Insert all questions
    const { error } = await supabase
      .from('topik_questions')
      .insert(questionsToInsert);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      count: questionsToInsert.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
