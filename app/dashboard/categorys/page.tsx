import { supabase } from '@/app/lib/supabaseClient';
import CategoryList from './categoryList';

export default async function Categorys() {

  const { data, error } = await supabase
    .from('category')
    .select(`
      *,
      images (
        id,
        url
      )
    `)
    .is('parent_id', null); 

  if (error) {
    console.error('Error fetching categories:', error);
    return <p>Error loading categories</p>;
  }

  if (!data || data.length === 0) {
    return <p>No categories found.</p>;
  }


  const categoryRows = data.map((row) => ({
    ...row,
    imageUrl: row.images?.url || '/placeholder.png', 
  }));

  return <CategoryList categoryRows={categoryRows} />;
}



// NEXT_PUBLIC_SUPABASE_URL=https://vugvefacuygjeupjkmku.supabase.co
// NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_MasCU7jcPQeyQ1qlWQAigA_MwVYguND
// SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1Z3ZlZmFjdXlnamV1cGprbWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNjk0MzEsImV4cCI6MjA4MDg0NTQzMX0.76qzP--Y_RIUO9U5rItw1DbbWldCP-4gJw5huuK1rtM
